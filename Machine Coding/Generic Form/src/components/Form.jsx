import { useEffect, useState } from "react";
import { useFormContext } from "../contexts/FormContext";

export default function Form({ onSubmit, children }) {
  return <form onSubmit={onSubmit}>{children}</form>;
}

Form.Input = ({
  name,
  label,
  required,
  value,
  onChange,
  type,
  defaultValue,
}) => {
  const { formStructure, registerField, updateField } = useFormContext();
  const isControlled = value !== undefined;
  const isRequired = required !== undefined;

  useEffect(() => {
    registerField({ name, value, type: "input" });
  }, []);

  const handleInputChange = (updatedValue) => {
    updateField({ name, updatedValue });
    onChange(updatedValue);
  };

  return (
    <>
      <label>{label}</label>
      <input
        name={name}
        value={value}
        type={type}
        {...(isControlled
          ? { value, onChange: (e) => handleInputChange(e.target.value) }
          : { defaultValue: { defaultValue } })}
        {...(required ? { required } : {})}
      />
    </>
  );
};

Form.Select = ({ name, label, options, value, defaultValue, onChange }) => {
  const { registerField, updateField } = useFormContext();
  const isControlled = value !== undefined;

  useEffect(() => {
    registerField({ name, value, type: "select" });
  }, []);

  const handleSelectChange = (updatedValue) => {
    updateField({ name, updatedValue });
    onChange(updatedValue);
  };

  return (
    <>
      <label>{label}</label>
      <select
        name={name}
        {...(isControlled
          ? { value, onChange: (e) => handleSelectChange(e.target.value) }
          : { defaultValue })}
      >
        {options.map((item) => (
          <option value={item.value} key={item.id}>
            {item.label}
          </option>
        ))}
      </select>
    </>
  );
};

Form.Checkbox = ({ name, label, value, defaultValue, onChange }) => {
  const { registerField, updateField } = useFormContext();
  const isControlled = value !== undefined;
  const [isChecked, setIsChecked] = useState(value ?? defaultValue);

  useEffect(() => {
    registerField({ name, value, type: "check-box" });
  }, []);

  const handleUncontrolledChange = () => {
    updateField({ name, value: !isChecked });
    onChange(!isChecked);
    setIsChecked(!isChecked);
  };

  const handleControlledChange = () => {
    updateField({ name, value: !value });
    onChange(!value);
  };

  return (
    <>
      <label>{label}</label>
      <input
        name={name}
        type="checkbox"
        {...(isControlled
          ? {
              checked: value,
              onChange: handleControlledChange,
            }
          : {
              checked: isChecked,
              onChange: handleUncontrolledChange,
            })}
      />
    </>
  );
};

Form.TextArea = ({ name, value, defaultValue, label, onChange }) => {
  const { updateField, registerField } = useFormContext();
  const isControlled = value !== undefined;

  useEffect(() => {
    registerField({ name, value, type: "text-area" });
  }, []);

  const handleTextChange = (text) => {
    updateField({ name, text });
    onChange(text);
  };

  return (
    <>
      <label>{label}</label>
      <textarea
        name={name}
        {...(isControlled
          ? { value, onChange: (e) => handleTextChange(e.target.value) }
          : { defaultValue })}
      />
    </>
  );
};
