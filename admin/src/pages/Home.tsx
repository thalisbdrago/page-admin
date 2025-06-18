// src/pages/Home.tsx
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="bg-white pb-2">
          <CardTitle className="text-2xl font-bold text-center">
            Bem-vindo!
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4 flex flex-col items-center">
          {/* Botão de Cadastro */}
          <Button asChild className="w-full">
            <a href="/cadastro">Cadastro</a>
          </Button>

          {/* Botão de Dashboard */}
          <Button asChild variant="outline" className="w-full">
            <a href="/dashboard">Dashboard</a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
