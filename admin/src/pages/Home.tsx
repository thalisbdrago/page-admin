// src/pages/Home.tsx

import { useEffect, useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Home as HomeIcon,
  ClipboardList as ClipboardListIcon,
  BarChart2 as ChartBarIcon,
  Edit2 as EditIcon,
  Trash2 as TrashIcon,
} from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Sidebar } from "@/component/SideBar";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  // Estados de formulário
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [nome, setNome] = useState("");
  const [data, setData] = useState("");
  const [acao, setAcao] = useState("");
  const [descricao, setDescricao] = useState("");
  const [status, setStatus] = useState("");
  const [observacoes, setObservacoes] = useState("");

  // Lista de entradas vindas do backend
  const [entries, setEntries] = useState<any[]>([]);

  // Fetch das entradas
  const fetchEntries = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/entries");
      setEntries(response.data);
    } catch (error) {
      console.error("Erro ao buscar entradas:", error);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  // Cores em tons pastel/quentes para cada status
  const STATUS_COLORS: Record<string, string> = {
    Pendente: "#FED7AA",       // pastel laranja suave
    "Em Andamento": "#C3DAFE", // pastel azul suave
    Concluído: "#BBF7D0",      // pastel verde suave
  };

  // Calcula quantidades por status para o gráfico
  const chartData = useMemo(() => {
    const counts: Record<string, number> = {
      Pendente: 0,
      "Em Andamento": 0,
      Concluído: 0,
    };
    entries.forEach((entry) => {
      if (entry.status in counts) {
        counts[entry.status] += 1;
      }
    });
    return Object.entries(counts).map(([name, count]) => ({ name, count }));
  }, [entries]);

  // Reseta formulário
  const resetForm = () => {
    setEditId(null);
    setNome("");
    setData("");
    setAcao("");
    setDescricao("");
    setStatus("");
    setObservacoes("");
  };

  // Submit (POST ou PUT)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { nome, data, acao, descricao, status, observacoes };
    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/entries/${editId}`, payload);
      } else {
        await axios.post("http://localhost:5000/api/entries", payload);
      }
      setOpen(false);
      resetForm();
      fetchEntries();
    } catch (error) {
      console.error("Erro ao salvar dados:", error);
    }
  };

  // Preenche formulário para edição
  const handleEdit = (entry: any) => {
    setEditId(entry._id);
    setNome(entry.nome);
    setData(entry.data.slice(0, 10));
    setAcao(entry.acao);
    setDescricao(entry.descricao);
    setStatus(entry.status);
    setObservacoes(entry.observacoes || "");
    setOpen(true);
  };

  // Deleta entrada
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/entries/${id}`);
      fetchEntries();
    } catch (error) {
      console.error("Erro ao deletar entrada:", error);
    }
  };

  // Logout manual
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        {/* Header + Botões */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Admin Inbox</h1>
          <div className="flex space-x-2">
            <Button variant="outline" className="py-2">
              Importar CSV
            </Button>
            <Button variant="destructive" className="py-2" onClick={handleLogout}>
              Logout
            </Button>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="py-2">
                  {editId ? "Editar Cadastro" : "Novo Cadastro"}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg p-6">
                <DialogHeader>
                  <DialogTitle>
                    {editId ? "Editar Cadastro" : "Novo Cadastro"}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Informações Básicas */}
                  <section className="space-y-3">
                    <h2 className="text-lg font-semibold text-gray-700">
                      Informações Básicas
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="flex flex-col space-y-1">
                        <Label htmlFor="nome">Nome</Label>
                        <Input
                          id="nome"
                          placeholder="Digite o nome completo"
                          value={nome}
                          onChange={(e) => setNome(e.target.value)}
                        />
                      </div>
                      <div className="flex flex-col space-y-1">
                        <Label htmlFor="data">Data</Label>
                        <Input
                          id="data"
                          type="date"
                          value={data}
                          onChange={(e) => setData(e.target.value)}
                        />
                      </div>
                    </div>
                  </section>

                  {/* Detalhes */}
                  <section className="space-y-3">
                    <h2 className="text-lg font-semibold text-gray-700">Detalhes</h2>
                    <div className="space-y-4">
                      <div className="flex flex-col space-y-1">
                        <Label htmlFor="acao">Ação</Label>
                        <Input
                          id="acao"
                          placeholder="Ex: Cadastro, Análise"
                          value={acao}
                          onChange={(e) => setAcao(e.target.value)}
                        />
                      </div>
                      <div className="flex flex-col space-y-1">
                        <Label htmlFor="descricao">Descrição</Label>
                        <Input
                          id="descricao"
                          placeholder="Descrição detalhada"
                          value={descricao}
                          onChange={(e) => setDescricao(e.target.value)}
                        />
                      </div>
                    </div>
                  </section>

                  {/* Status & Observações */}
                  <section className="space-y-3">
                    <h2 className="text-lg font-semibold text-gray-700">
                      Status & Observações
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="flex flex-col space-y-1">
                        <Label htmlFor="status">Status</Label>
                        <select
                          id="status"
                          className="mt-1 px-3 py-2 border rounded-lg"
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                        >
                          <option value="">Selecione</option>
                          <option value="Pendente">Pendente</option>
                          <option value="Em Andamento">Em Andamento</option>
                          <option value="Concluído">Concluído</option>
                        </select>
                      </div>
                      <div className="flex flex-col space-y-1">
                        <Label htmlFor="observacoes">Observações</Label>
                        <Input
                          id="observacoes"
                          placeholder="Observações adicionais"
                          value={observacoes}
                          onChange={(e) => setObservacoes(e.target.value)}
                        />
                      </div>
                    </div>
                  </section>

                  <DialogFooter className="flex justify-end space-x-2">
                    <Button type="submit">Salvar</Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setOpen(false);
                        resetForm();
                      }}
                    >
                      Cancelar
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Search & Table */}
        <Card className="mb-6">
          <CardContent>
            <div className="flex items-center space-x-2 mb-4">
              <Input
                type="text"
                placeholder="Pesquisar por nome, ação..."
                className="flex-1"
              />
              <Button variant="ghost">Buscar</Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="text-sm text-gray-600 uppercase bg-gray-100">
                  <tr>
                    <th className="px-4 py-2">Nome</th>
                    <th className="px-4 py-2">Data</th>
                    <th className="px-4 py-2">Ação</th>
                    <th className="px-4 py-2">Descrição</th>
                    <th className="px-4 py-2">Status</th>
                    <th className="px-4 py-2">Observações</th>
                    <th className="px-4 py-2">Ações</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {entries.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-2 text-center text-gray-500">
                        Nenhum cadastro ainda
                      </td>
                    </tr>
                  ) : (
                    entries.map((entry) => (
                      <tr key={entry._id} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-2">{entry.nome}</td>
                        <td className="px-4 py-2">
                          {new Date(entry.data).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-2">{entry.acao}</td>
                        <td className="px-4 py-2">{entry.descricao}</td>
                        <td className="px-4 py-2">{entry.status}</td>
                        <td className="px-4 py-2">{entry.observacoes || "—"}</td>
                        <td className="px-4 py-2 space-x-2">
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(entry)}>
                            <EditIcon className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(entry._id)}>
                            <TrashIcon className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Status dos Cadastros</CardTitle>
            </CardHeader>
            <CardContent>
              <div style={{ width: "100%", height: 300 }}>
                <ResponsiveContainer>
                  <BarChart data={chartData}>
                    <XAxis dataKey="name" stroke="#8884d8" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Legend
                      verticalAlign="top"
                      align="center"
                      layout="horizontal"
                      wrapperStyle={{ marginBottom: 16 }}
                      itemStyle={{ marginRight: 32 }}
                      iconSize={12}
                      payload={chartData.map((item) => ({
                        value: item.name,
                        type: "square",
                        id: item.name,
                        color: STATUS_COLORS[item.name],
                      }))}
                    />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <Bar dataKey="count" name="Quantidade" barSize={30}>
                      {chartData.map((entry, idx) => (
                        <Cell key={idx} fill={STATUS_COLORS[entry.name]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

        </div>
      </main>
    </div>
  );
}
