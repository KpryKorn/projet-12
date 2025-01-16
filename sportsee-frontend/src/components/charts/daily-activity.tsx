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
  TooltipProps,
} from "recharts";

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-red-500 text-white p-2 border border-gray-300 rounded">
        <p>{`${payload[0].value}`}Kg</p>
        <p>{`${payload[1].value}`}Kcal</p>
      </div>
    );
  }

  return null;
};

export default function DailyActivity({ userId }: { userId: number }) {
  const [userActivity, setUserActivity] = useState<UserActivity | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await activityService.getUserActivity(userId);
        setUserActivity(data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setError(error.message);
      }
    }

    loadData();
  }, [userId]);

  if (error) return <div>Error: {error}</div>;
  if (!userActivity) return <div>Loading...</div>;

  return (
    <article className="max-w-[600px] xl:min-w-[835px] w-full h-[250px] xl:h-[320px] bg-gray-100 flex flex-col items-center justify-center p-4">
      <h2 className="self-start ml-10">Activité quotidienne</h2>
      <ResponsiveContainer width="100%" height="80%">
        <BarChart
          data={userActivity.sessions}
          width={500}
          height={300}
          margin={{
            top: 0,
            right: 0,
            left: 40,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="day" tickLine={false} />
          <YAxis
            yAxisId={"kilogram"}
            dataKey={"kilogram"}
            orientation="right"
            tickLine={false}
            axisLine={false}
            domain={["dataMin - 2", "dataMax + 2"]}
          />
          <YAxis
            yAxisId={"calories"}
            dataKey={"calories"}
            orientation="right"
            tickLine={false}
            axisLine={false}
            display={"none"}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="top"
            align="right"
            height={24}
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
          <Bar
            dataKey="kilogram"
            fill="#282D30"
            barSize={8}
            radius={[5, 5, 0, 0]}
            yAxisId="kilogram"
          />
          <Bar
            dataKey="calories"
            fill="#E60000"
            barSize={8}
            radius={[5, 5, 0, 0]}
            yAxisId="calories"
          />
        </BarChart>
      </ResponsiveContainer>
    </article>
  );
}
