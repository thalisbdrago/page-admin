import { NavLink } from "react-router-dom";
import {
  Home as HomeIcon,
  BarChart2 as ChartBarIcon,
  ClipboardList as ClipboardListIcon,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", to: "/dashboard", Icon: HomeIcon },
  { name: "Análises", to: "/analises", Icon: ChartBarIcon },
  { name: "Relatórios", to: "/relatorios", Icon: ClipboardListIcon },
];

export function Sidebar() {
  return (
    <aside className="w-64 h-screen flex flex-col bg-white border-r shadow-sm">
      {/* Logo / Título */}
      <div className="px-6 py-5 border-b">
        <span className="text-2xl font-extrabold text-indigo-600">AdminPanel</span>
      </div>

      {/* Navegação */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {navItems.map(({ name, to, Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `group relative flex items-center px-4 py-2 rounded-lg transition-colors duration-200
              ${isActive
                ? "bg-indigo-50 text-indigo-600 font-semibold"
                : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"}`
            }
            end
          >
            {({ isActive }) => (
              <>
                {/* Indicador à esquerda quando ativo */}
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 bg-indigo-600 rounded-r-full" />
                )}
                <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
                <span>{name}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Versão / Logout ou outro rodapé */}
      <div className="px-6 py-4 border-t text-sm text-gray-400">
        v1.0.0
      </div>
    </aside>
  );
}
