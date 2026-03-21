import Link from "next/link";
import MemberProfileSection from "../components/MemberProfileSection";
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

      <footer className="site-footer">
        <p>
          Inner Tide Studios — Reformer Pilates, 16 Fitzroy Place, Second Floor,
          Finnieston, Glasgow, G3 7RW
        </p>
        <p className="site-footer__link">
          Website by <Link href="https://calum.work">Calum Fraser Wardrop</Link>
        </p>
      </footer>
    </div>
  );
}
