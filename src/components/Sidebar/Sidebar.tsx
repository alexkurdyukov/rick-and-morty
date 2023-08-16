import styles from "./Sidebar.module.scss";
import cn from "classnames";

import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { Person } from "../../types";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import {
    fetchEpisodeInfo,
    fetchLastLocationInfo,
} from "../../store/reducers/CurrentPersonReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

interface SidebarProps {
    className: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
    const dispatch = useAppDispatch();
    const { persons } = useAppSelector((state) => state.personsReducer);

    const {
        currentPerson,
        epidoseNumber,
        episodeDate,
        eposodeName,
        dimension,
    } = useAppSelector((state) => state.currentPersonReducer);

    const [personInfo, setPersonInfo] = useState<Person>();

    useEffect(() => {
        const person = persons.find((person) => person.name === currentPerson);
        setPersonInfo(person);

        const episodeUrl = person?.episode.at(-1);
        if (!episodeUrl) {
            return;
        }
        dispatch(fetchEpisodeInfo(episodeUrl));

        const locationUrl = person?.location.url;
        if (!locationUrl) {
            return;
        }
        dispatch(fetchLastLocationInfo(locationUrl));
    }, [currentPerson, persons]);

    return (
        <aside className={cn(styles.sidebar, className)}>
            <div className={styles.sidebar__wrapper}>
                <h4 className={styles.sidebar__header}>{currentPerson}</h4>
                <div className={styles.sidebar__content}>
                    <SidebarElement
                        title={"Номер последнего эпизода: "}
                        value={epidoseNumber}
                    />
                    <SidebarElement
                        title={"Наименование эпизода: "}
                        value={eposodeName}
                    />
                    <SidebarElement
                        title={"Дата выхода: "}
                        value={episodeDate}
                    />
                    <SidebarElement
                        title={"Локация: "}
                        value={
                            personInfo?.location?.name
                                ? personInfo?.location?.name
                                : "unknown"
                        }
                    />
                    <SidebarElement
                        title={"Измерение: "}
                        value={dimension ? dimension : "unknown"}
                    />
                </div>

                <div className={styles.sidebar__icon}>
                    <FontAwesomeIcon
                        icon={faXmark}
                        className={styles.sidebar__button}
                    />
                </div>
            </div>
        </aside>
    );
};

interface SidebarElementProps {
    title: string;
    value: string;
}

const SidebarElement = ({ title, value }: SidebarElementProps) => {
    return (
        <div className={styles.sidebar__element}>
            <span>{title}</span>
            <span>{value}</span>
        </div>
    );
};
