import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type RowData,
  type SortingState,
} from "@tanstack/react-table";
import { useEffect, useRef, useState } from "react";
import { isValidElement } from "react";

type TableHOCProps<T extends RowData> = {
  columns: ColumnDef<T, unknown>[];
  data: T[];
  containerClassname?: string;
  heading?: string;
  showPagination?: boolean;
  pageSize?: number;
  cellBorders?: boolean;
};

function TableHOC<T extends RowData>({
  columns,
  data,
  containerClassname,
  heading,
  showPagination = false,
  pageSize = 6,
  cellBorders = false,
}: TableHOCProps<T>) {
  return function HOC() {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [pagination, setPagination] = useState({
      pageIndex: 0,
      pageSize: pageSize,
    });
    const tableRef = useRef<HTMLDivElement>(null);

    // Scroll on page change
    useEffect(() => {
      if (tableRef.current) {
        tableRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, [pagination.pageIndex]);

    const table = useReactTable({
      columns,
      data,
      state: {
        sorting,
        pagination,
      },
      onSortingChange: setSorting,
      onPaginationChange: setPagination,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
    });

    return (
      <div ref={cellBorders ? tableRef : null} className={containerClassname}>
        {heading ? (
          <h1 className="text-4xl font-bold mt-8 mb-4 text-center dark:text-white/80 text-gray-600">
            {heading}
          </h1>
        ) : null}

        <table className={`table ${cellBorders ? "with-cell-borders" : ""}`}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="dark:text-white"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                    {header.column.getIsSorted() && (
                      <span>
                        {header.column.getIsSorted() === "desc" ? " 🔽" : " 🔼"}
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="dark:text-white">
                {row.getVisibleCells().map((cell) => {
                  const cellValue = cell.getValue();

                  if (isValidElement(cellValue)) {
                    return <td key={cell.id}>{cellValue}</td>;
                  }

                  return (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>

        {showPagination && (
          <div className="table-pagination">
            <button
              disabled={!table.getCanPreviousPage()}
              onClick={() => {
                table.previousPage();
              }}
            >
              Prev
            </button>
            <span className="p-2 dark:text-white">{`${
              table.getState().pagination.pageIndex + 1
            } of ${table.getPageCount()}`}</span>
            <button
              disabled={!table.getCanNextPage()}
              onClick={() => {
                table.nextPage();
              }}
            >
              Next
            </button>
          </div>
        )}
      </div>
    );
  };
}

export default TableHOC;
