import { useEffect, useState } from "react";
import { fetchUserActivity } from "../../services/api";

export default function DailyActivity({ userId }: { userId: number }) {
  const [userActivity, setUserActivity] = useState<UserActivity | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchUserActivity(userId);
        setUserActivity(data);
      } catch (error: any) {
        setError(error.message);
      }
    }

    loadData();
  }, [userId]);

  if (error) return <div>Error: {error}</div>;
  if (!userActivity) return <div>Loading...</div>;

  return (
    <article className="min-w-[835px] w-full h-[320px] bg-gray-100 flex items-center justify-center">
      <ul>
        {userActivity.sessions.map((session, idx) => (
          <li key={idx}>
            <p>
              {session.day} - {session.calories}kcal - {session.kilogram}kg
            </p>
          </li>
        ))}
      </ul>
    </article>
  );
}
