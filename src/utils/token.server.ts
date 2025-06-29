import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.NEXT_PUBLIC_JWT_SECRET!,
);

export async function getServerUserIdFromCookie(): Promise<string | null> {
  const token = cookies().get("auth_token")?.value;

  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return (payload.sub as string) ?? null;
  } catch {
    return null;
  }
}

