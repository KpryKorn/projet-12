import { useEffect, useState } from "react";
import { userService } from "../../services/api";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export default function SessionScore({ userId }: { userId: number }) {
  const COLORS = ["#E60000", "#fbfbfb"];

  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await userService.getUserMainData(userId);
        setUserData(data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setError(error.message);
      }
    }

    loadData();
  }, [userId]);

  // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
  const dataScore = userData?.todayScore! * 100 || userData?.score! * 100;
  const formattedData = [
    { name: "A", value: dataScore },
    { name: "B", value: 100 - dataScore },
  ];

  if (error) return <div>Error: {error}</div>;
  if (!userData) return <div>Loading...</div>;

  return (
    <article className="aspect-square w-48 h-48 xl:w-64 xl:h-64 bg-gray-100 flex flex-col items-center justify-center rounded-lg relative">
      <h2 className="self-start ml-6 pt-4">Score</h2>
      <div className="text-[#282D30] font-bold w-[90px] h-[90px] absolute flex flex-col justify-center items-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-white text-center">
        {dataScore} %{" "}
        <span className="font-normal text-sm">de votre objectif</span>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart margin={{ bottom: 38 }}>
          <Pie
            data={formattedData}
            innerRadius={45}
            outerRadius={60}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            cornerRadius={40}
          >
            {formattedData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Pie
            data={formattedData}
            cx={420}
            cy={200}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {formattedData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </article>
  );
}
