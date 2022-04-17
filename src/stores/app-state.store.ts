import { makeAutoObservable } from "mobx";
import { makePersistable } from 'mobx-persist-store';

export class AppState {
  theme: "light" | "dark" = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light"

  constructor() {
    makeAutoObservable(this)
    makePersistable<AppState, keyof AppState>(this, {
      name: "AppState",
      properties: [
        "theme"
      ],
      storage: window.localStorage,
    })
  }

  setTheme(theme: AppState["theme"]) {
    this.theme = theme
  }
}
