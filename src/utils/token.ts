// import { jwtDecode } from "jwt-decode";

// import { jwtVerify } from "jose";
// import { cookies } from "next/headers";

// const JWT_SECRET = new TextEncoder().encode(
//   process.env.NEXT_PUBLIC_JWT_SECRET!,
// );

// interface JwtPayload {
//   role?: string;
//   [key: string]: unknown;
// }

// export function getUserRoleFromToken(): string | null {
//   if (typeof window === "undefined") return null;

//   const token = document.cookie
//     .split("; ")
//     .find((row) => row.startsWith("auth_token="))
//     ?.split("=")[1];

//   if (!token) return null;

//   try {
//     const decoded: JwtPayload = jwtDecode(token);
//     return decoded?.role ?? null;
//   } catch {
//     return null;
//   }
// }

// export async function getServerUserIdFromCookie(): Promise<string | null> {
//   const token = cookies().get("auth_token")?.value;

//   if (!token) return null;

//   try {
//     const { payload } = await jwtVerify(token, JWT_SECRET);
//     return (payload.sub as string) ?? null;
//   } catch {
//     return null;
//   }
// }
