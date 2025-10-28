import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Food = {
  _id: string;
  name: string;
  price: number;
  weight: number;
  img: string;
};

function Read() {
  const [data, setData] = useState<Food[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isOrdering, setIsOrdering] = useState<string | null>(null);

  async function fetchData() {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:3000/api/foods");
      // console.log(response);
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
      const result = await response.json();

      setData(result.data ?? result);
      // setData(result);
    } catch (err: any) {
      setError(err?.message || "Failed to load items");
      setData([]);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  function handleOrder(id: string, name: string) {
    setIsOrdering(id); // start loading for this item

    setTimeout(() => {
      alert(` ${name} has been ordered successfully!`);
      setIsOrdering(null); // stop loading
    }, 1500); // simulate a small delay (1.5s)
  }

  return (
    <div className="p-6 w-full h-full overflow-y-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">🍽️ Food Items</h1>

      {/* Loading state */}
      {isLoading && (
        <div className="flex items-center justify-center py-16">
          <div className="text-gray-500">Loading items...</div>
        </div>
      )}

      {/* Error state */}
      {!isLoading && error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md max-w-xl mx-auto text-center mb-6">
          <p className="font-medium">Could not load items</p>
          <p className="text-sm mt-1">{error}</p>
          <button
            onClick={fetchData}
            className="mt-3 inline-block bg-red-600 text-white px-4 py-1.5 rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      )}

      {/* No items message */}
      {!isLoading && !error && data.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 gap-4">
          <img
            src="https://img.freepik.com/premium-photo/fast-food-old-wooden-background-concept-junk-eating-top-view-flat-lay_104376-1611.jpg"
            alt="No items"
            className="w-full max-w-lg rounded-lg shadow-sm object-cover"
          />
          <h2 className="text-xl font-semibold text-gray-700">No items yet</h2>
          <p className="text-gray-500 max-w-lg text-center">
            Looks like you haven't added any food items. Click the button below
            to create your first item and it will appear here.
          </p>

          <Link
            to={"/create"}
            className="mt-3 inline-block bg-green-600 text-white px-5 py-2 rounded-md shadow-sm hover:bg-green-700"
          >
            Add First Item
          </Link>
        </div>
      )}

      {/* Items grid */}
      {!isLoading && !error && data.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {data.map((food) => (
            <div
              key={food._id}
              className="border rounded-xl shadow-md overflow-hidden hover:scale-105 transition-transform duration-300 bg-white"
            >
              <img
                src={food.img}
                alt={food.name}
                className="h-48 w-full object-cover"
              />
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
                <button
                  onClick={() => handleOrder(food._id, food.name)}
                  disabled={isOrdering === food._id}
                  className={`py-2 px-3 rounded font-bold text-sm cursor-pointer transition-all ease-in-out duration-300 ${
                    isOrdering === food._id
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  {isOrdering === food._id ? "Ordering..." : "Order"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Read;
