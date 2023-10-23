import styles from "./List.module.css";

type Props = {
  data: string[];
  highlight?: string;
  onClick?: (item: string) => void;
};

const splitAndHighlight = (text: string, highlight: string) => {
  // Splitting the text into parts based on the 'highlight' string
  const parts = text.split(new RegExp(`(${highlight})`, "gi"));

  // Mapping through the parts to wrap matched 'highlight' strings in a span with specific styles
  return parts.map((part, index) =>
    part.toLowerCase() === highlight.toLowerCase() ? (
      <span key={index} className={styles.highlight}>
        {part}
      </span>
    ) : (
      part
    )
  );
};

export const List = ({ data, highlight, onClick }: Props) => {
  const clickHandler = (item: string) => {
    if (onClick) {
      onClick(item);
    }
  };

  return (
    <ul className={styles.list}>
      {data.map((item) => (
        <li
          className={styles.item}
          key={item}
          onClick={() => clickHandler(item)}
        >
          {highlight ? splitAndHighlight(item, highlight) : item}
        </li>
      ))}
    </ul>
  );
};
