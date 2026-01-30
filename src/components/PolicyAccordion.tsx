import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface PolicyAccordionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const PolicyAccordion = ({ title, children, defaultOpen = false }: PolicyAccordionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-border rounded-lg mb-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/30 transition-colors"
      >
        <span className="text-lg font-bold text-foreground" style={{ fontFamily: "'Poppins', sans-serif" }}>{title}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-muted-foreground" strokeWidth={2} />
        ) : (
          <ChevronDown className="w-5 h-5 text-muted-foreground" strokeWidth={2} />
        )}
      </button>
      {isOpen && (
        <div className="px-5 pb-5 text-muted-foreground">
          {children}
        </div>
      )}
    </div>
  );
};

export default PolicyAccordion;
