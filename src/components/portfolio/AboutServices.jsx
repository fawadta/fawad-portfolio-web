import { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";

export default function AboutServices() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    base44.entities.Service.list({ sort: "sort_order", limit: 12 })
      .then(({ items }) => setServices(items))
      .catch(() => setServices([]));
  }, []);

  if (services.length === 0) return null;

  return (
    <>
      <h2 className="mt-12 font-display text-2xl font-bold text-ghost sm:text-3xl">
        What he takes on
      </h2>
      <ul className="mt-6 space-y-4">
        {services.map((service) => (
          <li key={service.id} className="rounded-xl border border-border bg-surface p-5">
            <h3 className="font-display text-lg font-semibold text-ghost">{service.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
            {service.best_for && (
              <p className="mt-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                Best for: <span className="text-ghost">{service.best_for}</span>
              </p>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}