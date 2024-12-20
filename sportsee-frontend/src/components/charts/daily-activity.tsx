import { useEffect, useState } from "react";
import { activityService } from "../../services/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function DailyActivity({ userId }: { userId: number }) {
  const [userActivity, setUserActivity] = useState<UserActivity | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await activityService.getUserActivity(userId);
        setUserActivity(data);
      } catch (error: any) {
        setError(error.message);
      }
    }

    loadData();
  }, [userId]);

  if (error) return <div>Error: {error}</div>;
  if (!userActivity) return <div>Loading...</div>;

  const formattedData = userActivity.sessions.map((session) => ({
    day: session.day,
    calories: session.calories,
    kilogram: session.kilogram,
  }));

  return (
    <article className="min-w-[835px] w-full h-[320px] bg-gray-100 flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend
            verticalAlign="top"
            align="right"
            iconSize={10}
            payload={[
              { value: "Poids (kg)", type: "circle", color: "#020203" },
              {
                value: "Calories brûlées (kCal)",
                type: "circle",
                color: "#FF0101",
              },
            ]}
          />
          <Bar dataKey="kilogram" fill="#020203" />
          <Bar dataKey="calories" fill="#FF0101" />
        </BarChart>
      </ResponsiveContainer>
    </article>
  );
}
