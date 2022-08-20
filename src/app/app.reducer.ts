import { tShirtReducer, TshirtState } from "src/app/reducer/t-store.reducer";

export interface AppState {
    tshirt: TshirtState
}

export const reducer = {
  tshirt: tShirtReducer
}