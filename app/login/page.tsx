import Image from "next/image";
import LoginForm from "@/components/auth/LoginForm";

export const metadata = {
  title: "Login - Task Manager",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      <div className="relative hidden lg:flex lg:w-1/2 items-end p-12">
        <Image
          src="/images/bg-login.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/20" />
        <div className="relative z-10 text-white max-w-lg">
          <h2 className="text-4xl font-bold leading-tight mb-4">
            Organiza tus tareas.
            <br />
            Logra más cada día.
          </h2>
          <p className="text-white/70 text-lg">
            Gestiona tus proyectos de forma simple y eficiente con nuestra
            plataforma de tareas.
          </p>
        </div>
      </div>

      <div className="flex w-full lg:w-1/2 items-center justify-center px-6 py-12 bg-white">
        <LoginForm />
      </div>
    </div>
  );
}
