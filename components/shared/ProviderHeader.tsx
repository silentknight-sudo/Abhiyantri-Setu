import NotificationBell from "@/components/shared/NotificationBell";

export default function ProviderHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) {
  return (
    <div className="mb-5 flex items-center justify-between gap-3 lg:mb-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900 lg:text-2xl">{title}</h1>
        {subtitle && <p className="mt-0.5 text-sm text-gray-400">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-2">
        {action}
        <div className="hidden lg:block">
          <NotificationBell />
        </div>
      </div>
    </div>
  );
}
