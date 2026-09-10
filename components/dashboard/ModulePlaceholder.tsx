import { Card } from "@/components/ui/Card";

export function ModulePlaceholder({
  title,
  description,
  capabilities,
}: {
  title: string;
  description: string;
  capabilities: string[];
}) {
  return (
    <div>
      <p className="eyebrow">Enterprise module</p>
      <h1 className="display mt-3 text-4xl text-ink">{title}</h1>
      <p className="mt-3 max-w-2xl text-muted">{description}</p>
      <Card className="mt-8 border-dashed">
        <p className="text-sm font-medium text-ink">
          This workspace is architected and waiting on live organization data.
        </p>
        <p className="mt-2 text-sm text-muted">
          AUTHENTIC does not invent metrics for modules that are not yet connected
          to the API for your organization.
        </p>
        <ul className="mt-5 grid gap-2 text-sm text-muted">
          {capabilities.map((item) => (
            <li key={item}>— {item}</li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
