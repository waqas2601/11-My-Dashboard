import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function SingleUpdate() {
  const params = useParams();
  const navigate = useNavigate();

  const [foodName, setFoodName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [weight, setWeight] = React.useState("");
  const [img, setImg] = React.useState("");

  const paramID = params.id;
  // console.log(params.id);
  async function fetchData() {
    const response = await fetch(`http://localhost:3000/api/foods/${paramID}`);
    const data = await response.json();
    console.log(data);
    setFoodName(data.name);
    setPrice(data.price);
    setWeight(data.weight);
    setImg(data.img);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // preparing the api
    const apiUrl = `http://localhost:3000/api/foods/${paramID}`;

    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: foodName,
        price: Number(price),
        weight: Number(weight),
        img,
      }),
    };

    // calling the api
    const response = await fetch(apiUrl, options);
    const data = await response.json();
    // console.log(data);

    alert(data.message);
    navigate("/read");
  };

  return (
    <div className="flex items-center justify-center h-[calc(100vh-57px)]">
      <form
        onSubmit={handleSubmit}
        action=""
        className="py-10 px-5 flex flex-col gap-5 max-w-[300px] shadow-2xl"
      >
        <h1 className="text-center font-bold italic">Update Food</h1>
        <input
          type="text"
          placeholder="Enter food name"
          className="border border-gray-500 rounded-sm px-2 placeholder:text-sm "
          required
          value={foodName}
          onChange={(e) => setFoodName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter food price"
          className="border border-gray-500 rounded-sm px-2 placeholder:text-sm "
          required
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter food weight"
          className="border border-gray-500 rounded-sm px-2 placeholder:text-sm "
          required
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter food image"
          className="border border-gray-500 rounded-sm px-2 placeholder:text-sm "
          required
          value={img}
          onChange={(e) => setImg(e.target.value)}
        />
        <button
          type="submit"
          className="py-2 px-3 rounded bg-blue-500 text-white font-bold text-sm cursor-pointer hover:bg-transparent hover:text-blue-500 hover:border hover:border-blue-500 border border-transparent transition-all ease-in-out duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default SingleUpdate;
