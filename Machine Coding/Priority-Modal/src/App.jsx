import { Dashboard } from "./components/Dashboard";
import { ModalContextProvider } from "./contexts/ModalContext";

export default function App() {
  return (
    <div className="App">
      <ModalContextProvider>
        <Dashboard />
      </ModalContextProvider>
    </div>
  );
}
