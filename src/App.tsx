import { Toaster } from "sonner";
import { Home } from "./pages/home";

function App() {
  return (
    <div>
      <Home />
      <Toaster position="top-center" richColors />
    </div>
  );
}

export default App;
