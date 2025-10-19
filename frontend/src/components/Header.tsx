import { GiNestedHexagons } from "react-icons/gi";

function Header() {
  return (
    <header className="p-4 bg-white border-b border-gray-400 flex justify-between items-center">
      <GiNestedHexagons />
      <h1 className="font-bold italic">My App</h1>
      {new Date().toLocaleDateString()}
    </header>
  );
}

export default Header;
