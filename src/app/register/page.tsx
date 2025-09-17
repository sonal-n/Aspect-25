import type { Metadata } from "next";
import RegisterForm from "../components/RegistrationForm";

export const metadata: Metadata = {
  title: "Register • ASPECT'25",
};

export const dynamic = "force-dynamic"; 

export default function Page() {
  return (
    <main className="min-h-screen bg-[#160e0e]">
      <div className="container mx-auto max-w-4xl px-4 py-12">
        <RegisterForm />
      </div>
    </main>
  );
}
