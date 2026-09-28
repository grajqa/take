import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id: string;
    role: "talent" | "client" | "admin";
  }

  interface Session {
    user: {
      id: string;
      role: "talent" | "client" | "admin";
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

interface JWT {
  id?: string;
  role?: "talent" | "client" | "admin";

}