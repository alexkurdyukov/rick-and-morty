import { ChangeEvent } from "react";
import styles from "./Input.module.scss";
import cn from "classnames";

interface InputProps {
    icon?: React.ReactNode;
    className?: string;
    onChange: (value: string) => void;
    placeholder: string;
    value: string;
}

export const Input = ({
    className,
    icon,
    onChange,
    placeholder,
    value,
}: InputProps) => {
    return (
        <div className={cn(styles.Input, className)}>
            <div className={styles.Input__icon}>{icon}</div>
            <input
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    onChange(e.target.value)
                }
                placeholder={placeholder}
                className={styles.Input__container}
                value={value}
            />
        </div>
    );
};
