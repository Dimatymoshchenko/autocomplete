import { useState } from "react";
import { List } from "../List";
import styles from "./Autocomplete.module.css";

type Props = {
  name: string;
  options: string[];
  onSelect?: () => void;
  onChange?: (search: string) => void;
  label?: string;
};

export const Autocomplete = ({
  name,
  label,
  onChange,
  options,
  onSelect,
}: Props) => {
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setValue(value);

    if (onChange) {
      onChange(value);
    }
  };

  const handleInputClick = () => {
    setIsOpen(true);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    event.stopPropagation();
    // use for prevent closing dropdown after click immediately
    setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  const handleClick = (item: string) => {
    setValue(item);
    setIsOpen(false);

    if (onSelect) {
      onSelect();
    }
  };

  return (
    <div className={styles.container}>
      {label && <label htmlFor={name}>{label}</label>}

      <input
        className={styles.input}
        id={name}
        type="text"
        name={name}
        value={value}
        onChange={handleChange}
        onClick={handleInputClick}
        onBlur={handleBlur}
      />
      {isOpen && (
        <div className={styles.dropdown}>
          <List data={options} highlight={value} onClick={handleClick} />
        </div>
      )}
    </div>
  );
};
