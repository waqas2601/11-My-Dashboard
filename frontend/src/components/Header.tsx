import { GiKnifeFork } from "react-icons/gi";

function Header() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm px-6 py-4 flex justify-between items-center ">
      {/* Left: Logo */}
      <div className="bg-green-100 p-2 rounded-full">
        <GiKnifeFork className="text-green-600 text-2xl" />
      </div>

      {/* Center: App Name */}
      <h1 className="text-2xl font-bold text-gray-700 italic tracking-wide relative">
        <span className="text-green-600">Food</span>{" "}
        <span className="text-gray-800">Management</span>{" "}
        <span className="text-green-600">Dashboard</span>
        {/* <span className="absolute left-1/2 -bottom-1 w-24 h-[2px] bg-green-500 transform -translate-x-1/2 rounded-full"></span> */}
      </h1>

      {/* Right: Date */}
      <div className="text-gray-500 text-sm font-medium bg-gray-50 px-3 py-1 rounded-md border border-gray-200">
        {today}
      </div>
    </header>
  );
}

export default Header;
