import { sleep } from "@remix/commons";

export type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "member";
};

export const mockUsers: User[] = [
  { id: "u-1", name: "Nguyễn An", email: "an@example.com", role: "admin" },
  { id: "u-2", name: "Trần Bình", email: "binh@example.com", role: "member" },
  { id: "u-3", name: "Lê Chi", email: "chi@example.com", role: "member" }
];

export async function getUsers(): Promise<User[]> {
  await sleep(300);
  return mockUsers;
}
