import { useState } from "react";
import AvgSession from "../components/charts/avg-session";
import DailyActivity from "../components/charts/daily-activity";
import RadarGraph from "../components/charts/radar-graph";
import SessionScore from "../components/charts/session-score";
import TrackerInformations from "../components/charts/tracker-informations";
import Greetings from "../components/greetings";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import Switch from "../components/switch";

function App() {
  const [checked, setChecked] = useState(false);

  return (
    <>
      <Header />
      <Sidebar />
      <main className="ml-32 px-[107px] py-[68px]">
        <div className="flex items-center justify-between">
          <Greetings userId={checked ? 18 : 12} />
          <Switch isOn={checked} handleToggle={() => setChecked(!checked)} />
        </div>

        <section className="flex gap-[31px]">
          <div className="flex flex-col justify-between gap-7">
            <DailyActivity userId={checked ? 18 : 12} />

            <div className="flex items-center justify-between">
              <AvgSession userId={checked ? 18 : 12} />
              <RadarGraph userId={checked ? 18 : 12} />
              <SessionScore userId={checked ? 18 : 12} />
            </div>
          </div>

          <div className="w-1/4 flex flex-col gap-[39px]">
            <TrackerInformations userId={checked ? 18 : 12} />
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
