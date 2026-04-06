"use client";

import { useState } from "react";
import Link from "next/link";

interface AccordionSection {
  id: string;
  title: string;
  links: Array<{ href: string; label: string }>;
}

export default function FooterAccordion() {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setOpenAccordion((prev) => (prev === id ? null : id));
  };

  const sections: AccordionSection[] = [
    {
      id: "company",
      title: "The Company",
      links: [
        { href: "/about-us", label: "ABOUT US" },
        { href: "/privacy-policy", label: "PRIVACY POLICY" },
        { href: "/terms-and-conditions", label: "TERMS AND CONDITIONS" },
        { href: "/returns-and-refunds", label: "RETURN AND REFUNDS" },
      ],
    },
    {
      id: "services",
      title: "Customer Services",
      links: [
        { href: "/track-order", label: "TRACK MY ORDER" },
        { href: "/contact-us", label: "CONTACT US" },
        { href: "/faqs", label: "FAQS" },
      ],
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-2 md:max-w-xl md:mx-auto">
      {sections.map((section) => (
        <div
          key={section.id}
          className="px-5 border-b border-zinc-900 md:border-b-0 last:border-b-0"
        >
          <button
            className="md:pointer-events-none w-full flex items-center justify-between py-4 text-left text-sm font-medium hover:underline md:hover:no-underline transition-all outline-none rounded-md text-zinc-100"
            onClick={() => toggleAccordion(section.id)}
          >
            <h2 className="uppercase tracking-wide sm:text-xl">
              {section.title}
            </h2>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`text-zinc-600 size-4 shrink-0 transition-transform duration-200 md:hidden ${
                openAccordion === section.id ? "rotate-180" : ""
              }`}
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
          <div
            className={`overflow-hidden transition-all duration-200 md:block! ${
              openAccordion === section.id ? "block" : "hidden"
            }`}
          >
            <div className="pb-4 space-y-1.5">
              {section.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm uppercase tracking-wide text-zinc-400 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
