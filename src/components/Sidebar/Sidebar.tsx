import styles from "./Sidebar.module.scss";
import cn from "classnames";

import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { Person } from "../../types";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { fetchEpisodeInfo, fetchLastLocationInfo } from "../../store/reducers/CurrentPersonReducer";
import axios from "axios";

interface SidebarProps {
    className: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
    const dispatch = useAppDispatch();
    const { persons } = useAppSelector((state) => state.personsReducer);

    const { currentPerson, epidoseNumber, episodeDate, eposodeName, dimension } =
        useAppSelector((state) => state.currentPersonReducer);

    const [personInfo, setPersonInfo] = useState<Person>();
    // const [dimension, setDimension] = useState("");

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
        // axios
        //     .get(locationUrl)
        //     .then((resp) => setDimension(resp.data.dimension));
        dispatch(fetchLastLocationInfo(locationUrl));
    }, [currentPerson, persons]);

    return (
        <aside className={cn(styles.sidebar, className)}>
            <div className={styles.sidebar__wrapper}>
                <span>Имя: {currentPerson}</span>
                <span>Номер последнего эпизода: {epidoseNumber}</span>
                <span>Наименование эпизода: {eposodeName}</span>
                <span>Дата выхода: {episodeDate}</span>
                <span>Локация: {personInfo?.location?.name}</span>
                <span>Измерение: {dimension}</span>
            </div>
        </aside>
    );
};
