import { ColumnDef } from "@tanstack/react-table";
import { UserSchema } from "../../schema";
import { tData } from "@/types";
import TableActionButtonComponent from "../common/tableactionbuttoncomponents";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { useStore } from "@/state";

export const CellFunction = ({ row }: any) => {
  const queryClient = useQueryClient();
  const user = row.original;
  const setUser = useStore((state: any) => state.setUser);
  const updateUser = () => {
    // console.log("hi");
    setUser({ ...user });
  };
  const deleteItem = useMutation({
    mutationFn: async (value: any) => {
      const res = await axios.delete(`/api/register/${value}`);
      return res;
    },
    onSuccess: (value) => {
      toast.success("User deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (value) => {
      toast.error("Something went wrong");
    },
  });
  return (
    <TableActionButtonComponent
      values={user}
      updateFunction={() => updateUser()}
      primarylabel=""
      Icon={BsThreeDotsVertical}
      deleteFunction={() => {
        console.log("in delete func");
        deleteItem.mutate(user.id);
      }}
    />
  );
};

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
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      return <CellFunction row={row} />;
    },
  },
];
