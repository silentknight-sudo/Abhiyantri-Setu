import { redirect } from "next/navigation";

export default function TransactionsPage() {
  redirect("/provider/earnings#transactions");
}
