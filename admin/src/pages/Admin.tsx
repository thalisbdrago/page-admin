// src/pages/Login.tsx
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";



export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try{
    const response = await axios.post("http://localhost:5000/api/admin/login",{
      email,
      password
    });
    if (response.status === 200) {
      // Aqui você pode redirecionar o usuário ou armazenar o token de autenticação
      console.log("Login bem-sucedido");
    }
  } catch (error) {
    console.error("Erro ao fazer login:", error); 
  // Aqui você pode adicionar a lógica de autenticação
  console.log("Formulário enviado");
}
}

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="bg-white pb-2">
          <CardTitle className="text-2xl font-bold text-center">Bem-vindo de volta</CardTitle>
          <p className="text-sm text-center text-gray-500">Entre na sua conta</p>
        </CardHeader>

        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* E-mail */}
            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
                E-mail
              </Label>
              <Input
                id="email"
                type="text"
                placeholder="seu@exemplo.com"
                required
                className="mt-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Senha */}
            <div>
              <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Senha
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                required
                className="mt-1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Rodapé do form */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-600">Lembrar-me</span>
              </label>
            </div>

            {/* Botão de login */}
            <Button type="submit" className="w-full">
              Entrar
            </Button>
          </form>
        </CardContent>

      </Card>
    </div>
  );
}
