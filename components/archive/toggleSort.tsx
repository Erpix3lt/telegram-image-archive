import { SortAscIcon, SortDescIcon } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { useState } from "react";

export type ToggleSortProps = {
  onClick: (isSortDesc: boolean) => void;
};

export function ToggleSort({ onClick }: ToggleSortProps) {
  const [isSortDesc, setIsSortDesc] = useState(false);

  const handleToggle = () => {
    setIsSortDesc(!isSortDesc);
    onClick(!isSortDesc);
  };

  return (
    <Toggle aria-label="Toggle sort" variant="outline" onPressedChange={handleToggle} defaultChecked>
      {!isSortDesc ? <SortDescIcon className="h-4 w-4" /> : <SortAscIcon className="h-4 w-4" />}
    </Toggle>
  );
}