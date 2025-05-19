import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Header() {
  return (
    <header className="p-4 border-b">
      <div className="px-4 md:px-8 max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex gap-6 items-center">
          <div className="font-bold text-xl">Refone</div>
          <Input
            placeholder="Search in Refone"
            className="sm:w-xs md:w-md"
          />
        </div>
        <div className="flex gap-2 items-center">
          <Button variant="outline" size="sm">
            Sign Up
          </Button>
          <Button variant="default" size="sm">
            Sign In
          </Button>
        </div>
      </div>
    </header>
  );
}
