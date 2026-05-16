import "../styles/Cell.css";
import { memo } from "react";

const Cell = memo(({ value, onToggle }) => {
  return (
    <div className="cell" onClick={onToggle}>
      {value}
    </div>
  );
});

export default Cell;
