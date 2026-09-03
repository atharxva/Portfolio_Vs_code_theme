"use client";

import { GraduationCap, Calendar } from "lucide-react";
import { EDUCATION } from "@/data/education";

export function Education() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-14 sm:px-10">
      <h1 className="flex items-center gap-2 text-3xl font-semibold text-text-bright">
        <span className="h-7 w-1 rounded bg-accent" />
        Education
      </h1>
      <p className="mt-2 text-[13px] text-text-muted">
        Academic background.
      </p>

      <div className="mt-8 space-y-4">
        {EDUCATION.map((item) => (
          <div
            key={item.id}
            className="flex items-start gap-4 rounded-xl border border-border-subtle bg-elevated p-5"
          >
            <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-app text-accent">
              <GraduationCap size={18} />
            </div>
            <div>
              <p className="text-[15px] font-semibold text-text-bright">
                {item.degree}
              </p>
              <p className="text-[13px] text-accent">{item.institute}</p>
              <p className="mt-1 flex items-center gap-1 text-[12px] text-text-muted">
                <Calendar size={12} /> {item.dateRange}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
