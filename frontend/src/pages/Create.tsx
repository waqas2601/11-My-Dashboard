import React from "react";

function Create() {
  const [foodName, setFoodName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [weight, setWeight] = React.useState("");
  const [img, setImg] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [errors, setErrors] = React.useState({
    foodName: "",
    price: "",
    weight: "",
    img: "",
  });

  function validateInputs() {
    const newErrors = { foodName: "", price: "", weight: "", img: "" };

    if (foodName.length < 5 || foodName.length > 30) {
      newErrors.foodName = "Food name must be between 5 and 30 characters.";
    }
    if (!/^[0-9]+(\.[0-9]+)?$/.test(price)) {
      newErrors.price = "Price must be a valid number.";
    }
    if (!/^[0-9]+(\.[0-9]+)?$/.test(weight)) {
      newErrors.weight = "Weight must be a valid number.";
    }
    if (
      !/^https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp)(\?.*)?$/i.test(img) &&
      !/^https?:\/\/.*(googleusercontent|gstatic|unsplash|pixabay|cdn)/i.test(
        img
      )
    ) {
      newErrors.img = "Please enter a valid image URL.";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((err) => err === "");
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = validateInputs();
    if (!isValid) return;

    setIsLoading(true);

    try {
      const apiUrl = "http://localhost:3000/api/foods/";
      const options = {
        method: "POST",
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
      setFoodName("");
      setPrice("");
      setWeight("");
      setImg("");
      setErrors({ foodName: "", price: "", weight: "", img: "" });
    } catch (error) {
      alert("Something went wrong while submitting. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-[calc(100vh-57px)]">
      <form
        onSubmit={handleSubmit}
        className="py-10 px-5 flex flex-col gap-5 max-w-[300px] shadow-2xl"
      >
        <h1 className="text-center font-bold italic">Create Food</h1>

        {/* Food Name */}
        <div>
          <input
            type="text"
            placeholder="Enter food name"
            className={`border rounded-sm px-2 placeholder:text-sm w-full ${
              errors.foodName ? "border-red-500" : "border-gray-500"
            }`}
            required
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
            className={`border rounded-sm px-2 placeholder:text-sm w-full ${
              errors.price ? "border-red-500" : "border-gray-500"
            }`}
            required
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
            className={`border rounded-sm px-2 placeholder:text-sm w-full ${
              errors.weight ? "border-red-500" : "border-gray-500"
            }`}
            required
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
          {errors.weight && (
            <p className="text-red-500 text-xs mt-1">{errors.weight}</p>
          )}
        </div>

        {/* Image */}
        <div>
          <input
            type="text"
            placeholder="Enter food image (URL)"
            className={`border rounded-sm px-2 placeholder:text-sm w-full ${
              errors.img ? "border-red-500" : "border-gray-500"
            }`}
            required
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
          disabled={isLoading}
          className={`py-2 px-3 rounded font-bold text-sm cursor-pointer transition-all ease-in-out duration-300 ${
            isLoading
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-transparent hover:text-blue-500 hover:border hover:border-blue-500 border border-transparent"
          }`}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default Create;
