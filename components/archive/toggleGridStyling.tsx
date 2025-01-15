import { GridIcon } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";

export type ToggleGridStylingProps = {
  onClick: (isSmallGrid: boolean) => void;
};

export function ToggleGridStyling({ onClick }: ToggleGridStylingProps) {
  return (
    <Toggle aria-label="Toggle sort" variant="outline" onPressedChange={onClick}>
      <GridIcon className="h-4 w-4" />
    </Toggle>
  );
}