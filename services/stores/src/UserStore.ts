import { makeAutoObservable, runInAction } from "mobx";
import { getUsers, type User } from "@remix/modules";

export class UserStore {
  users: User[] = [];
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchUsers() {
    this.loading = true;

    try {
      // Demo dùng mock module. Dự án thật có thể đổi sang gọi API thật.
      const users = await getUsers();

      runInAction(() => {
        this.users = users;
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }
}

export const userStore = new UserStore();
