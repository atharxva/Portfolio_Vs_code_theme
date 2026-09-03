"use client";

import { Mail, Phone } from "lucide-react";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const CONTACTS = [
  {
    label: "Email",
    value: "atharvajadhavlm10@gmail.com",
    href: "mailto:atharvajadhavlm10@gmail.com",
    icon: Mail,
  },
  {
    label: "Phone",
    value: "+91 83692 44148",
    href: "tel:+918369244148",
    icon: Phone,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/atharva12",
    href: "https://linkedin.com/in/atharva12",
    icon: FaLinkedin,
  },
  {
    label: "GitHub",
    value: "github.com/atharxva",
    href: "https://github.com/atharxva",
    icon: FaGithub,
  },
];

export function Contact() {
  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-14 sm:px-10">
      <h1 className="flex items-center gap-2 text-3xl font-semibold text-text-bright">
        <span className="h-7 w-1 rounded bg-accent" />
        Contact
      </h1>
      <p className="mt-2 text-[13px] text-text-muted">
        Reach out — happy to talk about opportunities or collaborations.
      </p>

      <div className="mt-8 space-y-3">
        {CONTACTS.map(({ label, value, href, icon: Icon }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-xl border border-border-subtle bg-elevated p-4 transition-colors hover:border-border-strong"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-app text-accent">
              <Icon size={18} />
            </div>
            <div>
              <p className="text-[12px] text-text-muted">{label}</p>
              <p className="text-[14px] text-text-bright">{value}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
