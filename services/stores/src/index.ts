import type { AppId } from "@remix/commons";
import { appRegistry, createToken } from "@remix/commons";
import { makePersistable } from "mobx-persist-store";

export const tokenFor = (appId: AppId): string => createToken(appId);

export const persistAppStore = <TStore extends object>(
  appId: AppId,
  store: TStore,
  properties: Array<keyof TStore & string>,
): Promise<unknown> =>
  makePersistable(store, {
    name: appRegistry[appId].authStorageKey,
    properties,
    storage: window.localStorage,
  });
