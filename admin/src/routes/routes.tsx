import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Admin";
import PrivateRoute from "./PrivateRoute"; // importa o componente que criamos
import Analise from "../pages/Analise";
import Relatorio from "../pages/Relatorio";

function AppRoutes() {
  return (
    <Routes>
      {/* Rota pública */}
      <Route path="/login" element={<Login />} />

      {/* Rota protegida */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />

      <Route
        path="/relatorios"
        element={
          <PrivateRoute>
            <Relatorio/>
          </PrivateRoute>
        }
      />

        <Route
        path="/analises"
        element={
          <PrivateRoute>
            <Analise />
          </PrivateRoute>
        }
      />

      {/* Redireciona "/" para login por padrão */}
      <Route path="/" element={<Login />} />
    </Routes>
  );
}

export default AppRoutes;
