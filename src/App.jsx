import Cookies from "js-cookie";
import AdminUserInfo from "./components/adminPanel/AdminUserinfo";
import GraficasDatos from "./pages/GraficasDatos";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/AdminUserInfo" element={<AdminUserInfo />} />
        <Route path="/graficas" element={<GraficasDatos />} />
      </Routes>
    </Router>
  );
}

export default App; 