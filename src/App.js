import Home from "./components/Home/home";
import { BrowserRouter , Routes , Route} from "react-router-dom";
import {RegisterS , RegisterA} from "./components/sign/register"
import {LoginS , LoginA} from "./components/sign/login";
import StudentClasses from "./components/studentClasses/StudentClasses";
import Classes from "./components/Classes/classes";
import AdminUI from "./components/AdminUI/adminui";

export const config = {
    endpoint : "https://eduplanbackenddeployement.herokuapp.com/",
};

export function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="student/">
            <Route path="signup" element={<RegisterS />}/>
            <Route path="signin" element={<LoginS />} />
            <Route path="classes" element={<Classes />}/>
            <Route path="classes/:emailid" element={<StudentClasses />}/>
          </Route>
          <Route path="admin/">
            <Route path="signup" element={<RegisterA />}/>
            <Route path="signin" element={<LoginA />} />
            <Route path="adminui" element={<AdminUI />} />
          </Route>
      </Routes>
    </BrowserRouter>
  );
}


