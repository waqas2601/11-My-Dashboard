import { useEffect, useState } from "react";

type Food = {
  _id: string;
  name: string;
  price: number;
  weight: number;
  img: string;
};
function Read() {
  const [data, setData] = useState<Food[]>([]);

  async function fetchData() {
    const response = await fetch("http://localhost:3000/api/foods");
    const data = await response.json();
    setData(data);
  }
  console.log(data);
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6 w-full h-full overflow-y-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">🍽️ Food Items</h1>

      {/* Responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data !== undefined &&
          data.map((food) => (
            <div
              key={food._id}
              className="border rounded-xl shadow-md overflow-hidden hover:scale-105 transition-transform duration-300 bg-white"
            >
              {/* Food Image */}
              <img
                src={food.img}
                alt={food.name}
                className="h-48 w-full object-cover"
              />

              {/* Food Details */}
              <div className="p-4 flex flex-col gap-2">
                <h2 className="font-semibold text-lg">{food.name}</h2>

                <div className="flex justify-between text-sm text-gray-600">
                  <p>
                    💰 Price:{" "}
                    <span className="font-medium">Rs {food.price}</span>
                  </p>
                  <p>
                    ⚖️ Weight:{" "}
                    <span className="font-medium">{food.weight}g</span>
                  </p>
                </div>

                <button className="mt-3 bg-blue-500 text-white py-1.5 rounded hover:bg-blue-600 transition-all">
                  Order Now
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Read;
