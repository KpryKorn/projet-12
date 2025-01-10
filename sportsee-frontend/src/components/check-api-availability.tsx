import { useEffect, useState } from "react";

export default function CheckApiAvailability() {
  const [isApiAvailable, setIsApiAvailable] = useState(true);

  useEffect(() => {
    async function checkApi() {
      try {
        const response = await fetch("http://localhost:3000/");
        if (response.status !== 200) {
          setIsApiAvailable(false);
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setIsApiAvailable(false);
      }
    }

    checkApi();
  }, []);

  if (!isApiAvailable) {
    return (
      <div className="absolute bottom-0 left-0 m-4 p-2 text-white bg-red-500 rounded-md">
        ⚠️ L'API n'est pas disponible ⚠️
      </div>
    );
  }

  return null;
}
