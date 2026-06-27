"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { updateProfile } from "@/lib/actions/profile-action";
import { useRouter } from "next/navigation";


interface Props {
  profile: {
    id: string;
    name: string;
    email: string;
    image: string | null;
    location: string | null;
    bio: string | null;
    phone: string | null;
  } | null | undefined;
}

// gettin the dynamic data 
type FormType = {
  name: string;
  bio: string;
  phone: string;
  location: string;
  role: string;
};

// Icons
const SaveIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
    <polyline points="17 21 17 13 7 13 7 21" />
    <polyline points="7 3 7 8 15 8" />
  </svg>
);

const CancelIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const CameraIcon = () => (
  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

// Helpers 
function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

//Input Field
function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-800 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 transition-all bg-white";

const disabledClass =
  "w-full border border-gray-100 rounded-xl px-4 py-3 text-sm text-gray-400 bg-gray-50 cursor-not-allowed";

// ── Main Component
export default function ProfilePage({ profile }: Props) {
 const router = useRouter();
  const [form, setForm] = useState<FormType>({
    name: profile?.name || "",
    bio: profile?.bio || "",
    phone: profile?.phone || "",
    location: profile?.location || "",
    role: "Client",
  });

  const userEmail = profile?.email || "";
  const userImage = profile?.image || null;

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  //  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const initials = getInitials(form.name);

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSave = async () => {
    setError("");
    setMessage(null);

    if (!form.name.trim()) {
      setError("Full name is required.");
      return;
    }

    setSaving(true);

    const result = await updateProfile(form);

    setSaving(false);

    if (result?.success) {
      setMessage("Profile updated successfull");
      setSaved(true);
      router.refresh();
    } else {
      setMessage(result?.error || "Something went Wrong");
    }
  };

  const handleCancel = () => {
    if (!profile) return;

    setForm({
      name: profile.name || "",
      bio: profile.bio || "",
      phone: profile.phone || "",
      location: profile.location || "",
      role: "Client",
    });

    setError("");
    setSaved(false);
  };

  const isChanged =
  form.name !== (profile?.name || "") ||
  form.bio !== (profile?.bio || "") ||
  form.phone !== (profile?.phone || "") ||
  form.location !== (profile?.location || "");

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Card */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

        {/*  Avatar Section  */}
          <div className="flex flex-col items-center pt-10 pb-6 px-6 border-b border-gray-100">
            {/* Avatar with camera overlay */}
            <div className="relative mb-4">
              <div className="w-24 h-24 rounded-full bg-[#1A2332] ring-4 ring-yellow-400 flex items-center justify-center text-white font-bold text-2xl overflow-hidden">
                {userImage ? (
                  <Image src={userImage} alt={form.name} width={96} height={96} className="object-cover" />
                ) : (
                  initials
                )}
              </div>
              {/* Camera button */}
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-md hover:bg-yellow-500 transition-colors">
                <CameraIcon />
              </button>
            </div>

            {/* Name + badge + email */}
            <h1 className="text-xl font-bold text-gray-900">{form.name || "Your Name"}</h1>
            <span className="mt-1.5 text-xs font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
              {form.role}
            </span>
            <p className="text-sm text-gray-400 mt-2">{userEmail}</p>
          </div>

          {/* Form Section */}
          <div className="p-6 sm:p-8 flex flex-col gap-5">

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
                {error}
              </div>
            )}

            {/* Success */}
            {saved && (
              <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl px-4 py-3 flex items-center gap-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Profile updated successfully.
              </div>
            )}

            {/* Full Name */}
            <Field label="Full Name" required>
              <input
                type="text"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Enter your full name"
                className={inputClass}
              />
            </Field>

            {/* Bio */}
            <Field label="Bio / About">
              <textarea
                rows={4}
                value={form.bio}
                onChange={(e) => handleChange("bio", e.target.value)}
                placeholder="Tell us about yourself..."
                className={`${inputClass} resize-y`}
              />
            </Field>

            {/* Phone */}
            <Field label="Phone Number">
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                placeholder="+91 9876543210"
                className={inputClass}
              />
            </Field>

            {/* Location */}
            <Field label="Location / City">
              <input
                type="text"
                value={form.location}
                onChange={(e) => handleChange("location", e.target.value)}
                placeholder="e.g. Greater Noida"
                className={inputClass}
              />
            </Field>

            {/* Role — read only */}
            <Field label="Role">
              <input
                type="text"
                value={form.role}
                disabled
                className={disabledClass}
              />
            </Field>
            

            {/* ── Buttons ── */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleSave}
                disabled={saving || !isChanged}
                className="flex-1 flex items-center  disabled:cursor-not-allowed justify-center gap-2 bg-[#1A2332] text-white font-semibold py-3 rounded-xl hover:bg-[#2C3E55] transition-colors text-sm disabled:opacity-60"
              >
                {saving ? (
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={4} />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                ) : (
                  <SaveIcon />
                )}
                {saving ? "Saving..." : "Save Changes"}
              </button>

              <button
                onClick={handleCancel}
                className="flex-1 flex items-center justify-center gap-2 border border-gray-200 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-50 transition-colors text-sm"
              >
                <CancelIcon /> Cancel
              </button>
            </div>

          </div>
        </div>

        {/* Back link */}
        <div className="text-center mt-6">
          <Link href="/client/dashboard" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
            ← Back to Dashboard
          </Link>
        </div>

      </div>
    </div>
  );
}