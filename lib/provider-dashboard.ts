import { prisma } from "@/lib/prisma";

// Types 

export interface ProviderStats {
  newLeads: number;
  followUps: number;     // pending bids (waiting for client)
  activeJobs: number;    // accepted bids
  todayEarnings: number;
  monthEarnings: number;
}

export interface RecentLead {
  id: string;
  clientName: string;
  clientInitials: string;
  workType: string;
  location: string;
  timeAgo: string;
  leadStatus: string;
}

export interface ActiveJob {
  id: string;
  clientName: string;
  workTitle: string;
  location: string;
  progress: number;
}

export interface UpcomingJob {
  id: string;
  day: string;
  month: string;
  title: string;
  clientName: string;
  time: string;
  status: string;
}

export interface ProfileCompletion {
  percentage: number;
  hasBasicInfo: boolean;
  hasServicesPricing: boolean;
  hasWorkPhotos: boolean;
  hasIdVerification: boolean;
  hasBankDetails: boolean;
}

export interface ProviderDashboardData {
  stats: ProviderStats;
  recentLeads: RecentLead[];
  activeJobs: ActiveJob[];
  upcomingJobs: UpcomingJob[];
  profileCompletion: ProfileCompletion;
  walletBalance: number;
  isOnline: boolean;
  specialty: string;
}

// Helper 
function timeAgo(date: Date): string {
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hour${hrs > 1 ? "s" : ""} ago`;
  return `${Math.floor(hrs / 24)} day${Math.floor(hrs / 24) > 1 ? "s" : ""} ago`;
}

function getInitials(name: string): string {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

function formatLeadStatus(status: string): string {
  const map: Record<string, string> = {
    NEW: "New",
    CONTACTED: "Contacted",
    INTERESTED: "Interested",
    CLOSED: "Closed",
  };
  return map[status] ?? status;
}

// Main fetch function 
export async function getProviderDashboardData(
  userId: string
): Promise<ProviderDashboardData> {

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);

  // Fetch everything in parallel
  const [
    providerProfile,
    newLeadsCount,
    followUpsCount,
    activeJobsCount,
    todayEarnings,
    monthEarnings,
    recentJobs,
    activeBids,
    upcomingScheduled,
    walletData,
  ] = await Promise.all([

    // Provider profile
    prisma.providerProfile.findUnique({
      where: { userId },
    }),

    // New Leads = Jobs in provider's category with no bid from this provider yet
    prisma.providerProfile.findUnique({ where: { userId } }).then(async (profile) => {
      if (!profile) return 0;
      const biddedJobIds = await prisma.bid.findMany({
        where: { providerId: userId },
        select: { jobId: true },
      });
      return prisma.job.count({
        where: {
          category: profile.specialty,
          status: "ACTIVE",
          id: { notIn: biddedJobIds.map((b) => b.jobId) },
        },
      });
    }),

    // Follow Ups = provider's bids still PENDING (waiting for client response)
    prisma.bid.count({
      where: { providerId: userId, status: "PENDING" },
    }),

    // Active Jobs = provider's bids ACCEPTED
    prisma.bid.count({
      where: { providerId: userId, status: "ACCEPTED", completedAt: null },
    }),

    // Today's earnings
    prisma.earning.aggregate({
      where: {
        providerId: userId,
        type: "credit",
        createdAt: { gte: today },
      },
      _sum: { amount: true },
    }),

    // This month's earnings
    prisma.earning.aggregate({
      where: {
        providerId: userId,
        type: "credit",
        createdAt: { gte: monthStart },
      },
      _sum: { amount: true },
    }),

    // Recent leads (last 5 bids with lead status)
    // Recent Leads = matching jobs provider has not bid on
    
   prisma.providerProfile.findUnique({
    where: { userId },
  })
  .then(async (profile) => {
    if (!profile) return [];

    const existingBids = await prisma.bid.findMany({
      where: { providerId: userId },
      select: { jobId: true },
    });
    
    return prisma.job.findMany({
      where: {
        category: profile.specialty,
        status: "ACTIVE",
        id: {
          notIn: existingBids.map(
            (b) => b.jobId
          ),
        },
      },

      include: {
        client: {
          select: {
            name: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },

      take: 5,
    });
  }),

    // Active jobs (accepted bids with progress)
    
    prisma.bid.findMany({
      where: { providerId: userId, status: "ACCEPTED", completedAt: null },
      include: {
        client: { select: { name: true } },
        job: { select: { title: true, location: true } },
      },
      orderBy: { updatedAt: "desc" },
      take: 5,
    }),

    // Upcoming scheduled jobs
    prisma.scheduledJob.findMany({
      where: {
        providerId: userId,
        scheduledAt: { gte: new Date() },
      },
      orderBy: { scheduledAt: "asc" },
      take: 3,
    }),

    // Wallet balance
    prisma.providerProfile.findUnique({
      where: { userId },
      select: { walletBalance: true },
    }),
  ]);

  // Format stats
  const stats: ProviderStats = {
    newLeads: newLeadsCount,
    followUps: followUpsCount,
    activeJobs: activeJobsCount,
    todayEarnings: todayEarnings._sum.amount ?? 0,
    monthEarnings: monthEarnings._sum.amount ?? 0,
  };

  // Format recent leads
   const recentLeads: RecentLead[] =
   recentJobs.map((job) => ({
    id: job.id,

    clientName: job.client.name,

    clientInitials: getInitials(
      job.client.name
    ),

    workType: job.title,

    location:
      job.location ??
      "Greater Noida",

    timeAgo: timeAgo(job.createdAt),

    leadStatus: "New",
  }));

  // Format active jobs
  const activeJobsList: ActiveJob[] = activeBids.map((bid) => ({
    id: bid.id,
    clientName: bid.client.name,
    workTitle: bid.job.title,
    location: bid.job.location ?? "Greater Noida",
    progress: bid.progress,
  }));

  // Format upcoming jobs
  const upcomingJobs: UpcomingJob[] = upcomingScheduled.map((sj) => {
    const date = new Date(sj.scheduledAt);
    return {
      id: sj.id,
      day: date.getDate().toString(),
      month: date.toLocaleString("en-IN", { month: "short" }).toUpperCase(),
      title: sj.title,
      clientName: sj.clientName,
      time: date.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
      status: sj.status,
    };
  });

  // Profile completion
  const profileCompletion: ProfileCompletion = {
    percentage: providerProfile
      ? Math.round(
          [
            providerProfile.hasBasicInfo,
            providerProfile.hasServicesPricing,
            providerProfile.hasWorkPhotos,
            providerProfile.hasIdVerification,
            providerProfile.hasBankDetails,
          ].filter(Boolean).length * 20
        )
      : 20,
    hasBasicInfo: providerProfile?.hasBasicInfo ?? true,
    hasServicesPricing: providerProfile?.hasServicesPricing ?? false,
    hasWorkPhotos: providerProfile?.hasWorkPhotos ?? false,
    hasIdVerification: providerProfile?.hasIdVerification ?? false,
    hasBankDetails: providerProfile?.hasBankDetails ?? false,
  };

  return {
    stats,
    recentLeads,
    activeJobs: activeJobsList,
    upcomingJobs,
    profileCompletion,
    walletBalance: walletData?.walletBalance ?? 0,
    isOnline: providerProfile?.isOnline ?? true,
    specialty: providerProfile?.specialty ?? "Provider",
  };
}