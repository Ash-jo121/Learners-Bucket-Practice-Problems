import React, { useEffect } from "react";

export default function useOutsideClick(componentRef, onOutsideClick) {
  useEffect(() => {
    if (!componentRef) {
      return;
    }

    const checkFn = (event) => {
      if (!componentRef.current.contains(event.target)) {
        onOutsideClick();
      }
    };

    document.addEventListener("click", checkFn);

    return () => document.removeEventListener("click", checkFn);
  }, []);
}
