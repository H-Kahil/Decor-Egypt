import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface AddButtonProps {
  onClick: () => void;
  label: string;
  disabled?: boolean;
}

const AddButton: React.FC<AddButtonProps> = ({
  onClick,
  label,
  disabled = false,
}) => {
  return (
    <Button
      className="bg-violet-600 hover:bg-violet-700"
      onClick={onClick}
      disabled={disabled}
    >
      <Plus className="mr-2 h-4 w-4" /> {label}
    </Button>
  );
};

export default AddButton;
