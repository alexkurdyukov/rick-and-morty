import styles from "./FiltersPanel.module.scss";
import cn from "classnames";
import {
    STATUS_OPTIONS,
    GENDER_OPTIONS,
    SPECIES_OPTIONS,
} from "../../Constants";

import { Button } from "../../UI/Button/Button";
import { Dropdown } from "../../UI/Dropdown/Dropdown";
import { Input } from "../../UI/Input/Input";
import { findLabel } from "../../helpers/findLabel";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import {
    changeGender,
    changeName,
    changeSpecies,
    changeStatus,
    fetchPersons,
    resetData,
    resetFilters,
} from "../../store/reducers/PersonsReducer";
import { useNavigate } from "react-router-dom";
import { PATH_DASHBOARD } from "../../router/RouterConfig";
import { formPersonsUrl } from "../../helpers/formUrl";

interface FiltersPanelProps {
    className?: string;
}

export const FiltersPanel = ({ className }: FiltersPanelProps) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { name, status, species, gender, currentPage } = useAppSelector(
        (state) => state.personsReducer
    );
    const filterPersons = () => {
        const url = formPersonsUrl(species, status, name, gender, currentPage);
        dispatch(resetData());
        dispatch(fetchPersons(url));
        navigate(PATH_DASHBOARD.cards);
    };
    const reset = () => {
        dispatch(resetFilters());
        const url = formPersonsUrl("", "", "", "", 1);
        dispatch(resetData());
        dispatch(fetchPersons(url));
    };
    return (
        <div className={cn(styles.panel, className)}>
            <NameInput />
            <StatusFilter />
            <SpeciesFilter />
            <GenderFilter />
            <Button onClick={filterPersons} text={"Поиск"} />
            <Button onClick={reset} text={"Очистить фильтры"} />
        </div>
    );
};

const NameInput = () => {
    const dispatch = useAppDispatch();
    const changeCurrentValue = (value: string) => {
        dispatch(changeName(value));
    };
    const name = useAppSelector((state) => state.personsReducer.name);
    return (
        <Input
            className={styles.nameinput}
            onChange={changeCurrentValue}
            placeholder={"Поиск по имени"}
            value={name}
        />
    );
};

const StatusFilter = () => {
    const statusValue = useAppSelector((state) => state.personsReducer.status);
    const dispatch = useAppDispatch();
    const changeCurrentStatus = (value: string) => {
        dispatch(changeStatus(value));
    };
    return (
        <Dropdown
            changeOption={changeCurrentStatus}
            placeholder="Выберите статус"
            options={STATUS_OPTIONS}
            option={findLabel(statusValue, STATUS_OPTIONS)}
        />
    );
};

const SpeciesFilter = () => {
    const dispatch = useAppDispatch();
    const speciesValue = useAppSelector(
        (state) => state.personsReducer.species
    );
    const changeCurrentSpecies = (value: string) => {
        dispatch(changeSpecies(value));
    };
    return (
        <Dropdown
            changeOption={changeCurrentSpecies}
            option={findLabel(speciesValue, SPECIES_OPTIONS)}
            options={SPECIES_OPTIONS}
            placeholder="Выберите вид"
        />
    );
};

const GenderFilter = () => {
    const dispatch = useAppDispatch();
    const genderValue = useAppSelector((state) => state.personsReducer.gender);
    const changeCurrentGender = (value: string) => {
        dispatch(changeGender(value));
    };
    return (
        <Dropdown
            changeOption={changeCurrentGender}
            option={findLabel(genderValue, GENDER_OPTIONS)}
            options={GENDER_OPTIONS}
            placeholder="Выберите пол"
        />
    );
};
