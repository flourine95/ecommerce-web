import { Card, CardContent } from '@/components/ui/card';

export default function ProductsLoading() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[...Array(12)].map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="aspect-square animate-pulse bg-gray-200" />
            <div className="space-y-3 p-4">
              <div className="h-4 animate-pulse rounded bg-gray-200" />
              <div className="h-3 w-3/4 animate-pulse rounded bg-gray-200" />
              <div className="h-6 w-1/2 animate-pulse rounded bg-gray-200" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
