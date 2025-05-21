import { Skeleton } from "./ui/skeleton";

export default function LoadingGrid() {
  return (
    <div className="p-4 md:p-8 max-w-full md:max-w-7xl mx-auto flex flex-row gap-0 md:gap-6">
      <Skeleton className="h-250 w-xs rounded-xl hidden md:block" />
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
        {[...Array(20)].map((_, i) => (
          <Skeleton key={i} className="h-[300px] w-full rounded-xl" />
        ))}
      </div>
    </div>
  );
}
