import styles from "./Button.module.scss";
import cn from "classnames";

export const Button = ({ className, onClick, text }: ButtonProps) => {
    return (
        <button onClick={onClick} className={cn(styles.Button, className)}>
            <p className={styles.Button__text}>{text}</p>
        </button>
    );
};

interface ButtonProps {
    className?: string;
    onClick: () => void;
    text: string;
    icon?: React.ReactNode;
}
