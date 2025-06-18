import { createContext, useContext, useState, useEffect } from "react";

// Interface que define os dados do contexto de autenticação
type AuthContextType = {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
};

// Criação do contexto com valor inicial nulo
const AuthContext = createContext<AuthContextType | null>(null);

// Provedor do contexto, que irá envolver a aplicação
export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Carrega estado inicial do localStorage
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem("isAuthenticated") === "true";
    } catch {
      return false;
    }
  });

  // Sincroniza mudanças de isAuthenticated ao localStorage
  useEffect(() => {
    try {
      localStorage.setItem("isAuthenticated", isAuthenticated ? "true" : "false");
    } catch {
      // Falha ao acessar localStorage (ex: modo privado)
    }
  }, [isAuthenticated]);

  // Função para logar: define e persiste
  const login = () => {
    setIsAuthenticated(true);
  };

  // Função para deslogar: limpa estado e localStorage
  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook personalizado para acessar o contexto
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth precisa estar dentro de AuthProvider");
  }
  return context;
}
