import { combineReducers, createStore, Store } from "redux";
import { countReducer } from "./reducers";

export type RootStoreType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
    count: countReducer,
})

export const store: Store<RootStoreType> = createStore(rootReducer)

//@ts-ignore
window.store = store;