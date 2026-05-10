import { createContext, useCallback, useContext, useState } from "react";

const FormContext = createContext(null);

export const FormContextProvider = ({ children }) => {
  const [formStructure, setFormStructure] = useState({});

  const registerField = useCallback(({ name, value, type }) => {
    setFormStructure((prev) => ({
      ...prev,
      [name]: {
        fieldName: name,
        fieldType: type,
        fieldValue: value,
      },
    }));
  }, []);

  const updateField = useCallback(({ name, updatedValue }) => {
    setFormStructure((prev) => ({
      ...prev,
      [name]: { ...prev[name], fieldValue: updatedValue },
    }));
  }, []);

  const value = useMemo(() => {
    return { formStructure, registerField, updateField };
  }, [formStructure, registerField, updateField]);

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (context === null) {
    throw new Error("useFormContext must be used within a FormContextProvider");
  }
  return context;
};
