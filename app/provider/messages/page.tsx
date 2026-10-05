import Messenger from "@/components/shared/Messenger";
import { getConversations } from "@/lib/actions/message-action";
import { requireProvider } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function ProviderMessagesPage({ searchParams }: { searchParams: Promise<{ c?: string }> }) {
  const user = await requireProvider();
  const { c } = await searchParams;
  const { conversations } = await getConversations();
  return <Messenger initialConversations={conversations} currentUserId={user.id} initialActiveId={c ?? null} embedded />;
}
