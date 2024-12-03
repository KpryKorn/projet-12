import Greetings from "./components/greetings";
import Header from "./components/header";
import Sidebar from "./components/sidebar";

function App() {
  // todo : créer un switch pour le userId et alterner entre les 2 users
  return (
    <>
      <Header />
      <Sidebar />
      <main className="ml-32 p-20">
        <Greetings userId={12} />
      </main>
    </>
  );
}

export default App;
