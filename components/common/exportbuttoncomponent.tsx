import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { FaFileCsv, FaFilePdf } from "react-icons/fa";
import { BsFiletypeXlsx } from "react-icons/bs";
import { Button } from "../ui/button";
import { tData } from "../../types";
import { Checkbox } from "../ui/checkbox";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { Input } from "../ui/input";
import { DialogClose } from "@radix-ui/react-dialog";
interface ExportButtonComponentProps {
  label: string;
  exportFunction?: Function;
  exportFileName: string;
  nameChangeFunction?: Function;
  exportDataFields: string[];
  data: any[];
  // fullexport: boolean;
}

const ExportButtonComponent = ({
  label,
  exportFunction,
  exportFileName,
  nameChangeFunction,
  exportDataFields,
  data,
}: ExportButtonComponentProps) => {
  // console.log(data);
  var defaultFields: string[] | undefined = Object.keys(data[0]!);
  const [selectedFields, setSelectedFields] = useState(defaultFields);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"} className="space-y-2">
          {label === "CSV" && <FaFileCsv className="mr-1" />}
          {label === "PDF" && <FaFilePdf className="mr-1" />}
          {label === "XLSX" && <BsFiletypeXlsx className="mr-1" />} Export{" "}
          {label}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Export {label}</DialogTitle>
          <DialogDescription>
            You can export this file as {label}
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-2">
          {defaultFields.map((info, index) => {
            // console.log(info);
            return (
              <div
                key={index}
                className="flex flex-row items-center gap-2 border-2 p-2">
                <Checkbox
                  id={info}
                  checked={selectedFields?.includes(info)}
                  onCheckedChange={(value) => {
                    if (value) {
                      setSelectedFields((item) => [...item, info!]);
                    } else {
                      setSelectedFields((item) =>
                        item.filter((val) => val !== info)
                      );
                    }
                  }}
                />
                <Label>
                  {info.replaceAll("_", " ").charAt(0).toUpperCase() +
                    info.replaceAll("_", " ").slice(1)}
                </Label>
              </div>
            );
          })}
        </div>
        <Input
          value={exportFileName}
          onChange={(value) => nameChangeFunction!(value.target.value)}
        />
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button variant={"secondary"}>Close</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              type="button"
              variant="default"
              className="bg-theme"
              onClick={() => {
                exportFunction!(selectedFields);
              }}>
              <FaFileCsv className="mr-1" /> Export {label}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExportButtonComponent;
