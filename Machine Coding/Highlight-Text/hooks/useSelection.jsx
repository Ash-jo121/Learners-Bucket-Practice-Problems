import { useState } from "react";
import { useEffect } from "react";

export const useSelection = (ref) => {
  const [selection, setSelection] = useState({
    text: "",
    coords: null,
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseUp = () => {
      const selected = window.getSelection();

      // Ensure selection is non-empty and inside our ref element
      if (
        !selected ||
        selected.isCollapsed ||
        !el.contains(selected.anchorNode)
      ) {
        setSelection({ text: "", coords: null });
        return;
      }

      const text = selected.toString().trim();
      if (!text) return;

      const range = selected.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      setSelection({
        text: text,
        coords: {
          x: rect.left,
          y: rect.top,
          width: rect.width,
          height: rect.height,
        },
      });
    };

    const handleMouseDown = () => {
      // Clear previous selection on new click
      setSelection({ text: "", coords: null });
    };

    el.addEventListener("mouseup", handleMouseUp);
    el.addEventListener("mousedown", handleMouseDown);

    return () => {
      el.removeEventListener("mouseup", handleMouseUp);
      el.removeEventListener("mousedown", handleMouseDown);
    };
  }, [ref]);

  return selection;
};
