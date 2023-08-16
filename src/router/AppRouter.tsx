import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { RouterConfig } from "./RouterConfig";

export const AppRouter = () => {
    return (
        <Suspense fallback={<div>Loading</div>}>
            <Routes>
                {RouterConfig &&
                    RouterConfig.map(({ element, path }, id) => (
                        <Route element={element} path={path} key={id}></Route>
                    ))}
            </Routes>
        </Suspense>
    );
};
