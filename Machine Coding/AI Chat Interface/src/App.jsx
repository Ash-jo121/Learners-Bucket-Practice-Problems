import { useState } from "react";
import Home from "./pages/Home";
import "./App.css";
import { QueueContextProvider } from "./context/QueueContext";

function App() {
  return (
    <>
      <QueueContextProvider>
        <Home />
      </QueueContextProvider>
    </>
  );
}

export default App;
