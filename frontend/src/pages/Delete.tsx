import { useEffect, useState } from "react";

type Food = {
  _id: string;
  name: string;
  price: number;
  weight: number;
  img: string;
};

function Delete() {
  const [data, setData] = useState<Food[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // initial fetch loading
  const [error, setError] = useState<string | null>(null); // fetch error
  const [deletingId, setDeletingId] = useState<string | null>(null); // id currently deleting

  // 1) fetch items from API and handle loading/error
  async function fetchData() {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:3000/api/foods");
      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      const result = await response.json();
      // if API returns { data: [...] } use result.data
      setData(result);
    } catch (err: any) {
      setError(err?.message || "Failed to load items.");
      setData([]); // ensure data is an array
    } finally {
      setIsLoading(false);
    }
  }

  // 2) delete single item with UI feedback + error handling
  async function deleteItem(id: string) {
    // optional: ask for user confirmation before deleting
    const confirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (!confirmed) return;

    setDeletingId(id); // show deleting state for this item
    try {
      const apiUrl = `http://localhost:3000/api/foods/${id}`;
      const options = { method: "DELETE" };
      const response = await fetch(apiUrl, options);
      if (!response.ok) {
        // try to read server message if available
        const errBody = await response.text().catch(() => null);
        throw new Error(`Delete failed: ${response.status} ${errBody ?? ""}`);
      }
      const result = await response.json();
      // show simple feedback (you can replace with a toast)
      alert(result.message || "Item deleted.");

      // Remove deleted item from state (no full refetch needed)
      setData((prev) => prev.filter((item) => item._id !== id));
    } catch (err: any) {
      alert(err?.message || "Failed to delete item.");
    } finally {
      setDeletingId(null); // stop deleting state
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6 w-full h-full overflow-y-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">
        🗑️ Delete Food Items
      </h1>

      {/* 3) Loading state for initial fetch */}
      {isLoading && (
        <div className="flex items-center justify-center py-16">
          <div className="text-gray-500">Loading items...</div>
        </div>
      )}

      {/* 4) Error state for initial fetch */}
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

      {/* 5) No items message */}
      {!isLoading && !error && data.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 gap-4">
          <h2 className="text-xl font-semibold text-gray-700">
            No items to delete
          </h2>
          <p className="text-gray-500 max-w-lg text-center">
            There are currently no food items. Add some items first, then come
            back to delete them.
          </p>
        </div>
      )}

      {/* 6) Items grid */}
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
                  onClick={() => deleteItem(food._id)}
                  disabled={deletingId === food._id}
                  className={`mt-3 w-full text-white py-1.5 rounded transition-all cursor-pointer ${
                    deletingId === food._id
                      ? "bg-red-400 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-600 "
                  }`}
                >
                  {deletingId === food._id ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Delete;
