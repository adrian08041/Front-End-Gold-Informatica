import { RegisterForm } from "./components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="flex h-screen items-center justify-center bg-black">
      <div className="w-full max-w-sm rounded-xl bg-backgroundItems p-8 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-300">
          Criar Conta
        </h1>
        <RegisterForm />
      </div>
    </div>
  );
}
