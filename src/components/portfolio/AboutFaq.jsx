import { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";

export default function AboutFaq() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    base44.entities.Faq.list({ sort: "sort_order", limit: 12 })
      .then(({ items: rows }) => setItems(rows))
      .catch(() => setItems([]));
  }, []);

  if (items.length === 0) return null;

  return (
    <section aria-labelledby="faq-heading" className="mt-12">
      <h2 id="faq-heading" className="font-display text-2xl font-bold text-ghost sm:text-3xl">
        Questions people ask
      </h2>
      <dl className="mt-6 space-y-5">
        {items.map((item) => (
          <div key={item.id} className="rounded-xl border border-border bg-surface-2/60 p-5">
            <dt className="font-display text-base font-semibold text-ghost">{item.question}</dt>
            <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}