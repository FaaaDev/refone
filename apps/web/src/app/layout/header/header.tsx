import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FilterIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="p-4 border-b">
      <div className="px-4 md:px-8 max-w-7xl mx-auto flex items-center justify-between gap-2">
        <div className="flex gap-6 items-center">
          <Link to="/">
            <div className="font-bold text-xl">Refone</div>
          </Link>
          <Input
            placeholder="Search in Refone"
            className="sm:w-xs md:w-md hidden md:block"
          />
        </div>
        <div className="flex gap-2 items-center">
          <Button variant="outline" size="default">
            Sign Up
          </Button>
          <Button variant="default" size="default">
            Sign In
          </Button>
        </div>
      </div>
      <div className="flex items-center gap-2 px-4 py-2 mt-2 md:hidden">
        <Input placeholder="Search in Refone" className="w-full md:w-md" />
        <Button variant="outline" size="icon">
          <FilterIcon />
        </Button>
      </div>
    </header>
  );
}
