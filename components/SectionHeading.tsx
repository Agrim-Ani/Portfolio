export default function SectionHeading({
  index,
  title,
}: {
  index: string;
  title: string;
}) {
  return (
    <div className="mb-10 flex items-center gap-3">
      <span className="font-mono text-sm text-[var(--color-accent)]">{index}.</span>
      <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
      <span className="ml-2 hidden h-px flex-1 bg-[var(--color-border)] sm:block" />
    </div>
  );
}
