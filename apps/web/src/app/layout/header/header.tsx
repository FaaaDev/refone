import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FilterIcon } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/refone.png";
import { useWindowScrollPositions } from "@/lib/scroll";

export default function Header() {
  const { scrollY } = useWindowScrollPositions();

  return (
    <header className="p-4 border-b sticky top-0 bg-white z-100">
      <div className="px-4 md:px-8 max-w-7xl mx-auto flex items-center justify-between gap-2">
        <div className="flex gap-6 items-center">
          <Link to="/">
            <img src={logo} alt="Logo" className="h-8 object-contain" />
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
      <div className={`${scrollY > 0 ? "hidden" : "flex"} items-center gap-2 px-4 py-2 mt-2 md:hidden`}>
        <Input placeholder="Search in Refone" className="w-full md:w-md" />
        <Button variant="outline" size="icon">
          <FilterIcon />
        </Button>
      </div>
    </header>
  );
}
