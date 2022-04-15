import { makeAutoObservable } from "mobx";
import { makePersistable } from 'mobx-persist-store';

export class AppState {
  constructor() {
    makeAutoObservable(this)
    makePersistable<AppState, keyof AppState>(this, {
      name: "AppState",
      properties: [
      ],
      storage: window.localStorage,
    })
  }
}
