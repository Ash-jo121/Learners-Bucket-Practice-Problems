import { memo } from "react";
import "../styles/Home.css";

const SearchResult = memo(
  ({ children, selectResult, hoverResult, isActive }) => {
    return (
      <div
        className={`result ${isActive ? "active" : ""}`}
        onClick={selectResult}
        onMouseOver={hoverResult}
      >
        {children}
      </div>
    );
  },
);

export default SearchResult;
