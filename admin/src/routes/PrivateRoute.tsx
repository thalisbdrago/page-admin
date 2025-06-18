import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // caminho para o contexto

// Componente que recebe um "children" (a rota que queremos proteger)
export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useAuth(); // pega do contexto se está logado

  // Se estiver autenticado, renderiza o conteúdo (rota)
  // Senão, redireciona para a página de login
  return isAuthenticated ? children : <Navigate to="/login" />;
}
