import { useEffect, useState } from "react";
import { fetchUserData } from "../services/api";

export default function Greetings({ userId }: { userId: number }) {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchUserData(userId);
        setUserData(data);
      } catch (error: any) {
        setError(error.message);
      }
    }

    loadData();
  }, [userId]);

  if (error) return <div>Error: {error}</div>;
  if (!userData) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-5xl font-medium">
        Bonjour{" "}
        <span className="text-red-500">{userData.userInfos.firstName}</span>
      </h1>

      <p className="mt-10">
        Félicitations ! Vous avez explosé vos objectifs hier 👏
      </p>
    </div>
  );
}
