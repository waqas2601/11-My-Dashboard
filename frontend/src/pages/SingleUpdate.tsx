import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function SingleUpdate() {
  const params = useParams();
  const navigate = useNavigate();
  const paramID = params.id;

  const [foodName, setFoodName] = useState("");
  const [price, setPrice] = useState("");
  const [weight, setWeight] = useState("");
  const [img, setImg] = useState("");

  const [errors, setErrors] = useState({
    foodName: "",
    price: "",
    weight: "",
    img: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch existing food details
  async function fetchData() {
    try {
      const response = await fetch(
        `http://localhost:3000/api/foods/${paramID}`
      );
      const data = await response.json();
      setFoodName(data.name || "");
      setPrice(data.price?.toString() || "");
      setWeight(data.weight?.toString() || "");
      setImg(data.img || "");
    } catch (err) {
      console.error("Error fetching food:", err);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  // Validate input fields
  const validateForm = () => {
    let valid = true;
    const newErrors = { foodName: "", price: "", weight: "", img: "" };

    if (foodName.trim().length < 5 || foodName.trim().length > 30) {
      newErrors.foodName = "Food name must be between 5 and 30 characters.";
      valid = false;
    }

    if (!/^\d+(\.\d+)?$/.test(price)) {
      newErrors.price = "Price must be a valid number.";
      valid = false;
    }

    if (!/^\d+(\.\d+)?$/.test(weight)) {
      newErrors.weight = "Weight must be a valid number.";
      valid = false;
    }

    const urlRegex = /^(https?:\/\/[^\s$.?#].[^\s]*)$/i;
    if (!urlRegex.test(img)) {
      newErrors.img = "Please enter a valid image URL.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Submit form handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const apiUrl = `http://localhost:3000/api/foods/${paramID}`;
      const options = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: foodName,
          price: Number(price),
          weight: Number(weight),
          img,
        }),
      };

      const response = await fetch(apiUrl, options);
      const data = await response.json();

      alert(data.message);
      navigate("/read");
    } catch (err) {
      console.error("Error updating food:", err);
      alert("Failed to update item.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-[calc(100vh-57px)]">
      <form
        onSubmit={handleSubmit}
        className="py-10 px-5 flex flex-col gap-5 max-w-[320px] shadow-2xl rounded-lg bg-white"
      >
        <h1 className="text-center font-bold italic text-lg">Update Food</h1>

        {/* Food Name */}
        <div>
          <input
            type="text"
            placeholder="Enter food name"
            className="w-full border border-gray-400 rounded-sm px-2 py-1 placeholder:text-sm"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
          />
          {errors.foodName && (
            <p className="text-red-500 text-xs mt-1">{errors.foodName}</p>
          )}
        </div>

        {/* Price */}
        <div>
          <input
            type="text"
            placeholder="Enter food price"
            className="w-full border border-gray-400 rounded-sm px-2 py-1 placeholder:text-sm"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          {errors.price && (
            <p className="text-red-500 text-xs mt-1">{errors.price}</p>
          )}
        </div>

        {/* Weight */}
        <div>
          <input
            type="text"
            placeholder="Enter food weight"
            className="w-full border border-gray-400 rounded-sm px-2 py-1 placeholder:text-sm"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
          {errors.weight && (
            <p className="text-red-500 text-xs mt-1">{errors.weight}</p>
          )}
        </div>

        {/* Image URL */}
        <div>
          <input
            type="text"
            placeholder="Enter image URL"
            className="w-full border border-gray-400 rounded-sm px-2 py-1 placeholder:text-sm"
            value={img}
            onChange={(e) => setImg(e.target.value)}
          />
          {errors.img && (
            <p className="text-red-500 text-xs mt-1">{errors.img}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`py-2 px-3 rounded font-bold text-sm transition-all ease-in-out duration-300 ${
            isSubmitting
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-transparent hover:text-blue-500 hover:border hover:border-blue-500 border border-transparent"
          }`}
        >
          {isSubmitting ? "Updating..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default SingleUpdate;
