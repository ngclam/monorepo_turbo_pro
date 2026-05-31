import { sleep } from "@remix/commons";

export type LoginPayload = {
  email: string;
  password: string;
};

export async function mockLogin(payload: LoginPayload) {
  await sleep(300);

  return {
    token: "mock-token",
    user: {
      id: "u-1",
      name: "Admin Demo",
      email: payload.email
    }
  };
}
