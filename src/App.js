import Home from "./components/Home/home";
import { BrowserRouter , Routes , Route} from "react-router-dom";
import {RegisterS , RegisterA} from "./components/sign/register"
import {LoginS , LoginA} from "./components/sign/login";

export const config = {
    endpoint : "https://eduplanbackenddeployement.herokuapp.com/",
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="student/">
            <Route path="signup" element={<RegisterS />}/>
            <Route path="signin" element={<LoginS />} />
          </Route>
          <Route path="admin/">
            <Route path="signup" element={<RegisterA />}/>
            <Route path="signin" element={<LoginA />} />
          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
