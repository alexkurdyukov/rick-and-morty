import styles from "./CardsList.module.scss";
import cn from "classnames";

import { PersonCard } from "../PersonCard/PersonCard";

import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { Person } from "../../types";

interface CardsListProps {
    className?: string;
}

export const CardsList = ({ className }: CardsListProps) => {
    const { persons } = useAppSelector((state) => state.personsReducer);
    return (
        <div className={cn(styles.list, className)}>
            {persons.length > 0
                ? persons.map((person: Person, index: number) => (
                      <PersonCard
                          person={person}
                          key={`${person.name}${index}`}
                      />
                  ))
                : "Персонажи не найдены"}
        </div>
    );
};
