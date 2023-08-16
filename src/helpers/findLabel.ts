import { DropdownOption } from "../types";

// функция ищет в массиве значение и если такой есть,вернет его лэйбл
export const findLabel = (value: string, arrayOfValues: DropdownOption[]) => {
    const currentObject = arrayOfValues.find(
        (status) => status.value === value
    );
    if (!currentObject) {
        return "";
    }
    return currentObject.label;
};
