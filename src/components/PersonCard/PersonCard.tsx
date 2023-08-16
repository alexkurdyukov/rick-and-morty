import styles from "./PersonCard.module.scss";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { changeSelectedPerson } from "../../store/reducers/CurrentPersonReducer";
import { Person } from "../../types";

interface PersonCardProps {
    person: Person;
}

const genderValues: Record<string, string> = {
    Male: "Мужской",
    Female: "Женский",
    unknown: "Неизвестно",
    Genderless: "Бесполый",
};

const statusValues: Record<string, string> = {
    Alive: "Живой",
    Dead: "Мертвый",
    unknown: "Неизвестно",
};

const speciesValues: Record<string, string> = {
    Humanoid: "Гуманойд",
    Alien: "Пришелец",
    "Mythological Creature": "Мифологическое создание",
    Human: "Человек",
    unknown: "Неизвестно",
    Robot: "Робот",
    Poopybutthole: "Жопосранчик",
    Disease: "Болезнь",
    Animal: "Животное",
    Cronenberg: "Крокенберг",
};

export const PersonCard = ({ person }: PersonCardProps) => {
    const dispatch = useAppDispatch();
    const changeSidebarPerson = (name: string) => {
        dispatch(changeSelectedPerson(name));
    };
    return (
        <div
            className={styles.card}
            onClick={() => {
                changeSidebarPerson(person.name);
            }}
        >
            <div className={styles.card__content}>
                <CardElement title={"Имя"} value={person?.name} />
                <CardElement
                    title={"Пол"}
                    value={genderValues[person?.gender]}
                />
                <CardElement
                    title={"Статус"}
                    value={statusValues[person?.status]}
                />
                <CardElement
                    title={"Вид"}
                    value={speciesValues[person?.species]}
                />
            </div>
            <img alt="person" src={person?.image} />
        </div>
    );
};

interface CardElementProps {
    title: string;
    value: string;
}

const CardElement = ({ title, value }: CardElementProps) => {
    return (
        <div className={styles.element}>
            <span className={styles.element__title}>{title}: </span>
            <span className={styles.element__value}>{value}</span>
        </div>
    );
};
