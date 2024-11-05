import { InitStateType } from "../reducers";
import { RootStoreType } from "../store";

export const selectState = (state: RootStoreType): InitStateType  => {
    return state.count
}