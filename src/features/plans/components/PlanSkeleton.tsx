export function PlanSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="animate-pulse rounded-lg border border-gray-200 bg-white p-6">
          <div className="h-5 w-1/2 rounded bg-gray-200" />
          <div className="mt-3 h-8 w-1/3 rounded bg-gray-200" />
          <div className="mt-4 space-y-2">
            {Array.from({ length: 3 }).map((_, j) => (
              <div key={j} className="h-3 rounded bg-gray-100" />
            ))}
          </div>
          <div className="mt-6 h-9 rounded bg-gray-200" />
        </div>
      ))}
    </div>
  );
}
