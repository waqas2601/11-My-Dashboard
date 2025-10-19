import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Create from "./pages/Create";
import Read from "./pages/Read";
import Update from "./pages/Update";
import SingleUpdate from "./pages/SingleUpdate";
import Delete from "./pages/Delete";

function App() {
  return (
    <>
      <Router>
        <div className="w-full h-screen flex">
          <Sidebar />

          <Routes>
            <Route path="/" element={<Main />}>
              <Route index element={<Dashboard />} />
              <Route path="create" element={<Create />}></Route>
              <Route path="read" element={<Read />}></Route>
              <Route path="update" element={<Update></Update>}></Route>
              <Route path="delete" element={<Delete></Delete>}></Route>
              <Route path="update/:id" element={<SingleUpdate />}></Route>
            </Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
