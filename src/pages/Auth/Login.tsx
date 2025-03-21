import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { usePost } from "@/hooks/usePost";
import { toast } from "react-hot-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

type LoginResponse = {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
};

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: login, isPending } = usePost<
    LoginResponse,
    z.infer<typeof loginSchema>
  >({
    url: "/login",
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      toast.success("Inicio de sesión exitoso");
      navigate("/productos/laptops");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Error al iniciar sesión");
    },
  });

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    login(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <h2 className="text-2xl font-bold text-center">Iniciar Sesión</h2>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="correo@ejemplo.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 -translate-y-1/2"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? "Ocultar" : "Mostrar"}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? "Iniciando sesión..." : "Iniciar Sesión"}
                </Button>
                <p className="text-center text-sm">
                  ¿No tienes una cuenta?{" "}
                  <Button
                    variant="link"
                    className="p-0"
                    onClick={() => navigate("/register")}
                  >
                    Regístrate
                  </Button>
                </p>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
