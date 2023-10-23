import { useEffect, useMemo, useState } from "react";

import { Autocomplete } from "./components/Autocomplete";
import { API_URL } from "./constants/api";
import { debounce } from "./utils";

import styles from "./App.module.css";

function containsInputValue(inputString: string, baseString: string) {
  const lowercasedInput = inputString.toLowerCase();
  const lowercasedBase = baseString.toLowerCase();

  return lowercasedBase.includes(lowercasedInput);
}

type Product = {
  id: number;
  title: string;
};

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [products, setProducts] = useState([]);

  const fetchData = async (query: string) => {
    const response = await fetch(API_URL + query);
    const data = await response.json();

    // because dummy json api works not perfectly we should filter data by query
    const filteredData = data?.products.filter((product: Product) =>
      containsInputValue(query, product.title)
    );

    setProducts(filteredData);
  };

  const debouncedFetchData = useMemo(() => {
    return debounce(fetchData, 200);
  }, []);

  const handleChange = (value: string) => {
    setSearchValue(value);
  };

  const handleSelect = () => {
    setProducts([]);
  };

  const productsToOptions = () => {
    return products.map(({ title }) => title);
  };

  useEffect(() => {
    if (searchValue !== "") {
      debouncedFetchData(searchValue);
    }
  }, [searchValue, debouncedFetchData]);

  return (
    <div className={styles.container}>
      <Autocomplete
        name="autocomplete"
        onChange={handleChange}
        onSelect={handleSelect}
        options={productsToOptions()}
      />
    </div>
  );
}

export default App;
