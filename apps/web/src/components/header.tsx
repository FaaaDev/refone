import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import logo from "@/assets/refone.png";
import { FilterIcon } from "lucide-react";
import { useWindowScrollPositions } from "@/lib/scroll";

export default function Header() {
  const { scrollY } = useWindowScrollPositions();
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  // const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // const handleSelect = (slug: string) => {
  //   setShowDropdown(false);
  //   setSearch("");
  //   navigate(`/search?q=${slug}`);
  // };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="p-4 border-b sticky top-0 bg-white z-100">
      <div className="px-4 md:px-8 max-w-7xl mx-auto flex items-center justify-between gap-2">
        <div className="flex gap-6 items-center" ref={wrapperRef}>
          <Link to="/">
            <img src={logo} alt="Logo" className="h-8 object-contain" />
          </Link>

          <div className="relative hidden md:block w-md">
            <Input
              ref={inputRef}
              value={search}
              onFocus={() => setShowDropdown(true)}
              onChange={(e) => {
                setSearch(e.target.value);
                setShowDropdown(true);
              }}
              onClick={() => {
                console.log("CLICK");

                setShowDropdown(true);
              }}
              placeholder="Search in Refone"
              className="w-full"
            />
            {showDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-md shadow z-50 max-h-60 overflow-auto p-2">
                {Array.from({ length: 8 }).map((item, i) => (
                  <div
                    key={i}
                    className="p-2 hover:bg-gray-100 cursor-pointer text-sm rounded-md"
                    onClick={() => {}}
                  >
                    Search Query
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {showDropdown && (
          <div className="absolute top-17 left-0 right-0 bottom-0 block-ui h-[100vh] full" />
        )}

        <div className="flex gap-2 items-center">
          <Button variant="outline">Sign Up</Button>
          <Button>Sign In</Button>
        </div>
      </div>

      {/* Mobile Search */}
      <div
        className={`${scrollY > 0 ? "hidden" : "flex"} items-center gap-2 px-4 py-2 mt-2 md:hidden`}
      >
        <Input placeholder="Search in Refone" className="w-full md:w-md" />
        <Button variant="outline" size="icon">
          <FilterIcon />
        </Button>
      </div>
    </header>
  );
}
