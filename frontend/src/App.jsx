import Navbar from "./components/Nav";
import Allroutes from "./routes/AllRoutes";

const App = () => {
  console.log("App component rendered");
  return <div>
  <Navbar/>
    <Allroutes/>
  </div>;
};

export default App;
