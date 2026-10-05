import LegalPage from "@/components/shared/LegalPage";

export const metadata = { title: "Privacy Policy | Abhiyantri Setu" };

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="October 2026"
      sections={[
        { heading: "What we collect", body: "Account details (name, email, phone), profile information you add, jobs you post, quotations, messages, reviews, and basic technical data such as IP address and browser type for security." },
        { heading: "How we use it", body: "To run the marketplace: show your profile or job to the right people, deliver messages and notifications, prevent fraud, and improve the service." },
        { heading: "Sharing", body: "Your public provider profile, services, photos and reviews are visible to everyone. Job details are visible to providers. Messages are visible only to the two participants. Bank and ID details are never shown publicly. We do not sell your personal data." },
        { heading: "Setu AI", body: "Questions you send to Setu AI are processed by our AI provider to generate answers. Don't include sensitive personal information in AI chats." },
        { heading: "Your choices", body: "You can edit your profile at any time. To delete your account and data, contact us through the Contact page." },
        { heading: "Security", body: "Passwords are hashed and data is stored in an encrypted managed database. No system is perfectly secure, so please use a strong, unique password." },
      ]}
    />
  );
}
