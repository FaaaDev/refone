import { Checkbox } from "./checkbox";

interface CCheckProps {
  label: string;
  value: boolean;
  onChange?: (value: boolean) => void;
}

export default function CCheck({ label, value, onChange }: CCheckProps) {
  return (
    <div className="flex items-center space-x-2" key={label}>
      <Checkbox
        id={label.replace(" ", "-").toLowerCase()}
        className="hover:cursor-pointer"
        checked={value || false}
        onCheckedChange={(checked:boolean) => {
          console.log(`Checkbox ${label} changed to:`, checked);
          if (onChange) {
            onChange(checked);
          }
        }}
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
