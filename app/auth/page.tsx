"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn, signUp, signInSocial } from "@/lib/actions/auth-action";

// Icons 
const LogoIcon = () => (
  <div className="w-14 h-14 bg-yellow-400 rounded-full flex items-center justify-center shadow-md">
    <svg className="w-7 h-7 text-gray-900" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm-7 3a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm6 13H6v-.6C6 16.1 8.7 14 12 14s6 2.1 6 4.4V19z" />
    </svg>
  </div>
);

const MailIcon = () => (
  <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const EyeIcon = ({ show }: { show: boolean }) => (
  <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    {show ? (
      <>
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </>
    ) : (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </>
    )}
  </svg>
);

const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

const Spinner = () => (
  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={4} />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
  </svg>
);

//  Component 
export default function AuthPage() {
  const router = useRouter();

  const [tab, setTab] = useState<"signin" | "signup">("signin");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [signInForm, setSignInForm] = useState({ email: "", password: "" });
  const [signUpForm, setSignUpForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    agreed: false,
  });

  // Google sign-in
  const handleSocialAuth = async (provider: "google") => {
    setGoogleLoading(true);
    setError("");
    try {
      const { url } = await signInSocial(provider);
      if (url) {
        window.location.href = url;
      } else {
        setError("Could not get Google sign-in URL. Please try again.");
        setGoogleLoading(false);
      }
    } catch (err) {
      setError(
        `Error authenticating with ${provider}: ${
          err instanceof Error ? err.message : "Unknown error"
        }`
      );
      setGoogleLoading(false);
    }
    
  };

  //  Email Sign In 
  const handleSignIn = async () => {
    setError("");
    if (!signInForm.email || !signInForm.password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      const result = await signIn(signInForm.email, signInForm.password);
      // @ts-ignore
      if (result?.error) {
        // @ts-ignore
        setError(result.error.message ?? "Invalid email or password.");
      } else {
        router.push("/client/dashboard");
        router.refresh();
      }
    } catch {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  //  Email Sign Up 
  const handleSignUp = async () => {
    setError("");
    setSuccess("");
    if (!signUpForm.name || !signUpForm.email || !signUpForm.password) {
      setError("Please fill in all fields.");
      return;
    }
    if (signUpForm.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (signUpForm.password !== signUpForm.confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (!signUpForm.agreed) {
      setError("Please accept the Terms of Service.");
      return;
    }
    setLoading(true);
    try {
      const result = await signUp(signUpForm.email, signUpForm.password, signUpForm.name);
      // @ts-ignore
      if (result?.error) {
        // @ts-ignore
        setError(result.error.message ?? "Registration failed.");
      } else {
        router.push("/client/dashboard");
        router.refresh();
      }
    } catch {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  //  Shared Google Button 
  const GoogleButton = () => (
    <button
      onClick={() => handleSocialAuth("google")}
      disabled={googleLoading}
      className="w-full flex cursor-pointer items-center justify-center gap-3 border border-gray-200 rounded-xl py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {googleLoading ? <Spinner /> : <GoogleIcon />}
      {googleLoading ? "Redirecting to Google..." : "Continue with Google"}
    </button>
  );

  return (
    <div className="min-h-screen bg-[#1e2535] flex flex-col">
      {/* Back to Home */}
      <div className="p-4 sm:p-6">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-300 hover:text-white text-sm transition-colors">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back to Home
        </Link>
      </div>

      {/* Card */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 sm:p-10">

          {/* Logo */}
          <div className="flex flex-col items-center mb-6">
            <LogoIcon />
            <h1 className="text-2xl font-bold text-gray-900 mt-4">Abhiyantri Setu</h1>
            <p className="text-gray-500 text-sm mt-1">Connect with trusted construction professionals</p>
          </div>

          {/* Tabs */}
          <div className="flex cursor-pointer bg-gray-100 rounded-xl p-1 mb-6">
            {(["signin", "signup"] as const).map((t) => (
              <button
                key={t}
                onClick={() => { setTab(t); setError(""); setSuccess(""); }}
                className={`flex-1 py-2.5 cursor-pointer rounded-lg text-sm font-semibold transition-all duration-200 ${
                  tab === t ? "bg-[#1A2332] text-white shadow-sm" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {t === "signin" ? "Sign In" : "Sign Up"}
              </button>
            ))}
          </div>

          {/* Error / Success */}
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl px-4 py-3">
              {success}
            </div>
          )}

          {/* ── SIGN IN ── */}
          {tab === "signin" && (
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1.5">Email Address</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2"><MailIcon /></span>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={signInForm.email}
                    onChange={(e) => setSignInForm({ ...signInForm, email: e.target.value })}
                    onKeyDown={(e) => e.key === "Enter" && handleSignIn()}
                    className="w-full text-black border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm placeholder-gray-400 outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1.5">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={signInForm.password}
                    onChange={(e) => setSignInForm({ ...signInForm, password: e.target.value })}
                    onKeyDown={(e) => e.key === "Enter" && handleSignIn()}
                    className="w-full text-black border border-gray-200 rounded-xl px-4 py-3 pr-10 text-sm placeholder-gray-400 outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 transition-all"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2">
                    <EyeIcon show={showPassword} />
                  </button>
                </div>
                <div className="text-right mt-1.5">
                  <a href="#" className="text-xs text-yellow-600 hover:underline font-medium">Forgot password?</a>
                </div>
              </div>

              <button
                onClick={handleSignIn}
                disabled={loading}
                className="w-full cursor-pointer bg-[#1A2332] text-white font-semibold py-3.5 rounded-xl hover:bg-[#2C3E55] transition-colors text-sm mt-1 flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {loading && <Spinner />}
                {loading ? "Signing in..." : "Sign In to Dashboard"}
              </button>

              <div className="flex items-center gap-3">
                <hr className="flex-1 border-gray-200" />
                <span className="text-xs text-gray-400 font-medium tracking-wide">OR CONTINUE WITH</span>
                <hr className="flex-1 border-gray-200" />
              </div>

              <GoogleButton />
            </div>
          )}

          {/* ── SIGN UP ── */}
          {tab === "signup" && (
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1.5">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={signUpForm.name}
                  onChange={(e) => setSignUpForm({ ...signUpForm, name: e.target.value })}
                  className="w-full text-black border border-gray-200 rounded-xl px-4 py-3 text-sm placeholder-gray-400 outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1.5">Email Address</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2"><MailIcon /></span>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={signUpForm.email}
                    onChange={(e) => setSignUpForm({ ...signUpForm, email: e.target.value })}
                    className="w-full text-black border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm placeholder-gray-400 outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1.5">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password (min 8 chars)"
                    value={signUpForm.password}
                    onChange={(e) => setSignUpForm({ ...signUpForm, password: e.target.value })}
                    className="w-full text-black border border-gray-200 rounded-xl px-4 py-3 pr-10 text-sm placeholder-gray-400 outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 transition-all"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2">
                    <EyeIcon show={showPassword} />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1.5">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={signUpForm.confirm}
                    onChange={(e) => setSignUpForm({ ...signUpForm, confirm: e.target.value })}
                    className="w-full text-black border border-gray-200 rounded-xl px-4 py-3 pr-10 text-sm placeholder-gray-400 outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 transition-all"
                  />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2">
                    <EyeIcon show={showConfirm} />
                  </button>
                </div>
              </div>

              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={signUpForm.agreed}
                  onChange={(e) => setSignUpForm({ ...signUpForm, agreed: e.target.checked })}
                  className="mt-0.5 accent-yellow-400 w-4 h-4"
                />
                <span className="text-xs text-gray-500 leading-relaxed">
                  I agree to the{" "}
                  <a href="#" className="text-yellow-600 hover:underline font-medium">Terms of Service</a> and{" "}
                  <a href="#" className="text-yellow-600 hover:underline font-medium">Privacy Policy</a>
                </span>
              </label>

              <button
                onClick={handleSignUp}
                disabled={loading}
                className="w-full bg-[#1A2332] text-white font-semibold py-3.5 rounded-xl hover:bg-[#2C3E55] transition-colors text-sm mt-1 flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {loading && <Spinner />}
                {loading ? "Creating account..." : "Create Account"}
              </button>

              <div className="flex items-center gap-3">
                <hr className="flex-1 border-gray-200" />
                <span className="text-xs text-gray-400 font-medium tracking-wide">OR CONTINUE WITH</span>
                <hr className="flex-1 border-gray-200" />
              </div>

              <GoogleButton />
            </div>
          )}

        </div>
      </div>
    </div>
  );
}