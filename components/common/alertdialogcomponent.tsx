import type { IconType } from "react-icons";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import {
  AlertDialogAction,
  AlertDialogCancel,
} from "@radix-ui/react-alert-dialog";

interface AlertDialogComponentProps {
  alertLabel: string;
  Icon?: React.ElementType;
  alertTitle: string;
  alertDescription: string;
  children?: React.ReactNode;
  alertActionFunction?: Function;
}

const AlertDialogComponent = ({
  alertLabel,
  Icon,
  alertTitle,
  alertDescription,
  children,
  alertActionFunction,
}: AlertDialogComponentProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant={"ghost"}>
          {Icon && <Icon />}
          {alertLabel}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{alertTitle}</AlertDialogTitle>
          <AlertDialogDescription>{alertDescription}</AlertDialogDescription>
          {children && (
            <AlertDialogDescription>{children}</AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div className="bg-blue-100 py-2 px-4 rounded-sm">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          </div>
          {alertActionFunction && (
            <div
              className="bg-blue-100 py-2 px-4 rounded-sm"
              onClick={() => alertActionFunction()}>
              <AlertDialogAction>Continue</AlertDialogAction>
            </div>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDialogComponent;
