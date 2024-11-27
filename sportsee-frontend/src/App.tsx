import Header from "./components/header";
import Sidebar from "./components/sidebar";

function App() {
  return (
    <>
      <Header />
      <Sidebar />
      <main className="ml-32 p-8">
        <h1 className="text-red-500">hello world</h1>
      </main>
    </>
  );
}

export default App;
