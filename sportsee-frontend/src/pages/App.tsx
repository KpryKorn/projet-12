import AvgSession from "../components/charts/avg-session";
import DailyActivity from "../components/charts/daily-activity";
import RadarGraph from "../components/charts/radar-graph";
import SessionScore from "../components/charts/session-score";
import TrackerInformations from "../components/charts/tracker-informations";
import Greetings from "../components/greetings";
import Header from "../components/header";
import Sidebar from "../components/sidebar";

function App() {
  // todo : créer un switch pour le userId et alterner entre les 2 users
  // todo : prévoir un switch pour les données mockées vs API

  return (
    <>
      <Header />
      <Sidebar />
      <main className="ml-32 px-[107px] py-[68px]">
        <Greetings userId={12} />

        <section className="flex gap-[31px]">
          <div className="flex flex-col justify-between gap-7">
            <DailyActivity userId={12} />

            <div className="flex items-center justify-between">
              <AvgSession userId={12} />
              <RadarGraph userId={12} />
              <SessionScore userId={12} />
            </div>
          </div>

          <div className="w-1/4 flex flex-col gap-[39px]">
            <TrackerInformations text="Calories" />
            <TrackerInformations text="Proteines" />
            <TrackerInformations text="Glucides" />
            <TrackerInformations text="Lipides" />
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
