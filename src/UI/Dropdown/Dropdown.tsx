import styles from "./Dropdown.module.scss";
import cn from "classnames";

import { useRef, useState } from "react";

import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DropdownOption } from "../../types";
import { useClickOutside } from "../../hooks/useClickOutside";

const DEFAULT_DROPDOWN_TEXT = "Выберите значение";

interface DropdownProps {
    icon?: React.ReactNode;
    options: DropdownOption[];
    placeholder?: string;
    className?: string;
    changeOption: (value: string) => void; // функция позволяющая связать дропдаун и стор
    option: string;
}

export const Dropdown = ({
    icon,
    options,
    placeholder,
    changeOption,
    option,
    className,
}: DropdownProps) => {
    const [isActive, setIsActive] = useState<boolean>(false);
    const toggleActivity = () => {
        setIsActive(!isActive);
    };

    const ref = useRef(null);
    const handleClickOutside = () => {
        setIsActive(false);
    };

    useClickOutside(ref, handleClickOutside);

    return (
        <div
            ref={ref}
            className={cn(styles.dropdown, className)}
            onClick={toggleActivity}
        >
            <div className={styles.dropdown__icon_outside}>{icon}</div>
            <div
                className={cn(styles.dropdown__btn, {
                    [styles.dropdown__btn_active]: isActive,
                })}
            >
                {option
                    ? option
                    : placeholder
                    ? placeholder
                    : DEFAULT_DROPDOWN_TEXT}
            </div>
            <FontAwesomeIcon
                className={cn(styles.dropdown__icon, {
                    [styles.dropdown__icon_active]: isActive,
                })}
                icon={faCaretDown}
            />
            {isActive && (
                <ul className={styles.dropdown__content}>
                    {options &&
                        options.map((option: DropdownOption, index: number) => (
                            <li
                                key={index}
                                onClick={() => {
                                    changeOption(option.value);
                                }}
                                className={cn(styles.dropdown__item)}
                            >
                                {option.label}
                            </li>
                        ))}
                </ul>
            )}
        </div>
    );
};
