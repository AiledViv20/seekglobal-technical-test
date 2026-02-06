"use client";

import { useAuthStore } from "@/lib/stores/auth.store";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-500 mb-6">
          Bienvenido, <span className="font-medium text-gray-900">{user?.firstName} {user?.lastName}</span>
        </p>
        <p className="text-sm text-gray-400 mb-8">
          El módulo de tareas se implementará próximamente.
        </p>
        <button
          onClick={handleLogout}
          className="w-full rounded-full bg-gray-900 py-3 text-white font-medium hover:bg-gray-800 transition-colors cursor-pointer"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}
