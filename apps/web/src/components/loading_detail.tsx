import { Skeleton } from "./ui/skeleton";

export default function LoadingDetail() {
  return (
    <div className="p-4 md:p-8 max-w-full md:max-w-7xl mx-auto space-y-6">
        <div className="flex flex-row gap-6">
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col md:flex-row gap-6 w-full">
              <div className="flex flex-col w-full gap-4">
                <Skeleton className="h-100 w-full rounded-xl" />
                <div className="flex flex-row gap-4">
                  <Skeleton className="h-16 w-16 rounded-xl" />
                  <Skeleton className="h-16 w-16 rounded-xl" />
                  <Skeleton className="h-16 w-16 rounded-xl" />
                  <Skeleton className="h-16 w-16 rounded-xl" />
                </div>
              </div>
              <div className="flex flex-col w-full gap-4">
                <Skeleton className="h-8 w-[100%] rounded-xl" />
                <Skeleton className="h-6 w-[20%] rounded-xl" />
                <Skeleton className="h-8 w-[60%] rounded-xl" />
                <Skeleton className="h-5 w-[10%] rounded-xl mt-4" />
                <div className="flex flex-row w-full gap-2">
                  <Skeleton className="h-10 w-[15%] rounded-xl" />
                  <Skeleton className="h-10 w-[15%] rounded-xl" />
                  <Skeleton className="h-10 w-[15%] rounded-xl" />
                </div>
                <Skeleton className="h-5 w-[10%] rounded-xl mt-4" />
                <div className="flex flex-row w-full gap-2">
                  <Skeleton className="h-10 w-[15%] rounded-xl" />
                  <Skeleton className="h-10 w-[15%] rounded-xl" />
                  <Skeleton className="h-10 w-[15%] rounded-xl" />
                </div>
                <Skeleton className="h-5 w-[10%] rounded-xl mt-4" />
                <div className="flex flex-row w-full gap-2">
                  <Skeleton className="h-10 w-[15%] rounded-xl" />
                  <Skeleton className="h-10 w-[15%] rounded-xl" />
                  <Skeleton className="h-10 w-[15%] rounded-xl" />
                </div>
              </div>
            </div>
            <Skeleton className="h-8 w-[30%] rounded-xl mt-6" />
            <Skeleton className="h-6 w-[90%] rounded-xl" />
            <Skeleton className="h-6 w-[70%] rounded-xl" />
            <Skeleton className="h-6 w-[80%] rounded-xl" />

            <Skeleton className="h-8 w-[30%] rounded-xl mt-6" />
            <Skeleton className="h-6 w-[70%] rounded-xl" />
            <Skeleton className="h-6 w-[80%] rounded-xl" />
            <Skeleton className="h-6 w-[80%] rounded-xl" />
          </div>
          <div className="w-120 h-fit border rounded-xl sticky top-8 p-6 flex-col gap-4 hidden xl:flex">
            <Skeleton className="h-5 w-[30%] rounded-xl" />
            <div className="flex flex-row w-full justify-between">
              <Skeleton className="h-5 w-[30%] rounded-xl" />
              <Skeleton className="h-5 w-[35%] rounded-xl" />
            </div>
            <div className="flex flex-row w-full justify-between">
              <Skeleton className="h-5 w-[25%] rounded-xl" />
              <Skeleton className="h-5 w-[30%] rounded-xl" />
            </div>
            <div className="flex flex-row w-full justify-between mt-5">
              <Skeleton className="h-5 w-[40%] rounded-xl" />
              <Skeleton className="h-5 w-[35%] rounded-xl" />
            </div>
            <Skeleton className="h-10 w-full rounded-xl mt-6" />
            <Skeleton className="h-10 w-full rounded-xl" />
          </div>
        </div>
      </div>
  )
}
