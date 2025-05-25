import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import logo from "@/assets/refone.png";
import Search from "./search";
import { useRef } from "react";

export default function Header() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  return (
    <header className="p-4 border-b sticky top-0 bg-white z-100">
      <div className="px-4 md:px-8 max-w-7xl mx-auto flex items-center justify-between gap-2">
        <div className="flex gap-6 items-center" ref={wrapperRef}>
          <Link to="/">
            <img src={logo} alt="Logo" className="max-w-25 object-contain" />
          </Link>

          <Search wrapperRef={wrapperRef} />
        </div>

        <div className="flex gap-2 items-center">
          <Button variant="outline">Sign Up</Button>
          <Button>Sign In</Button>
        </div>
      </div>

      {/* Mobile Search */}
      <Search wrapperRef={wrapperRef} isMobile/>
    </header>
  );
}
