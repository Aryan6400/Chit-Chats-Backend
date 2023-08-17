import Home from "./components/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Auth from "./components/Auth/Auth";
import PrivateComponent from "./components/PrivateComponent";
import Welcome from "./components/WelcomePage/Welcome";
import CreateGroup from "./components/CreateGroup/CreateGroup";
import "./App.css";
import { useSelector } from "react-redux";
import { useChat } from "./context/ChatContext";

function App() {
  const darkTheme = useSelector((state)=>state.darkMode);
  const { selectedChat } = useChat();
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateComponent />}>
          <Route path="/chat" element={
            <div id="AppContainer" className={darkTheme ? "dark-container" : ""}>
              <div className="App">

                <div id="left-panel" className={darkTheme ? "dark-panel" : ""}>
                  <Sidebar />
                </div>

                {selectedChat ?
                <div id="right-panel" className={darkTheme ? "dark-panel" : ""}>
                  <Home />
                </div>
                :
                <div id="welcome-panel" className={darkTheme ? "dark-panel" : ""}>
                  <Welcome />
                </div>
                }

              </div>
            </div>
          } />
        </Route>

        <Route element={<PrivateComponent />}>
          <Route path="/welcome" element={
            <div id="AppContainer" className={darkTheme ? "dark-container" : ""}>
              <div className="App">

                <div id="left-panel" className={darkTheme ? "dark-panel" : ""}>
                  <Sidebar />
                </div>

                <div id="welcome-panel" className={darkTheme ? "dark-panel" : ""}>
                  <Welcome />
                </div>

              </div>
            </div>
          } />
        </Route>

        <Route element={<PrivateComponent />}>
          <Route path="/create" element={
            <div id="AppContainer" className={darkTheme ? "dark-container" : ""}>
              <div className="App">

                <div id="left-panel" className={darkTheme ? "dark-panel" : ""}>
                  <Sidebar />
                </div>

                <div id="welcome-panel" className={darkTheme ? "dark-panel" : ""}>
                  <CreateGroup />
                </div>

              </div>
            </div>
          } />
        </Route>

        <Route path="/" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
