import { Cards } from "../pages/Cards/Cards";
import { Main } from "../pages/Main/Main";

export const PATH_DASHBOARD = {
    root: "/",
    cards: "/cards",
};

export const RouterConfig = [
    {
        path: PATH_DASHBOARD.root,
        element: <Main />,
    },
    {
        path: PATH_DASHBOARD.cards,
        element: <Cards />,
    },
];

export default RouterConfig;
