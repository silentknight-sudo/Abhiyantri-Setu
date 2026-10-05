"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createJob } from "@/lib/actions/job-action";

// ── Types 
interface FormData {
  title: string;
  category: string;
  description: string;
  area: string;
  materialQuality: string;
  city: string;
  detailedLocation: string;
  timeline: string;
  includeMaterials: boolean;
  minBudget: string;
  maxBudget: string;
  sitePhotos: File[];
  floorPlans: File[];
}

interface AiEstimator {
  projectType: string;
  area: string;
  materialQuality: string;
  city: string;
  laborType: string;
}

// ── Constants 
const CATEGORIES = [
  "Architect",
  "Contractor",
  "Interior Designer",
  "Electrician",
  "Plumber",
  "Painter",
  "Civil Engineer",
  "Mason",
];

const CITIES = [
  "Greater Noida",
  "Noida NCR",
  "Delhi",
  "Ghaziabad",
  "Faridabad",
  "Gurugram",
];

const MATERIAL_QUALITY = ["Basic", "Standard", "Premium"];
const LABOR_TYPES = ["Full (Labour + Material)", "Labour Only", "Material Only"];

// ── Icons ──────────────────────────────────────────────────────────────────
const BriefcaseIcon = () => (
  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
  strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const UploadIcon = () => (
  <svg className="w-8 h-8 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
  strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 16 12 12 8 16" />
    <line x1="12" y1="12" x2="12" y2="21" />
    <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
  </svg>
);

const AIIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} 
  strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M9 9h6M9 12h6M9 15h4" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} 
  strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} 
  strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
  </svg>
);

const RupeeIcon = () => (
  <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
  strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 3h12M6 8h12M6 13l8.5 8L18 13H6" />
  </svg>
);

