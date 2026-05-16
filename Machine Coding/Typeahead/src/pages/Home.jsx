import React, { useCallback, useRef, useState } from "react";
import "../styles/Home.css";
import SearchResult from "../components/SearchResult";
import useOutsideClick from "../hooks/useOutsideClick";

export default function Home() {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchError, setSearchError] = useState("");
  const [searchPointer, setSearchPointer] = useState(-1);
  const [storedValues, setStoredValues] = useState(new Map());
  const searchRef = useRef(null);

  useOutsideClick(searchRef, () => setSearchResults([]));

  const handleSearch = (text) => {
    setSearchInput(text);
    if (storedValues.has(text)) {
      const results = storedValues.get(text);
      setSearchResults(results);
    } else {
      console.log("calling");
      debouncedFn.current(text);
    }
  };

  const debounce = function (cb, timer) {
    let timeout = null;
    return function (...args) {
      let context = this;
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        cb.apply(this, args);
        clearTimeout(timeout);
      }, [timer]);
    };
  };

  const search = (query) => {
    mockFetch(query)
      .then((res) => {
        setSearchResults(res);
        setStoredValues((prev) => new Map(prev.set(query, res)));
      })
      .catch((err) => setSearchError(err));
  };

  const debouncedFn = useRef(debounce(search, 300));

  const mockFetch = (query) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const results = [
          "JavaScript",
          "Java",
          "Python",
          "React",
          "Redux",
          "TypeScript",
          "Rust",
          "Ruby",
        ].filter((item) => item.toLowerCase().includes(query.toLowerCase()));
        resolve(results);
      }, 500);
    });
  };

  const handleKeyDown = (e) => {
    if (!searchResults.length) return;

    if (e.key === "ArrowDown") {
      setSearchPointer((prev) =>
        prev < searchResults.length - 1 ? prev + 1 : prev,
      );
    }

    if (e.key === "ArrowUp") {
      setSearchPointer((prev) => (prev > 0 ? prev - 1 : 0));
    }

    if (e.key === "Enter" && searchPointer !== -1) {
      selectResult(searchResults[searchPointer]);
    }

    if (e.key === "Escape") {
      setSearchResults([]);
      setSearchPointer(-1);
    }
  };

  const selectResult = useCallback((item) => {
    setSearchInput(item);
    setSearchResults([]);
  }, []);

  const hoverResult = useCallback((index) => {
    setSearchPointer(index);
  }, []);

  return (
    <div>
      <input
        type="text"
        value={searchInput}
        onChange={(e) => handleSearch(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e)}
      />
      <div ref={searchRef}>
        {searchResults.map((item, index) => (
          <SearchResult
            key={index}
            selectResult={() => selectResult(item)}
            hoverResult={() => hoverResult(index)}
            isActive={searchPointer === index}
          >
            {item}
          </SearchResult>
        ))}
      </div>
    </div>
  );
}
