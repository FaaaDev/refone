import { Checkbox } from "./checkbox";

interface CCheckProps {
  label: string;
}

export default function CCheck({ label }: CCheckProps) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={label.replace(" ", "-").toLowerCase()}
        className="hover:cursor-pointer"
      />
      <label
        htmlFor={label.replace(" ", "-").toLowerCase()}
        className="hover:cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  );
}
