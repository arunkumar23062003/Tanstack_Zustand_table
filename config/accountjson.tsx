import { MdAccountCircle, MdDashboard } from "react-icons/md";

export const AccountJSON = [
  {
    pathValue: "/",
    name: "Dashboard",
    icon: <MdDashboard />,
  },
  {
    pathValue: "/account",
    name: "Account",
    icon: <MdAccountCircle />,
  },
];

export const AccountFormJSON = [
  {
    label: "Name",
    name: "name",
    placeholder: "Name",
  },
  {
    label: "Email",
    name: "email",
    placeholder: "Email",
  },
  {
    label: "UserName",
    name: "username",
    placeholder: "UserName",
  },
  {
    label: "Password",
    name: "password",
    placeholder: "Password",
  },
  {
    label: "Mobile",
    name: "mobile",
    placeholder: "Mobile",
  },
];

export const AccountFormSelectJSON = [
  {
    name: "role_name",
    label: "Role",
    placeholder: "Role",
    content: [
      {
        name: "Admin",
        value: "admin",
      },
      {
        name: "Super Admin",
        value: "Admin",
      },
      {
        name: "user",
        value: "User",
      },
    ],
  },
  {
    name: "status",
    label: "Status",
    placeholder: "Status",
    content: [
      {
        name: "Active",
        value: "active",
      },
      {
        name: "InActive",
        value: "inactive",
      },
    ],
  },
];