// ── Step Indicator 
function StepIndicator({ current }: { current: number }) {
  const steps = [
    { n: 1, label: "Basic Details", sub: "Project info" },
    { n: 2, label: "Scope", sub: "Area & quality" },
    { n: 3, label: "Budget & Files", sub: "Final step" },
  ];

  return (
    <div className="flex items-start gap-0 mb-8">
      {steps.map((step, i) => (
        <div key={step.n} className="flex items-start flex-1">
          <div className="flex flex-col items-center">
            {/* Circle */}
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all
              ${current > step.n
                ? "bg-[#1A2332] text-white"
                : current === step.n
                  ? "bg-white border-2 border-[#1A2332] text-[#1A2332]"
                  : "bg-white border-2 border-gray-200 text-gray-400"
              }`}>
              {current > step.n ? <CheckIcon /> : step.n}
            </div>
            {/* Label */}
            <div className="mt-2 text-center">
              <p className={`text-xs font-semibold ${current >= step.n ? "text-gray-900" : "text-gray-400"}`}>
                {step.label}
              </p>
              <p className="text-xs text-gray-400">{step.sub}</p>
            </div>
          </div>

          {/* Connector line */}
          {i < steps.length - 1 && (
            <div className={`flex-1 h-0.5 mt-5 mx-2 transition-all ${current > step.n ? "bg-[#1A2332]" : "bg-gray-200"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

// ── File Upload Zone 
function FileUpload({
  label,
  accept,
  hint,
  files,
  onChange,
}: {
  label: string;
  accept: string;
  hint: string;
  files: File[];
  onChange: (files: File[]) => void;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) onChange(Array.from(e.target.files));
  };

  return (
    <div className="mb-5">
      <div className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-700">
        {label === "Site Photos" ? (
          <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
          </svg>
        ) : (
          <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
          </svg>
        )}
        {label}
      </div>
      <label className="block border-2 border-dashed border-gray-200 rounded-xl p-8 text-center cursor-pointer hover:border-yellow-400 hover:bg-yellow-50 transition-all">
        <input type="file" multiple accept={accept} onChange={handleChange} className="hidden" />
        <UploadIcon />
        <p className="text-sm text-gray-500 mt-2">
          {files.length > 0
            ? `${files.length} file(s) selected`
            : `Click to upload ${label.toLowerCase()}`}
        </p>
        <p className="text-xs text-gray-400 mt-1">{hint}</p>
      </label>
    </div>
  );
}

// ── AI Price Estimator Sidebar 
// function AiEstimatorSidebar({
//   estimator,
//   onChange,
// }: {
//   estimator: AiEstimator;
//   onChange: (key: keyof AiEstimator, val: string) => void;
// }) {
//   const [estimate, setEstimate] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   const handleEstimate = async () => {
//     if (!estimator.projectType || !estimator.area) return;
//     setLoading(true);

//     // Simulate AI calculation (replace with real API call)
//     await new Promise((r) => setTimeout(r, 1200));

//     const baseRates: Record<string, number> = {
//       Architect: 50,
//       Contractor: 1800,
//       Interior: 800,
//       Electrician: 120,
//       Plumber: 150,
//       Painter: 25,
//       "Civil Engineer": 2000,
//       Mason: 900,
//     };

//     const qualityMultiplier = { Basic: 0.8, Standard: 1, Premium: 1.5 };
//     const laborMultiplier = {
//       "Full (Labour + Material)": 1,
//       "Labour Only": 0.45,
//       "Material Only": 0.55,
//     };

//     const base = baseRates[estimator.projectType] ?? 1000;
//     const area = parseFloat(estimator.area) || 100;
//     const qm = qualityMultiplier[estimator.materialQuality as keyof typeof qualityMultiplier] ?? 1;
//     const lm = laborMultiplier[estimator.laborType as keyof typeof laborMultiplier] ?? 1;

//     const min = Math.round(base * area * qm * lm * 0.85 / 1000) * 1000;
//     const max = Math.round(base * area * qm * lm * 1.15 / 1000) * 1000;

//     setEstimate(`₹${min.toLocaleString("en-IN")} – ₹${max.toLocaleString("en-IN")}`);
//     setLoading(false);
//   };

//   return (
//     <div className="bg-white border border-gray-200 rounded-2xl p-6 sticky top-6">
//       <div className="flex items-center gap-2 mb-5">
//         <AIIcon />
//         <h3 className="font-bold text-gray-900">AI Price Estimator</h3>
//       </div>

//       <div className="grid grid-cols-2 gap-3 mb-3">
//         {/* Project Type */}
//         <div>
//           <label className="block text-xs font-medium text-gray-600 mb-1">Project Type</label>
//           <select value={estimator.projectType} onChange={(e) => onChange("projectType", e.target.value)}
//             className="w-full border border-gray-200 rounded-lg px-2 py-2 text-xs text-gray-700 outline-none focus:border-yellow-400">
//             <option value="">Select...</option>
//             {CATEGORIES.map(c => <option key={c}>{c}</option>)}
//           </select>
//         </div>

//         {/* Area */}
//         <div>
//           <label className="block text-xs font-medium text-gray-600 mb-1">Area (sq ft)</label>
//           <input type="number" placeholder="Enter area i..." value={estimator.area}
//             onChange={(e) => onChange("area", e.target.value)}
//             className="w-full border border-gray-200 rounded-lg px-2 py-2 text-xs text-gray-700 outline-none focus:border-yellow-400" />
//         </div>

//         {/* Material Quality */}
//         <div>
//           <label className="block text-xs font-medium text-gray-600 mb-1">Material Quality</label>
//           <select value={estimator.materialQuality} onChange={(e) => onChange("materialQuality", e.target.value)}
//             className="w-full border border-gray-200 rounded-lg px-2 py-2 text-xs text-gray-700 outline-none focus:border-yellow-400">
//             {MATERIAL_QUALITY.map(q => <option key={q}>{q}</option>)}
//           </select>
//         </div>

//         {/* City */}
//         <div>
//           <label className="block text-xs font-medium text-gray-600 mb-1">City</label>
//           <select value={estimator.city} onChange={(e) => onChange("city", e.target.value)}
//             className="w-full border border-gray-200 rounded-lg px-2 py-2 text-xs text-gray-700 outline-none focus:border-yellow-400">
//             {CITIES.map(c => <option key={c}>{c}</option>)}
//           </select>
//         </div>
//       </div>

//       {/* Labor Type */}
//       <div className="mb-4">
//         <label className="block text-xs font-medium text-gray-600 mb-1">Labor Type</label>
//         <select value={estimator.laborType} onChange={(e) => onChange("laborType", e.target.value)}
//           className="w-full border border-gray-200 rounded-lg px-2 py-2 text-xs text-gray-700 outline-none focus:border-yellow-400">
//           {LABOR_TYPES.map(l => <option key={l}>{l}</option>)}
//         </select>
//       </div>

//       {/* Estimate Result */}
//       {estimate && (
//         <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 mb-3 text-center">
//           <p className="text-xs text-gray-500 mb-0.5">Estimated Range</p>
//           <p className="text-base font-bold text-gray-900">{estimate}</p>
//           <p className="text-xs text-gray-400 mt-0.5">Based on market rates in {estimator.city}</p>
//         </div>
//       )}

//       <button onClick={handleEstimate} disabled={loading || !estimator.projectType || !estimator.area}
//         className="w-full bg-[#1A2332] text-white font-semibold py-3 rounded-xl hover:bg-[#2C3E55] transition-colors text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
//         {loading ? (
//           <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
//             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={4} />
//             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
//           </svg>
//         ) : <AIIcon />}
//         {loading ? "Estimating..." : "Get AI Estimate"}
//       </button>
//     </div>
//   );
// }

// ── Main Component 
export default function PostJobPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState<FormData>({
    title: "",
    category: "",
    description: "",
    area: "",
    materialQuality: "Standard",
    city: "Greater Noida",
    detailedLocation: "",
    timeline: "",
    includeMaterials: false,
    minBudget: "",
    maxBudget: "",
    sitePhotos: [],
    floorPlans: [],
  });

  const [estimator, setEstimator] = useState<AiEstimator>({
    projectType: "",
    area: "",
    materialQuality: "Standard",
    city: "Greater Noida",
    laborType: "Full (Labour + Material)",
  });

  const setField = (key: keyof FormData, value: any) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const setEstimatorField = (key: keyof AiEstimator, value: string) =>
    setEstimator((prev) => ({ ...prev, [key]: value }));

  // ── Validation 
  const validateStep1 = () => {
    const e: Record<string, string> = {};
    if (!form.title.trim()) e.title = "Project title is required.";
    if (!form.category) e.category = "Please select a project type.";
    if (form.description.trim().length < 20) e.description = "Description must be at least 20 characters.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e: Record<string, string> = {};
    if (!form.area.trim()) e.area = "Area is required.";
    if (!form.city) e.city = "Please select a city.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    setErrors({});
    setStep((s) => s + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setErrors({});
    setStep((s) => s - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const result = await createJob({
        title: form.title,
        description: form.description,
        category: form.category,
        budget: form.maxBudget ? parseFloat(form.maxBudget) : null,
        location: form.detailedLocation
          ? `${form.detailedLocation}, ${form.city}`
          : form.city,
      });

      // @ts-ignore
      if (result?.error) {
        setErrors({ submit: result.error });
      } else {
       router.push("/client/dashboard?success=job_created");
      }
    } catch {
      setErrors({ submit: "Something went wrong. Please try again." });
    }
    setSubmitting(false);
  };

  const inputClass = (field: string) =>
    `w-full border ${errors[field] ? "border-red-400 bg-red-50" : "border-gray-200"} rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 transition-all`;

  return (
    <div className="min-h-screen bg-gray-50">
      

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
            <BriefcaseIcon /> Post Your Construction Job
          </h1>
          <p className="text-gray-500 mt-1 ml-10">Describe your project and receive competitive bids from verified contractors</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* ── Form ── */}
          <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-6 sm:p-8">
            <StepIndicator current={step} />

            {/* ── STEP 1: Basic Details ── */}
            {step === 1 && (
              <div className="flex flex-col gap-5">
                {/* Project Title */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                    Project Title <span className="text-red-500">*</span>
                  </label>
                  <input type="text" placeholder="e.g., 3BHK Full Home Interior Design"
                    value={form.title} onChange={(e) => setField("title", e.target.value)}
                    className={inputClass("title")} />
                  {errors.title
                    ? <p className="text-xs text-red-500 mt-1">{errors.title}</p>
                    : <p className="text-xs text-gray-400 mt-1">Give your project a clear, descriptive title</p>}
                </div>

                {/* Project Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                    Project Type <span className="text-red-500">*</span>
                  </label>
                  <select value={form.category} onChange={(e) => setField("category", e.target.value)}
                    className={inputClass("category")}>
                    <option value="">Select project type</option>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category}</p>}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                    Brief Description <span className="text-red-500">*</span>
                  </label>
                  <textarea rows={5} placeholder="Describe your project requirements, preferences, and any specific details you'd like contractors to know..."
                    value={form.description} onChange={(e) => setField("description", e.target.value)}
                    className={`${inputClass("description")} resize-y`} />
                  <div className="flex justify-between mt-1">
                    {errors.description
                      ? <p className="text-xs text-red-500">{errors.description}</p>
                      : <p className="text-xs text-gray-400">Minimum 20 characters</p>}
                    <p className="text-xs text-gray-400">{form.description.length} chars</p>
                  </div>
                </div>
              </div>
            )}

            {/* ── STEP 2: Scope ── */}
            {step === 2 && (
              <div className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Area */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-1.5 flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></svg>
                      Area (sq ft) <span className="text-red-500">*</span>
                    </label>
                    <input type="number" placeholder="e.g., 1200" value={form.area}
                      onChange={(e) => setField("area", e.target.value)}
                      className={inputClass("area")} />
                    {errors.area && <p className="text-xs text-red-500 mt-1">{errors.area}</p>}
                  </div>

                  {/* Material Quality */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-1.5 flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
                      Material Quality <span className="text-red-500">*</span>
                    </label>
                    <select value={form.materialQuality} onChange={(e) => setField("materialQuality", e.target.value)}
                      className={inputClass("materialQuality")}>
                      {MATERIAL_QUALITY.map(q => <option key={q}>{q}</option>)}
                    </select>
                    <p className="text-xs text-gray-400 mt-1">Basic (economical) • Standard (mid-range) • Premium (high-end)</p>
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-1.5 flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                      City <span className="text-red-500">*</span>
                    </label>
                    <select value={form.city} onChange={(e) => setField("city", e.target.value)}
                      className={inputClass("city")}>
                      {CITIES.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>

                  {/* Detailed Location */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                      Detailed Location
                    </label>
                    <input type="text" placeholder="Sector, Area, Landmark"
                      value={form.detailedLocation} onChange={(e) => setField("detailedLocation", e.target.value)}
                      className={inputClass("detailedLocation")} />
                  </div>

                  {/* Timeline */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-1.5 flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                      Expected Timeline (weeks)
                    </label>
                    <input type="number" placeholder="e.g., 12"
                      value={form.timeline} onChange={(e) => setField("timeline", e.target.value)}
                      className={inputClass("timeline")} />
                    <p className="text-xs text-gray-400 mt-1">How many weeks do you expect the project to take?</p>
                  </div>

                  {/* Materials Preference */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                      Materials Preference
                    </label>
                    <div className="border border-gray-200 rounded-xl p-4 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-800">Include materials in contractor quotes</p>
                        <p className="text-xs text-gray-400 mt-0.5">Turn on if you want contractors to provide materials</p>
                      </div>
                      {/* Toggle */}
                      <button onClick={() => setField("includeMaterials", !form.includeMaterials)}
                        className={`relative w-11 h-6 rounded-full transition-colors ${form.includeMaterials ? "bg-yellow-400" : "bg-gray-200"}`}>
                        <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${form.includeMaterials ? "translate-x-5" : "translate-x-0"}`} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── STEP 3: Budget & Files ── */}
            {step === 3 && (
              <div className="flex flex-col gap-6">
                {/* Budget Range */}
                <div>
                  <h3 className="text-base font-bold text-gray-900 flex items-center gap-2 mb-4">
                    <RupeeIcon /> Budget Range
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                        Minimum Budget (₹)
                      </label>
                      <input type="number" placeholder="e.g., 500000"
                        value={form.minBudget} onChange={(e) => setField("minBudget", e.target.value)}
                        className={inputClass("minBudget")} />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                        Maximum Budget (₹)
                      </label>
                      <input type="number" placeholder="e.g., 800000"
                        value={form.maxBudget} onChange={(e) => setField("maxBudget", e.target.value)}
                        className={inputClass("maxBudget")} />
                    </div>
                  </div>
                </div>

                {/* Attachments */}
                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-4">Attachments (Optional)</h3>
                  <FileUpload
                    label="Site Photos"
                    accept="image/jpeg,image/png,image/webp"
                    hint="JPG, PNG, WEBP"
                    files={form.sitePhotos}
                    onChange={(files) => setField("sitePhotos", files)}
                  />
                  <FileUpload
                    label="Floor Plans / Sketches"
                    accept="application/pdf,image/jpeg,image/png"
                    hint="PDF, JPG, PNG"
                    files={form.floorPlans}
                    onChange={(files) => setField("floorPlans", files)}
                  />
                </div>

                {/* Submit error */}
                {errors.submit && (
                  <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
                    {errors.submit}
                  </div>
                )}
              </div>
            )}

            {/* ── Navigation Buttons ── */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
              <button onClick={handleBack} disabled={step === 1}
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                <ArrowLeftIcon /> Back
              </button>

              {step < 3 ? (
                <button onClick={handleNext}
                  className="flex items-center gap-2 bg-[#1A2332] text-white font-semibold px-7 py-3 rounded-xl hover:bg-[#2C3E55] transition-colors text-sm">
                  Next <ArrowRightIcon />
                </button>
              ) : (
                <button onClick={handleSubmit} disabled={submitting}
                  className="flex items-center gap-2 bg-[#1A2332] text-white font-semibold px-8 py-3 rounded-xl hover:bg-[#2C3E55] transition-colors text-sm disabled:opacity-60">
                  {submitting && (
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={4} />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                  )}
                  {submitting ? "Posting..." : "Post Job"}
                </button>
              )}
            </div>
          </div>

          {/* ── AI Estimator Sidebar ── */}
          {/* <div className="lg:col-span-1">
            <AiEstimatorSidebar estimator={estimator} onChange={setEstimatorField} />
          </div> */}

        </div>
      </main>
    </div>
  );
}