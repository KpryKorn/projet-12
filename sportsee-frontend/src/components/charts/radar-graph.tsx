import { useEffect, useState } from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import { performanceService } from "../../services/api";

interface TranslationDict {
  [key: string]: string;
}

const translateSubject = (
  subject: string,
  translationDict: TranslationDict
): string => {
  return translationDict[subject] || subject;
};

const translationDict = {
  cardio: "cardio",
  energy: "énergie",
  endurance: "endurance",
  strength: "force",
  speed: "vitesse",
  intensity: "intensité",
};

export default function RadarGraph({ userId }: { userId: number }) {
  const [userPerformance, setUserPerformance] =
    useState<UserPerformance | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await performanceService.getUserPerformance(userId);
        setUserPerformance(data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setError(error.message);
      }
    }

    loadData();
  }, [userId]);

  const formattedData = userPerformance?.data.map((item) => ({
    subject: translateSubject(userPerformance.kind[item.kind], translationDict),
    A: item.value,
  }));

  if (error) return <div>Error: {error}</div>;
  if (!userPerformance) return <div>Loading...</div>;

  return (
    <article className="bg-[#282D30] w-48 h-48 xl:w-64 xl:h-64 flex items-center justify-center rounded">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart
          outerRadius={50}
          data={formattedData}
          style={{ fontSize: "10px" }}
        >
          <PolarGrid stroke="#fff" />
          <PolarAngleAxis dataKey="subject" stroke="#FFF" tickLine={false} />
          <Radar
            dataKey="A"
            stroke="#FF0101"
            fill="#FF0101"
            fillOpacity={0.7}
          />
        </RadarChart>
      </ResponsiveContainer>
    </article>
  );
}
