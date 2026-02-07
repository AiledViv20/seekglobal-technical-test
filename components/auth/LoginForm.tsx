"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { useAuth } from "@/modules/auth/hooks/useAuth";

export default function LoginForm() {
  const router = useRouter();
  const { login, isLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (value: string): string => {
    if (!value.trim()) return "";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(value.trim())) return "Ingresa un correo electrónico válido.";
    return "";
  };

  const validatePassword = (value: string): string => {
    if (!value) return "";
    if (value.length < 3) return "La contraseña debe tener al menos 3 caracteres.";
    if (!/\d/.test(value)) return "La contraseña debe contener al menos un número.";
    return "";
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setEmailError(validateEmail(value));
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setPasswordError(validatePassword(value));
  };

  const isFormValid = email.trim() && !validateEmail(email) && password.trim() && !validatePassword(password);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!isFormValid) return;

    await login({ email: email.trim(), password });

    const { isAuthenticated } = useAuth.getState();
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  };

  return (
    <div className="w-full max-w-md">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">
        Bienvenido
      </h1>
      <p className="text-gray-500 mb-8">
        Inicia sesión para gestionar tus tareas.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Ingresa tu email"
            value={email}
            onChange={(e) => handleEmailChange(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-gray-300 focus:outline-none focus:ring-0 transition-colors"
          />
          {emailError && (
            <p className="mt-1 text-[13px] italic" style={{ color: "#CE2D2D" }}>{emailError}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            Contraseña
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => handlePasswordChange(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 text-gray-900 placeholder-gray-400 focus:border-gray-300 focus:outline-none focus:ring-0 transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {showPassword ? (
                <HiOutlineEyeOff size={20} />
              ) : (
                <HiOutlineEye size={20} />
              )}
            </button>
          </div>
          {passwordError && (
            <p className="mt-1 text-[13px] italic" style={{ color: "#CE2D2D" }}>{passwordError}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading || !isFormValid}
          className="w-full mt-6 rounded-full bg-gray-900 py-3.5 text-white font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
        </button>
      </form>
    </div>
  );
}
