import { FiltersPanel } from "../../components/FiltersPanel/FiltersPanel";
import styles from "./Main.module.scss";

export const Main = () => {
    return (
        <div className={styles.main}>
            <div className={styles.main__wrapper}>
                <FiltersPanel />
            </div>
        </div>
    );
};
