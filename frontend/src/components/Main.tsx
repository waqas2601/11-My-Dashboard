import { Outlet } from "react-router-dom";
import Header from "./Header";

function Main() {
  return (
    <div className="w-[70%] h-full ">
      <Header />
      <Outlet />
    </div>
  );
}

export default Main;
