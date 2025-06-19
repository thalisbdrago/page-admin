import { useEffect, useState } from "react";
import axios from "axios";
import { Sidebar } from "@/component/SideBar";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Button } from "@/components/ui/button";

type Entry = {
  nome: string;
  acao: string;
  data: string;
  status: string;
};

function Relatorio() {
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    const getEntries = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/entries");
        const raw = response.data;
        const lista = Array.isArray(raw) ? raw : raw.entries || raw.data || [];

        const nomeStatus = lista.map((entry: Entry) => ({
          nome: entry.nome,
          acao: entry.acao,
          data: new Date(entry.data).toLocaleDateString("pt-BR"),
          status: entry.status,
        }));

        setEntries(nomeStatus);
      } catch (error) {
        console.error("Erro ao buscar entradas:", error);
      }
    };

    getEntries();
  }, []);

const gerarPDF = () => {
  const doc = new jsPDF();
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("Relatório Executivo de Atividades", 14, 22);

  // Tabela de registros
  autoTable(doc, {
    startY: 30,
    head: [["Nome", "Ação", "Data", "Status"]],
    body: entries.map((entry) => [
      entry.nome,
      entry.acao,
      entry.data,
      entry.status,
    ]),
    styles: {
      fontSize: 10,
      cellPadding: 3,
      valign: "middle",
    },
    headStyles: {
      fillColor: [41, 128, 185],
      textColor: 255,
      fontStyle: "bold",
    },
    alternateRowStyles: { fillColor: [245, 245, 245] },
    margin: { left: 14, right: 14 },
  });

  // Resumo pós-tabela
  const finalY = (doc as any).lastAutoTable.finalY + 10;
  const total = entries.length;
  const countByStatus = entries.reduce(
    (acc, curr) => {
      acc[curr.status] = (acc[curr.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Resumo Geral", 14, finalY);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);

  const resumo = [
    `Total de Registros: ${total}`,
    `Pendente: ${countByStatus["Pendente"] || 0} (${(
      ((countByStatus["Pendente"] || 0) / total) *
      100
    ).toFixed(1)}%)`,
    `Em Andamento: ${countByStatus["Em Andamento"] || 0} (${(
      ((countByStatus["Em Andamento"] || 0) / total) *
      100
    ).toFixed(1)}%)`,
    `Concluído: ${countByStatus["Concluído"] || 0} (${(
      ((countByStatus["Concluído"] || 0) / total) *
      100
    ).toFixed(1)}%)`,
  ];

  resumo.forEach((line, i) => {
    doc.text(line, 14, finalY + 8 + i * 6);
  });

  doc.save("relatorio.pdf");
};

  return (
    <div className="flex">
      <Sidebar />
      <main className="p-8 w-full">
        <h1 className="text-3xl font-bold mb-4">Relatório</h1>

        <div className="mb-6">
          <Button onClick={gerarPDF}>Exportar PDF</Button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Nome</th>
                <th className="px-4 py-2 text-left">Ação</th>
                <th className="px-4 py-2 text-left">Data</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{entry.nome}</td>
                  <td className="px-4 py-2">{entry.acao}</td>
                  <td className="px-4 py-2">{entry.data}</td>
                  <td className="px-4 py-2">{entry.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default Relatorio;
