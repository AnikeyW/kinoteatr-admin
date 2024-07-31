import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const loginHandler = async (data: FormData) => {
    setIsLoading(true);
    const email = data.get("email") || "";
    const password = data.get("password") || "";
    try {
      setError(null);
      await authService.login(email.toString(), password.toString());
      setIsLoading(false);
      router.push("/admin");
    } catch (e: any) {
      setError(e.message.toString());
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    loginHandler,
  };
};
