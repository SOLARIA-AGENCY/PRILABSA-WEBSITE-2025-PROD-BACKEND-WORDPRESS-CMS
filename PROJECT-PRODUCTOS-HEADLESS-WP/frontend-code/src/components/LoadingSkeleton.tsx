/**
 * LoadingSkeleton Component - Loading State for Products
 * PRILABSA Headless WordPress Integration
 * @author SOLARIA AGENCY
 */

/**
 * LoadingSkeleton Props
 */
interface LoadingSkeletonProps {
  count?: number;
}

/**
 * LoadingSkeleton Component
 */
export default function LoadingSkeleton({ count = 12 }: LoadingSkeletonProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg animate-pulse"
        >
          {/* Image Skeleton */}
          <div className="h-64 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200"></div>

          {/* Content Skeleton */}
          <div className="p-6 space-y-4">
            {/* Code Badge Skeleton */}
            <div className="h-6 w-20 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 rounded"></div>

            {/* Title Skeleton */}
            <div className="space-y-2">
              <div className="h-4 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 rounded w-full"></div>
              <div className="h-4 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 rounded w-3/4"></div>
            </div>

            {/* Description Skeleton */}
            <div className="space-y-2">
              <div className="h-3 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 rounded w-full"></div>
              <div className="h-3 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 rounded w-full"></div>
              <div className="h-3 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 rounded w-2/3"></div>
            </div>

            {/* Brand Badge Skeleton */}
            <div className="h-6 w-24 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 rounded-lg"></div>

            {/* Tags Skeleton */}
            <div className="flex gap-2">
              <div className="h-6 w-16 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 rounded"></div>
              <div className="h-6 w-20 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 rounded"></div>
              <div className="h-6 w-14 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 rounded"></div>
            </div>

            {/* Button Skeleton */}
            <div className="h-10 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 rounded-xl"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Single Card Loading Skeleton
 */
export function ProductCardSkeleton() {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg animate-pulse">
      {/* Image Skeleton */}
      <div className="h-64 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200"></div>

      {/* Content Skeleton */}
      <div className="p-6 space-y-4">
        {/* Code Badge Skeleton */}
        <div className="h-6 w-20 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 rounded"></div>

        {/* Title Skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 rounded w-full"></div>
          <div className="h-4 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 rounded w-3/4"></div>
        </div>

        {/* Description Skeleton */}
        <div className="space-y-2">
          <div className="h-3 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 rounded w-full"></div>
          <div className="h-3 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 rounded w-full"></div>
          <div className="h-3 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 rounded w-2/3"></div>
        </div>

        {/* Brand Badge Skeleton */}
        <div className="h-6 w-24 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 rounded-lg"></div>

        {/* Tags Skeleton */}
        <div className="flex gap-2">
          <div className="h-6 w-16 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 rounded"></div>
          <div className="h-6 w-20 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 rounded"></div>
          <div className="h-6 w-14 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 rounded"></div>
        </div>

        {/* Button Skeleton */}
        <div className="h-10 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 rounded-xl"></div>
      </div>
    </div>
  );
}

/**
 * Category Filter Loading Skeleton
 */
export function CategoriesSkeleton() {
  return (
    <div className="mb-8 flex justify-center">
      <div className="flex flex-wrap gap-3 justify-center items-center">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-12 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 rounded-xl animate-pulse"
            style={{ width: `${80 + Math.random() * 80}px` }}
          ></div>
        ))}
      </div>
    </div>
  );
}
