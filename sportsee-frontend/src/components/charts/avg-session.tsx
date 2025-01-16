import { useState, useEffect, useRef } from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
} from "recharts";
import { averageSessionService } from "../../services/api";

const formatDayOfWeek = (day: number): string => {
  const daysOfWeek = ["L", "M", "M", "J", "V", "S", "D"];
  return daysOfWeek[day - 1];
};

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-300 rounded">
        <p>{`${payload[0].value} min`}</p>
      </div>
    );
  }

  return null;
};

export default function AvgSession({ userId }: { userId: number }) {
  const [userAvgSessions, setUserAvgSessions] =
    useState<UserAverageSessions | null>(null);
  const [error, setError] = useState<string | null>(null);

  const rectangleRef = useRef<HTMLDivElement>(null);
  const activeDotRef = useRef<Element | null>(null);

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (
            node instanceof Element &&
            node.classList.contains("recharts-active-dot")
          ) {
            activeDotRef.current = node;
            updateRectangleWidth();
          }
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    window.addEventListener("resize", updateRectangleWidth);
    return () => {
      window.removeEventListener("resize", updateRectangleWidth);
    };
  }, []);

  const updateRectangleWidth = () => {
    if (activeDotRef.current && rectangleRef.current) {
      const rect = activeDotRef.current.getBoundingClientRect();
      const chartRect = document.querySelector(".avg")!.getBoundingClientRect();
      const chartWidth = chartRect.width;
      const rectangleWidth = chartWidth - (rect.left - chartRect.left) - 3;
      rectangleRef.current.style.width = `${rectangleWidth}px`;
    }
  };

  useEffect(() => {
    async function loadData() {
      try {
        const data = await averageSessionService.getUserAverageSessions(userId);
        setUserAvgSessions(data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setError(error.message);
      }
    }

    loadData();
  }, [userId]);

  if (error) return <div>Error: {error}</div>;
  if (!userAvgSessions) return <div>Loading...</div>;

  return (
    <div className="avg">
      <article className="aspect-square w-48 h-48 xl:w-64 xl:h-64 bg-[#FF0000] flex flex-col items-center justify-center rounded-lg relative">
        <h2 className="absolute top-4 left-4 text-white/50">
          Durée moyenne des sessions
        </h2>
        <div
          className="absolute top-0 right-0 h-full bg-[rgba(1,1,1,0.0975)]"
          ref={rectangleRef}
        ></div>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={userAvgSessions.sessions}
            margin={{
              top: 60,
              right: 0,
              left: 0,
              bottom: 10,
            }}
          >
            <XAxis
              dataKey="day"
              tickFormatter={formatDayOfWeek}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#FF8181" }}
              padding={{ left: 20, right: 20 }}
            />
            <Tooltip cursor={false} content={<CustomTooltip />} />
            <Line
              type="monotone"
              strokeWidth={2}
              dataKey="sessionLength"
              stroke="white"
              activeDot={{
                stroke: "white",
                strokeWidth: 10,
                r: 4,
                fill: "white",
                strokeOpacity: 0.3,
              }}
              dot={{ r: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </article>
    </div>
  );
}
