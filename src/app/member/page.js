import Link from "next/link";
import MemberProfileSection from "../components/MemberProfileSection";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";

export const metadata = {
  title: "Member profile | Inner Tide Studios",
  description:
    "Manage your Inner Tide Studios bookings, passes, and account.",
};

export default function MemberPage() {
  return (
    <div className="page">
      <SiteHeader />

      <main className="main-content">
        <div className="member-page__bar">
          <Link href="/" className="member-page__back">
            ← Back to home
          </Link>
        </div>
        <MemberProfileSection />
      </main>

      <SiteFooter />
    </div>
  );
}
