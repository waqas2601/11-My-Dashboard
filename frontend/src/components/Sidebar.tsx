import type { IconType } from "react-icons";
import { CiRead } from "react-icons/ci";
import { IoIosCreate } from "react-icons/io";
import { MdBrowserUpdated, MdDashboard, MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

interface TabType {
  name: string;
  icon: IconType;
  path: string;
}

function Sidebar() {
  const tabs: TabType[] = [
    { name: "Dashboard", icon: MdDashboard, path: "/" },
    { name: "Create", icon: IoIosCreate, path: "/create" },
    { name: "Read", icon: CiRead, path: "/read" },
    { name: "Update", icon: MdBrowserUpdated, path: "/update" },
    { name: "Delete", icon: MdDelete, path: "/delete" },
  ];

  const navigate = useNavigate();

  const handleClick = (path: string) => {
    navigate(path);
  };
  return (
    <div className="w-[30%] h-full border-r border-gray-400 p-5 ">
      <h1 className="text-center font-bold text-lg">Sidebar</h1>

      <ul className="">
        {tabs.map((tab, index) => (
          <li
            onClick={() => handleClick(tab.path)}
            key={index}
            className="shadow-sm p-3 rounded-5 flex items-center gap-2 hover:scale-105 transition-all ease-in-out duration-300 cursor-pointer"
          >
            <tab.icon />
            {tab.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
