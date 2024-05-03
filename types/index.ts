export interface UserData {
  name: string;
  username: string;
  email: string;
  password: string;
  mobile: string;
  role_name: string;
  status: "Active" | "Inactive";
  token: string;
}
