import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { FaFileCsv, FaFilePdf } from "react-icons/fa";
import { BsFiletypeXlsx } from "react-icons/bs";
interface ExportButtonComponentProps {
  label: string;
  exportFunction?: Function;
  exportFileName: string;
  nameChangeFunction?: Function;
  exportDataFields: string[];
  data: any[];
  fullexport: boolean;
}

const ExportButtonComponent = ({
  label,
  exportFunction,
  exportFileName,
  nameChangeFunction,
  exportDataFields,
  data,
  fullexport = false,
}: ExportButtonComponentProps) => {
  <Dialog>
    <DialogTrigger asChild>
      {label === "CSV" && <FaFileCsv className="mr-1" />}
      {label === "PDF" && <FaFilePdf className="mr-1" />}
      {label === "XLSX" && <BsFiletypeXlsx className="mr-1" />} Export {label}
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Export {label}</DialogTitle>
        <DialogDescription>
          You can export this file as {label}
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>;
};

export default ExportButtonComponent;
