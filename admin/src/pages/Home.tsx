import { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home as HomeIcon, ClipboardList as ClipboardListIcon, BarChart2 as ChartBarIcon } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import axios from "axios";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [nome, setNome] = useState("");
  const [data, setData] = useState("");
  const [acao, setAcao] = useState("");
  const [descricao, setDescricao] = useState("");
  const [status, setStatus] = useState("");
  const [observacoes, setObservacoes] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try{
    const response = await axios.post("http://localhost:5000/api/entries",{
      nome,
      data,
      acao,
      descricao,
      status,
      observacoes
    });
    if (response.status === 200) {
      console.log("Formulário enviado com sucesso");
      setOpen(false); // Fecha o modal após o envio bem-sucedido
    }
  } catch (error) {
    console.error("Erro ao enviar dados:", error);
  // Aqui você pode adicionar a lógica de autenticação
  
}
}

 

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r">
        <div className="p-6">
          <span className="text-2xl font-bold text-indigo-600">AdminPanel</span>
        </div>
        <nav className="px-4 py-6 space-y-2">
          <a href="/dashboard" className="flex items-center px-3 py-2 rounded-lg hover:bg-indigo-50">
            <HomeIcon className="w-5 h-5 text-gray-600" />
            <span className="ml-3 text-gray-700">Dashboard</span>
          </a>
          <a href="/analises" className="flex items-center px-3 py-2 rounded-lg hover:bg-indigo-50">
            <ChartBarIcon className="w-5 h-5 text-gray-600" />
            <span className="ml-3 text-gray-700">Análises</span>
          </a>
          <a href="/relatorios" className="flex items-center px-3 py-2 rounded-lg hover:bg-indigo-50">
            <ClipboardListIcon className="w-5 h-5 text-gray-600" />
            <span className="ml-3 text-gray-700">Relatórios</span>
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Admin Inbox</h1>
          <div className="flex space-x-2">
            <Button variant="outline" className="py-2">
              Importar CSV
            </Button>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="py-2">Novo Cadastro</Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg p-6">
                <DialogHeader>
                  <DialogTitle>Novo Cadastro</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Informações Básicas */}
                  <section className="space-y-3">
                    <h2 className="text-lg font-semibold text-gray-700">Informações Básicas</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="flex flex-col space-y-1">
                        <Label htmlFor="nome">Nome</Label>
                        <Input id="nome" placeholder="Digite o nome completo"
                          value={nome}
                          onChange={(e) => setNome(e.target.value)}
                        />
                        
                      </div>
                      <div className="flex flex-col space-y-1">
                        <Label htmlFor="data">Data</Label>
                        <Input id="data" type="date"
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
                        <Input id="acao" placeholder="Ex: Cadastro, Análise"
                          value={acao}
                          onChange={(e) => setAcao(e.target.value)}
                        />
                      </div>
                      <div className="flex flex-col space-y-1">
                        <Label htmlFor="descricao">Descrição</Label>
                        <Input id="descricao" placeholder="Descrição detalhada"
                          value={descricao}
                          onChange={(e) => setDescricao(e.target.value)}
                        />
                      </div>
                    </div>
                  </section>

                  {/* Status & Observações */}
                  <section className="space-y-3">
                    <h2 className="text-lg font-semibold text-gray-700">Status & Observações</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="flex flex-col space-y-1">
                        <Label htmlFor="status">Status</Label>
                        <select id="status" className="mt-1 px-3 py-2 border rounded-lg" value={status} onChange={(e) => setStatus(e.target.value)}>
                          <option value="">Selecione</option>
                          <option value="Pendente">Pendente</option>
                          <option value="Em Andamento">Em Andamento</option>
                          <option value="Concluído">Concluído</option>
                        </select>
                        
                      </div>
                      <div className="flex flex-col space-y-1">
                        <Label htmlFor="observacoes">Observações</Label>
                        <Input id="observacoes" placeholder="Observações adicionais"
                          value={observacoes}
                          onChange={(e) => setObservacoes(e.target.value)}
                        />
                      </div>
                    </div>
                  </section>

                  <DialogFooter className="flex justify-end space-x-2">
                    <Button type="submit">Salvar</Button>
                    <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
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
              <input
                type="text"
                placeholder="Pesquisar por nome, ação..."
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
              <Button variant="ghost">Buscar</Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="text-sm text-gray-600 uppercase">
                  <tr>
                    <th className="px-4 py-2">Nome</th>
                    <th className="px-4 py-2">Data</th>
                    <th className="px-4 py-2">Ação</th>
                    <th className="px-4 py-2">Descrição</th>
                    <th className="px-4 py-2">Status</th>
                    <th className="px-4 py-2">Observações</th>
                  </tr> 
                </thead>
                <tbody className="text-gray-700">
                    <tr>
                      <td colSpan={6} className="px-4 py-2 text-center text-gray-500">
                        Nenhum cadastro ainda
                      </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Charts Section (placeholder) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader><CardTitle>Análise de Cadastros</CardTitle></CardHeader>
            <CardContent>
              <div className="h-48 flex items-center justify-center bg-gray-100 rounded-lg">Gráfico</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Relatórios Mensais</CardTitle></CardHeader>
            <CardContent>
              <div className="h-48 flex items-center justify-center bg-gray-100 rounded-lg">Gráfico</div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
