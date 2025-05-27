import Filter from "./filter";

export default function SideFilter({
  onChangeCategory,
  onChangeSort,
  selectedSort = "createdAt",
  selectedCategoryId,
}: {
  onChangeCategory?: (category: string[]) => void;
  onChangeSort?: (category: string) => void;
  selectedSort?: string;
  selectedCategoryId?: string[];
}) {
  return (
    <div className="h-250 w-xs border rounded-xl hidden md:block sticky overflow-hidden top-8">
      <h6 className="font-bold p-4">Filter</h6>
      <div
        className="p-4 h-235 overflow-y-auto not-hover:overflow-y-hidden
        [&::-webkit-scrollbar]:w-1
        [&::-webkit-scrollbar]:h-1
        [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb]:bg-gray-300
        dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
      >
        <Filter
          selectedCategoryId={selectedCategoryId}
          selectedSort={selectedSort}
          onChangeCategory={(categories) => {
            if (onChangeCategory) onChangeCategory(categories);
          }}
          onChangeSort={(key) => {
            if (onChangeSort) onChangeSort(key);
          }}
        />
      </div>
    </div>
  );
}
