import { Check, X } from "lucide-react";

interface PackageInclusionsProps {
  inclusions: string[];
  exclusions: string[];
}

const PackageInclusions = ({ inclusions, exclusions }: PackageInclusionsProps) => {
  return (
    <div className="border border-border rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold text-foreground mb-6 pb-4 border-b border-border">
        What's inside the package?
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Inclusions */}
        <div>
          <h3 className="font-semibold text-foreground mb-4">Inclusions</h3>
          <ul className="space-y-3">
            {inclusions.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Exclusions */}
        <div>
          <h3 className="font-semibold text-foreground mb-4">Exclusions</h3>
          <ul className="space-y-3">
            {exclusions.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <X className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PackageInclusions;
