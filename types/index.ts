export interface UserData {
  name: string;
  username: string;
  email: string;
  password?: string;
  mobile: string;
  role_name: string;
  status: "Active" | "Inactive";
  token?: string;
}

export interface tData {
  name: string;
  email: string;
  mobile: string;
  role_name: string;
  status: string;
}

