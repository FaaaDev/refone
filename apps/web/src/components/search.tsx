import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "./ui/input";
import { useWindowScrollPositions } from "@/lib/scroll";
import { Button } from "./ui/button";
import { FilterIcon } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Skeleton } from "./ui/skeleton";

type QueryType = {
  query: string;
  count: number;
  createdAt: string;
  updatedAt: string;
};

export default function Search({
  wrapperRef,
  isMobile = false,
}: {
  wrapperRef: React.RefObject<HTMLDivElement | null>;
  isMobile?: boolean;
}) {
  const { scrollY } = useWindowScrollPositions();
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const { data, isLoading } =
    trpc.search_query.suggestions.useQuery<QueryType[]>();

  const { data: searchData, isLoading: loadingSearch } =
    trpc.search_query.search.useQuery<QueryType[]>(
      { q: search },
      { enabled: search.length > 1 }
    );

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

  if (isMobile) {
    return (
      <div className="w-full">
        <div
          className={`${scrollY > 0 ? "hidden" : "flex"} items-center gap-2 px-4 py-2 mt-2 md:hidden`}
        >
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
            <div className="absolute top-26 left-8 right-8 mt-1 bg-white border rounded-md shadow z-50 max-h-60 overflow-auto p-2 md:hidden">
              {!isLoading && !loadingSearch
                ? Array.from({ length: 8 }).map((item, i) => (
                    <div
                      key={i}
                      className="p-2 hover:bg-gray-100 cursor-pointer text-sm rounded-md"
                      onClick={() => {}}
                    >
                      Search Query
                    </div>
                  ))
                : Array.from({ length: 3 }).map((_, i) => (
                    <div className="p-2" key={i}>
                      <Skeleton className="w-full h-5 rounded-md" />
                    </div>
                  ))}
            </div>
          )}
          <Button variant="outline" size="icon">
            <FilterIcon />
          </Button>
        </div>
        {showDropdown && (
          <div
            className="absolute top-32 left-0 right-0 bottom-0 block-ui h-[100vh] full md:hidden"
            onClick={() => setShowDropdown(false)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="w-full">
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
            setShowDropdown(true);
          }}
          placeholder="Search in Refone"
          className="w-full"
        />
        {showDropdown && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-md shadow z-50 max-h-60 overflow-auto p-2">
            {!isLoading && !loadingSearch ? (
              searchData?.length && search.length > 1 ? (
                searchData?.map((item: QueryType, i: number) => (
                  <div
                    key={i}
                    className="p-2 hover:bg-gray-100 cursor-pointer text-sm rounded-md"
                    onClick={() => {}}
                  >
                    {item.query}
                  </div>
                ))
              ) : search.length == 0 ? (
                data?.map((item: QueryType, i) => (
                  <div
                    key={i}
                    className="p-2 hover:bg-gray-100 cursor-pointer text-sm rounded-md"
                    onClick={() => {}}
                  >
                    {item.query}
                  </div>
                ))
              ) : (
                <div
                  className="p-2 hover:bg-gray-100 cursor-pointer text-sm rounded-md"
                  onClick={() => {}}
                >
                  Search for {search}
                </div>
              )
            ) : (
              Array.from({ length: 5 }).map((_, i) => (
                <div className="p-2" key={i}>
                  <Skeleton className="w-full h-5 rounded-md" />
                </div>
              ))
            )}
          </div>
        )}
      </div>
      {showDropdown && (
        <div
          className="absolute top-17 left-0 right-0 bottom-0 block-ui h-[100vh] full"
          onClick={() => setShowDropdown(false)}
        />
      )}
    </div>
  );
}
