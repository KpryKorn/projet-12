import { useEffect, useState } from "react";
import { fetchUserMainData } from "../../services/api";

export default function SessionScore({ userId }: { userId: number }) {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchUserMainData(userId);
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
    <article className="aspect-square w-64 h-64 bg-gray-100 flex items-center justify-center rounded-lg">
      <p className="text-xl">Score: {userData?.todayScore}</p>
    </article>
  );
}
