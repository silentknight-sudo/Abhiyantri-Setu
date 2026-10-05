import JobDetailPage from "@/app/jobs/[id]/page";

export const dynamic = "force-dynamic";

export default function LeadDetailPage(props: { params: Promise<{ id: string }> }) {
  return <JobDetailPage {...props} />;
}
