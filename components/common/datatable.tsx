import { tData } from "@/types";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
  MdRefresh,
} from "react-icons/md";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { BiSolidFileExport } from "react-icons/bi";
import { RxMixerHorizontal } from "react-icons/rx";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DataTableProps<TData, TValue> {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
}

const DataTable = <TData, TValue>({
  data,
  columns,
}: DataTableProps<TData, TValue>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibilty] = useState<VisibilityState>({});
  // const [pagination, setPagination] = useState({
  //   pageIndex: 0,
  //   pageSize: 5,
  // });
  React.useState<VisibilityState>({});
  const paginationArray = [5, 10, 20, 30, 40];

  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    // onPaginationChange: setPagination,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibilty,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      // pagination,
    },
  });

  // console.log(table.getPageCount());

  return (
    <div className="w-full p-2">
      <div className="w-full flex items-center py-4">
        <Input
          placeholder="Search by name"
          className="max-w-sm placeholder:capitalize"
          value={table.getColumn("name")?.getFilterValue() as string}
          onChange={(event) => {
            table.getColumn("name")?.setFilterValue(event.target.value);
          }}
        />
        <Button
          className="ml-2 mr-auto py-2 px-3 bg-gray-100"
          variant={"secondary"}
          onClick={() => {
            table.resetColumnVisibility();
            table.resetRowSelection();
            table.resetColumnFilters();
            table.resetPagination();
          }}>
          <MdRefresh />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="ml-auto  flex flex-row space-x-1 text-bold">
              <BiSolidFileExport className="mr-1" /> Export
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent></DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"outline"} className="mr-2">
              <RxMixerHorizontal className="mr-1" /> View
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                // console.log(column.getCanHide());
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => {
                      // console.log(value);
                      column.toggleVisibility(!!value);
                    }}>
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div>
        <Table className="rounded-xm border-2 border-gray-200">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className="bg-blue-50">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length < 1 ? (
              <TableRow>
                <TableCell>No Result</TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => {
                return (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-row justify-between items-center py-2">
        <div className="text-sm text-gray-700">
          {table.getFilteredSelectedRowModel().rows.length.toString()} of{" "}
          {table.getFilteredRowModel().rows.length.toString()} row(s) selected.
        </div>
        <div className="flex flex-row gap-5 items-center">
          <div>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(val) => table.setPageSize(Number(val))}>
              <SelectTrigger>
                <SelectValue
                  placeholder={`${table.getState().pagination.pageSize}`}
                />
              </SelectTrigger>
              <SelectContent>
                {paginationArray.map((item, index) => (
                  <SelectItem value={`${item}`} key={index}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="text-sm text-gray-700 ">
            Page {table.getState().pagination.pageIndex} of{" "}
            {table.getPageCount()}
          </div>
          <div>
            <Button
              variant={"outline"}
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}>
              <MdKeyboardDoubleArrowLeft className="h-4 w-4" />
            </Button>
            <Button
              variant={"outline"}
              onClick={table.previousPage}
              disabled={!table.getCanPreviousPage()}>
              <FaAngleLeft className="h-4 w-4" />
            </Button>
            <Button
              variant={"outline"}
              onClick={table.nextPage}
              disabled={!table.getCanNextPage()}>
              <FaAngleRight className="h-4 w-4" />
            </Button>
            <Button
              variant={"outline"}
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}>
              <MdKeyboardDoubleArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
