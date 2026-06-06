import type { Benefit } from "@/types/home";

type BenefitsSectionProps = {
  benefits: Benefit[];
};

export function BenefitsSection({ benefits }: BenefitsSectionProps) {
  return (
    <section className="border-t border-zinc-200 bg-white py-16">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <div className="grid gap-4 lg:grid-cols-4">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <div
                key={benefit.title}
                className="rounded-[8px] bg-[#fbfaf7] p-6 shadow-sm ring-1 ring-zinc-200"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-md bg-emerald-50 text-[#0d7a32]">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-bold">{benefit.title}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
