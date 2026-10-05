import { getJobs } from "@/lib/actions/job-action";
import Link from "next/link";

export const dynamic = "force-dynamic";


export default async function JobsPage() {
  const result = await getJobs();
  const jobs = result.jobs ?? [];


  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" />
                <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
              </svg>
              Construction Jobs
            </h1>
            <p className="text-gray-500 text-sm mt-1">Post your project or browse available opportunities</p>
          </div>
          <Link href="/jobs/post"
            className="inline-flex items-center gap-2 bg-[#1A2332] text-white font-semibold px-5 py-3 rounded-xl hover:bg-[#2C3E55] transition-colors text-sm">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Post New Job
          </Link>
        </div>

        {/* Jobs list or empty state */}
        {jobs.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-2xl p-16 flex flex-col items-center text-center">
            <svg className="w-16 h-16 text-gray-300 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2" />
              <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
            </svg>
            <h2 className="text-lg font-bold text-gray-900 mb-2">No Jobs Found</h2>
            <p className="text-gray-400 text-sm mb-6">No open construction jobs available at the moment.</p>
            <Link href="/jobs/post"
              className="inline-flex items-center gap-2 bg-[#1A2332] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#2C3E55] transition-colors text-sm">
              + Post a Job
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {jobs.map((job) => (
              <Link key={job.id} href={`/jobs/${job.id}`}
                className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs font-semibold px-2 py-1 rounded-full bg-blue-50 text-blue-600">
                    {job.category}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(job.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{job.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-2 mb-3">{job.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>📍 {job.location}</span>
                  {job.budget && <span className="font-semibold text-gray-700">₹{job.budget.toLocaleString("en-IN")}</span>}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}