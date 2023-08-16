import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { RouterConfig } from "./RouterConfig";
import { Loader } from "../components/Loader/Loader";

export const AppRouter = () => {
    return (
        <Suspense fallback={<Loader />}>
            <Routes>
                {RouterConfig &&
                    RouterConfig.map(({ element, path }, id) => (
                        <Route element={element} path={path} key={id}></Route>
                    ))}
            </Routes>
        </Suspense>
    );
};
