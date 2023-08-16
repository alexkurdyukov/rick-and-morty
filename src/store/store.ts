import { combineReducers, configureStore } from "@reduxjs/toolkit";
import personsReducer from "./reducers/PersonsReducer";
import currentPersonReducer from "./reducers/CurrentPersonReducer";

const rootReducer = combineReducers({ personsReducer, currentPersonReducer });

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
