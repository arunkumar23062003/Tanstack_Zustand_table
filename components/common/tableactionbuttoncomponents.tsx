import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CiViewList } from "react-icons/ci";
import AlertDialogComponent from "./alertdialogcomponent";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

interface TableActionButtonComponentProps {
  primarylabel: string;
  Icon: React.ElementType;
  values?: any;
  deleteFunction: Function;
  updateFunction: Function;
}

const TableActionButtonComponent = ({
  updateFunction,
  primarylabel,
  Icon,
  values,
  deleteFunction,
}: TableActionButtonComponentProps) => {
  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant={"ghost"}>
            {primarylabel}
            <Icon />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-[150px]">
          <div>
            <AlertDialogComponent
              alertLabel={"View"}
              Icon={CiViewList}
              alertTitle={"View the details..."}
              alertDescription={"Details shows here"}>
              <div className="grid grid-cols-3 gap-2">
                {Object.keys(values).map((info, index) => {
                  if (info === "id") {
                    return;
                  }
                  return (
                    <div key={index}>
                      <Label>{info}</Label>
                      <Input value={values[info]} disabled />
                    </div>
                  );
                })}
              </div>
            </AlertDialogComponent>
          </div>
          <div>
            <Button
              variant={"ghost"}
              className="text-sm"
              onClick={() => updateFunction()}>
              <MdEdit />
              Edit
            </Button>
          </div>
          <div>
            <AlertDialogComponent
              alertLabel={"Delete"}
              Icon={MdDelete}
              alertTitle={"Are you sure you want to delete"}
              alertDescription={"This changes are irreversible"}
              alertActionFunction={() => deleteFunction()}
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default TableActionButtonComponent;
