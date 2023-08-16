/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./Cards.module.scss";

import { useAppSelector } from "../../hooks/useAppSelector";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";

import { FiltersPanel } from "../../components/FiltersPanel/FiltersPanel";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { CardsList } from "../../components/CardsList/CardsList";
import {
    fetchFirstData,
    fetchPersons,
} from "../../store/reducers/PersonsReducer";
import { formPersonsUrl } from "../../helpers/formUrl";
import { useInView } from "react-intersection-observer";

export const Cards = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const { species, status, name, gender, totalPages } = useAppSelector(
        (state) => state.personsReducer
    );
    const { currentPerson } = useAppSelector(
        (state) => state.currentPersonReducer
    );
    const dispatch = useAppDispatch();

    useEffect(() => {
        const url = formPersonsUrl(species, status, name, gender, currentPage);
        dispatch(fetchFirstData(url));
    }, []);

    const { ref, inView } = useInView({
        threshold: 1,
    });

    useEffect(() => {
        if (inView) {
            setCurrentPage(currentPage + 1);
        }
    }, [inView]);

    useEffect(() => {
        if (currentPage > 1 && currentPage <= totalPages) {
            const url = formPersonsUrl(
                species,
                status,
                name,
                gender,
                currentPage
            );
            dispatch(fetchPersons(url));
        }
    }, [currentPage]);

    return (
        <div className={styles.cards}>
            <div className={styles.cards__wrapper}>
                <FiltersPanel className={styles.panel} />
                <CardsList
                    className={styles.list}
                    currentPerson={currentPerson}
                />
                <div ref={ref}></div>
            </div>
            {currentPerson && <Sidebar className={styles.sidebar} />}
        </div>
    );
};
