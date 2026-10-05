import Messenger from "@/components/shared/Messenger";
import { getConversations } from "@/lib/actions/message-action";
import { requireUser } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function ClientMessagesPage({ searchParams }: { searchParams: Promise<{ c?: string }> }) {
  const user = await requireUser();
  const { c } = await searchParams;
  const { conversations } = await getConversations();
  return <Messenger initialConversations={conversations} currentUserId={user.id} initialActiveId={c ?? null} />;
}
