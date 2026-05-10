import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import Form from "./components/Form";
import { FormContextProvider } from "./contexts/FormContext";

function App() {
  return (
    <>
      <FormContextProvider>
        <Form></Form>
      </FormContextProvider>
    </>
  );
}

export default App;
