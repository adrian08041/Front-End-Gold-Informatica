"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Cookies from "js-cookie";
import { useAuth } from "@/service/hooks/authQuery";

export default function LoginPage() {
  const authMutation = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);

  function validate() {
    const newErrors: typeof errors = {};

    if (!form.email.includes("@")) {
      newErrors.email = "O e-mail deve ser válido.";
    }

    if (!form.email.trim()) {
      newErrors.email = "O campo de e-mail é obrigatório.";
    }

    if (form.password.length < 6) {
      newErrors.password = "A senha deve ter pelo menos 6 caracteres.";
    }

    if (!form.password.trim()) {
      newErrors.password = "O campo de senha é obrigatório.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleLogin() {
    setError("");

    if (!validate()) return;

    setLoading(true);

    authMutation
      .mutateAsync(
        { email: form.email, password: form.password },
        {
          onError: (err) => {
            setError(err.message || "Erro ao fazer login.");
            setShake(true);
            setLoading(false);
            setTimeout(() => setShake(false), 500);
          },
        },
      )
      .then((response) => {
        if (response.data?.accessToken) {
          Cookies.set("auth_token", response.data.accessToken, { expires: 1 });
          router.push("/");
        }
      })
      .catch(() => {
        setError("Usuário ou senha inválidos.");
        setShake(true);
        setLoading(false);
        setTimeout(() => setShake(false), 500);
      });
  }

  return (
    <div className="flex h-[100vh] items-center justify-center bg-white px-4">
      <AnimatePresence>
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="w-full max-w-md"
        >
          <motion.div
            key="login-form"
            animate={shake ? { x: [-10, 10, -8, 8, 0] } : {}}
            transition={{ duration: 0.3 }}
            className="rounded-lg bg-backgroundItems p-8 shadow"
          >
            <h2 className="mb-6 text-center text-2xl font-semibold text-gray-200">
              Entrar
            </h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
              }}
            >
              <div className="mb-4">
                <label className="mb-2 block text-gray-300">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={`w-full rounded-md border bg-black px-4 py-2 text-white ${
                    errors.email ? "border-red-400" : "border-black"
                  }`}
                  placeholder="email@exemplo.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              <div className="mb-6">
                <label className="mb-2 block text-gray-300">Senha</label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  className={`w-full rounded-md border bg-black px-4 py-2 text-white ${
                    errors.password ? "border-red-400" : "border-black"
                  }`}
                  placeholder="******"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                )}
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-4 text-center text-sm text-red-500"
                >
                  {error}
                </motion.div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-md bg-dourado py-2 font-semibold text-white transition hover:bg-dourado/75"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    carregando...
                  </span>
                ) : (
                  "Entrar"
                )}
              </button>
            </form>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
