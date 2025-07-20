// components/PaginationControls.tsx
import { Button } from "@/components/ui/button";

type Props = {
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
};

export default function PaginationControls({
  page,
  totalPages,
  onPageChange,
}: Props) {
  return (
    <div className="flex items-center justify-center gap-4 mt-6">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 0}
      >
        Prev
      </Button>
      <span className="dark:text-white text-sm">
        Page {page + 1} of {totalPages}
      </span>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages - 1}
      >
        Next
      </Button>
    </div>
  );
}
