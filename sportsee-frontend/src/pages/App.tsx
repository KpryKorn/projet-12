import AvgSession from "../components/charts/avg-session";
import DailyActivity from "../components/charts/daily-activity";
import TrackerInformations from "../components/charts/tracker-informations";
import Greetings from "../components/greetings";
import Header from "../components/header";
import Sidebar from "../components/sidebar";

function App() {
  // todo : créer un switch pour le userId et alterner entre les 2 users
  return (
    <>
      <Header />
      <Sidebar />
      <main className="ml-32 px-[107px] py-[68px]">
        <Greetings userId={12} />

        <section className="flex gap-[31px]">
          <div className="flex flex-col justify-between gap-7">
            <DailyActivity text="Activité journalière" />

            <div className="flex items-center justify-between">
              <AvgSession text="Durée moyenne des sessions" />
              <AvgSession text="Diagramme araignée" />
              <AvgSession text="Score %" />
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
