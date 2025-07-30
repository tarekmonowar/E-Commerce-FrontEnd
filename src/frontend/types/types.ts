export type User = {
  name: string;
  email: string;
  picture?: string | null;
  phone?: string | null;
  address?: string | null;
  isVerified: boolean | null;
  role: "USER" | "ADMIN" | "SUPER_ADMIN";
};
