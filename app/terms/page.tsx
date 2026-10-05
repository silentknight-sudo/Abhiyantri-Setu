import LegalPage from "@/components/shared/LegalPage";

export const metadata = { title: "Terms of Service | Abhiyantri Setu" };

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      updated="October 2026"
      sections={[
        { heading: "1. About the platform", body: "Abhiyantri Setu is a marketplace that connects clients who need construction, renovation, repair and maintenance work with independent service providers. We are not a party to the agreement between a client and a provider." },
        { heading: "2. Accounts", body: "You must provide accurate information when creating an account and keep your password secure. You are responsible for all activity on your account. Providers must have the skills and any licences required for the work they offer." },
        { heading: "3. Jobs and quotations", body: "Clients may post jobs and receive quotations. Accepting a quotation creates an agreement directly between the client and the provider. Prices, timelines and scope should be confirmed in writing before work begins." },
        { heading: "4. Payments", body: "Unless stated otherwise, payments are made directly between client and provider. Earnings shown in the provider dashboard are records of completed jobs on the platform." },
        { heading: "5. Reviews and conduct", body: "Reviews must be honest and based on real work. Harassment, fraud, spam and misleading listings are not allowed and may lead to account suspension." },
        { heading: "6. Liability", body: "Abhiyantri Setu does not guarantee the quality, safety or legality of work performed by providers. To the extent permitted by law, our liability is limited to the fees (if any) you paid us." },
        { heading: "7. Contact", body: "Questions about these terms? Reach us through the Contact page." },
      ]}
    />
  );
}
