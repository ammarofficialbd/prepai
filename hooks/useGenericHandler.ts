// useGenericSubmitHandler.ts
import { useState } from "react";

 function useGenericSubmitHandler(callback: (data: any) => Promise<void>) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    try {
      await callback(data);
    } finally {
      setLoading(false);
    }
  };

  return { handleSubmit, loading };
}

export default useGenericSubmitHandler;