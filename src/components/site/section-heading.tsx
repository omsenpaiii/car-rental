import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  inverted?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  inverted = false,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "mx-auto max-w-2xl items-center text-center"
      )}
    >
      {eyebrow ? (
        <span className="text-sm font-semibold uppercase tracking-[0.14em] text-amber-500">
          {eyebrow}
        </span>
      ) : null}
      <h2
        className={cn(
          "max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl",
          inverted ? "text-white" : "text-slate-950"
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "max-w-2xl text-base leading-7 sm:text-lg",
            inverted ? "text-slate-300" : "text-slate-600"
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
