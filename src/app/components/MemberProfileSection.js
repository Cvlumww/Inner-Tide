"use client";

import BsportEmbed from "./BsportEmbed";
import { BSPORT_MEMBER_PROFILE } from "@/lib/bsport-configs";

export default function MemberProfileSection() {
  return (
    <section className="section section--member" id="member">
      <h2 className="section-heading">Member profile</h2>
      <p className="member-section__intro">
        Log in to manage bookings, passes, and your account.
      </p>
      <BsportEmbed
        config={BSPORT_MEMBER_PROFILE}
        className="member-widget__mount"
      />
    </section>
  );
}
