import { useEffect, useState } from "react";
import axios from "axios";
import { Sidebar } from "@/component/SideBar";
import {
  Clock as ClockIcon,
  RefreshCcw as RefreshIcon,
  CheckCircle as CheckIcon,
} from "lucide-react";

type StatusType = "Pendente" | "Em Andamento" | "Concluído";

export default function Analise() {
  const [counts, setCounts] = useState<Record<StatusType, number>>({
    Pendente: 0,
    "Em Andamento": 0,
    Concluído: 0,
  });

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/entries");
        const raw = response.data;
        // garante que tenhamos sempre um array
        const lista = Array.isArray(raw)
          ? raw
          : Array.isArray((raw as any).entries)
          ? (raw as any).entries
          : Array.isArray((raw as any).data)
          ? (raw as any).data
          : [];

        const resumo = lista.reduce((acc: Record<string, number>, entry: any) => {
          acc[entry.status] = (acc[entry.status] || 0) + 1;
          return acc;
        }, {});

        setCounts({
          Pendente: resumo["Pendente"] || 0,
          "Em Andamento": resumo["Em Andamento"] || 0,
          Concluído: resumo["Concluído"] || 0,
        });
      } catch (err) {
        console.error("Erro ao buscar entradas:", err);
      }
    };

    fetchEntries();
  }, []);

  // lógica de recomendação simples
  let recomendacao = "";
  if (counts.Pendente > 0) {
    recomendacao =
      "Você tem pendentes: comece por aí para evitar acúmulo de backlog.";
  } else if (counts["Em Andamento"] > 0) {
    recomendacao =
      "Não há pendentes — finalize as tarefas em andamento antes de abrir novas.";
  } else {
    recomendacao =
      "Ótimo, tudo foi concluído! Você pode criar ou priorizar novas entradas.";
  }

  // métricas para análise profissional
  const total =
    counts.Pendente + counts["Em Andamento"] + counts.Concluído;
  const backlogRatio = total
    ? ((counts.Pendente / total) * 100).toFixed(1)
    : "0";
  const wipRatio = total
    ? ((counts["Em Andamento"] / total) * 100).toFixed(1)
    : "0";
  const throughputRatio = total
    ? ((counts.Concluído / total) * 100).toFixed(1)
    : "0";

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Conteúdo principal */}
      <main className="flex-1 p-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8">
          Análise de Status
        </h1>

        {/* Cards de status */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-3 mb-10">
          {/* Pendente */}
          <div className="bg-white rounded-lg shadow p-6 flex flex-col">
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 rounded-full">
                <ClockIcon className="w-6 h-6 text-orange-500" />
              </div>
              <span className="ml-4 text-lg font-medium text-gray-700">
                Pendente
              </span>
            </div>
            <span className="mt-4 text-3xl font-bold text-orange-500">
              {counts.Pendente}
            </span>
          </div>

          {/* Em Andamento */}
          <div className="bg-white rounded-lg shadow p-6 flex flex-col">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <RefreshIcon className="w-6 h-6 text-blue-500 animate-spin" />
              </div>
              <span className="ml-4 text-lg font-medium text-gray-700">
                Em Andamento
              </span>
            </div>
            <span className="mt-4 text-3xl font-bold text-blue-500">
              {counts["Em Andamento"]}
            </span>
          </div>

          {/* Concluído */}
          <div className="bg-white rounded-lg shadow p-6 flex flex-col">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full">
                <CheckIcon className="w-6 h-6 text-green-500" />
              </div>
              <span className="ml-4 text-lg font-medium text-gray-700">
                Concluído
              </span>
            </div>
            <span className="mt-4 text-3xl font-bold text-green-500">
              {counts.Concluído}
            </span>
          </div>
        </div>

        {/* Card de recomendação */}
        <div className="bg-white rounded-lg shadow p-6 max-w-3xl">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Recomendação
          </h2>
          <p className="text-gray-700 leading-relaxed">{recomendacao}</p>
        </div>

        {/* Análise Profissional */}
        <div className="bg-white rounded-lg shadow p-6 max-w-4xl mt-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Análise Profissional
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              <strong>Total de tarefas:</strong> {total}
            </li>
            <li>
              <strong>Índice de Backlog:</strong> {backlogRatio}% (Pendente)
            </li>
            <li>
              <strong>Índice de WIP:</strong> {wipRatio}% (Em Andamento)
            </li>
            <li>
              <strong>Índice de Throughput:</strong>{" "}
              {throughputRatio}% (Concluído)
            </li>
            <li>
              <strong>Recomendações:</strong>
              <ul className="list-decimal list-inside ml-5">
                {counts.Pendente > 0 && (
                  <li>Priorize a resolução do backlog para evitar acúmulo.</li>
                )}
                {counts["Em Andamento"] > 0 && (
                  <li>
                    Concentre-se em finalizar as tarefas em andamento antes de
                    iniciar novas.
                  </li>
                )}
                {counts.Concluído === total && total > 0 && (
                  <li>
                    Excelente performance! Considere aumentar o escopo ou iniciar
                    novos projetos.
                  </li>
                )}
              </ul>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
