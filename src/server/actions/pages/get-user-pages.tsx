import { api } from "@/lib/api";
import type { Page } from "@/lib/types";
import { cookies } from "next/headers";

export async function getUserPages() {
  const cookieStore = cookies()
  const token = (await cookieStore).get('session-token')?.value

  api.defaults.headers.Authorization = `Bearer ${token}`
  const response = await api.get('/me/pages')
  return response.data as Page[]
}