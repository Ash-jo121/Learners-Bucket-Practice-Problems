import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

Form.RadioGroup = ({ name, label, options, value, defaultValue }) => {
  const { registerField, updateField } = useFormContext();
  const isControlled = value !== undefined;

  useEffect(() => {
    registerField({ name, value, type: "radio-group" });
  }, []);

  const handleSelectChange = (updatedValue) => {
    updateField({ name, updatedValue });
  };

  return (
    <>
      <label>{label}</label>
      <select
        name={name}
        {...(isControlled
          ? { value, onChange: (e) => handleSelectChange(e.target.value) }
          : { defaultValue: { defaultValue } })}
      >
        {options.map((item) => (
          <option value={item.value}>{item.label}</option>
        ))}
      </select>
    </>
  );
};
