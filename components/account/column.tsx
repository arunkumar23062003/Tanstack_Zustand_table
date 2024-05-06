import { ColumnDef } from "@tanstack/react-table";
import { UserSchema } from "../../schema";
import { tData } from "@/types";

export const columns: ColumnDef<tData>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "mobile",
    header: "Mobile",
  },
  {
    accessorKey: "role_name",
    header: "Role",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];
