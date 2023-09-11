import { Outlet } from "react-router-dom";
import Header from "./components/Header.component.tsx";
import Footer from "./components/Footer.component.tsx";

function App() {
  return (
    <main>
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
}

export default App;
