import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-4 py-16">
      <div className="w-full max-w-md rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-xl">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-100 text-2xl">🔑</div>
        <h1 className="text-2xl font-bold text-gray-900">Forgot your password?</h1>
        <p className="mt-3 text-sm text-gray-500">
          Signed up with Google? Just use <b>Continue with Google</b> on the sign-in page. Otherwise, contact our support team with
          your registered email and we&apos;ll help you reset it.
        </p>
        <div className="mt-6 flex flex-col gap-3">
          <Link href="/contact" className="rounded-xl bg-[#1A2332] py-3 text-sm font-semibold text-white hover:bg-[#2C3E55]">
            Contact Support
          </Link>
          <a href="https://wa.me/919289553069" target="_blank" rel="noopener noreferrer" className="rounded-xl border border-gray-200 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50">
            WhatsApp us
          </a>
          <Link href="/auth" className="text-sm text-yellow-600 hover:underline">← Back to sign in</Link>
        </div>
      </div>
    </div>
  );
}
