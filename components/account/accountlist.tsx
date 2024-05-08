"use client";
import { AccountTableData } from "@/config/accountjson";
import { tData } from "@/types";
import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { headers } from "next/headers";
import DataTable from "../common/datatable";
import { columns } from "./column";
import { userController } from "@/config/const";
import { useQuery } from "@tanstack/react-query";
import { MdFreeBreakfast } from "react-icons/md";

const columnHelper = createColumnHelper<tData>();

// const data: tData[] = AccountTableData;

// const columns = [
//   columnHelper.accessor("name", {
//     id: "name",
//     cell: (info) => info.getValue(),
//     header: "Name",
//   }),
//   columnHelper.accessor("email", {
//     id: "email",
//     cell: (info) => info.getValue(),
//     header: "Email",
//   }),
//   columnHelper.accessor("mobile", {
//     id: "mobile",
//     cell: (info) => info.getValue(),
//     header: "Mobile",
//   }),
//   columnHelper.accessor("role_name", {
//     id: "role",
//     header: "Role",
//   }),
//   columnHelper.accessor("status", {
//     id: "status",
//     header: "Status",
//   }),
// ];

const AccountList = () => {
  // const table = useReactTable({
  //   data,
  //   columns,
  //   getCoreRowModel: getCoreRowModel(),
  // });

  const fetchUsers = () => {
    return AccountTableData;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      return fetchUsers();
    },
  });
  const breaks: tData[] | undefined = data;
  // console.log(breaks);

  if (isLoading && breaks === undefined) {
    return <div>Loading</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }
  return (
    // <table className="">
    //   <thead>
    //     {table.getHeaderGroups().map((headergroup) => {
    //       return (
    //         <tr key={headergroup.id}>
    //           {headergroup.headers.map((header) => {
    //             return (
    //               <th className="border border-2 border-black p-2">
    //                 {header.isPlaceholder
    //                   ? "null"
    //                   : flexRender(
    //                       header.column.columnDef.header,
    //                       header.getContext()
    //                     )}
    //               </th>
    //             );
    //           })}
    //         </tr>
    //       );
    //     })}
    //   </thead>
    //   <tbody>
    //     {table.getRowModel().rows.map((row) => {
    //       return (
    //         <tr key={row.id}>
    //           {row.getVisibleCells().map((cell) => {
    //             return (
    //               <td className="border border-2 border-black p-2">
    //                 {flexRender(cell.column.columnDef.cell, cell.getContext())}
    //               </td>
    //             );
    //           })}
    //         </tr>
    //       );
    //     })}
    //   </tbody>
    // </table>

    <div className="bg-white">
      {isLoading ? (
        <div className="flex w-full h-full justify-center items-center">
          Loading
        </div>
      ) : (
        <DataTable
          data={breaks!}
          columns={columns}
          fileName="Users"
          exportDataFields={userController}
        />
      )}
    </div>
  );
};

export default AccountList;
