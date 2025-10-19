import React from "react";

function Create() {
  const [foodName, setFoodName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [weight, setWeight] = React.useState("");
  const [img, setImg] = React.useState("");

  // Data to send
  // {
  //   "name" : "Meat",
  //   "weight" : 900,
  //   "price" : 500
  // }

  // const apiUrl = "http://localhost:3000/api/foods";
  // const options = {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     name: foodName,
  //     weight: weight,
  //     price: price,
  //   }),
  // };

  // const response = await fetch(apiUrl, options);
  // const data = await response.json();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // preparing the api
    const apiUrl = "http://localhost:3000/api/foods/";

    const options = {
      method: "POST",
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
    setFoodName("");
    setPrice("");
    setWeight("");
    setImg("");
    alert(data.message);
  };

  return (
    <div className="flex items-center justify-center h-[calc(100vh-57px)]">
      <form
        onSubmit={handleSubmit}
        action=""
        className="py-10 px-5 flex flex-col gap-5 max-w-[300px] shadow-2xl"
      >
        <h1 className="text-center font-bold italic">Create Food</h1>
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

export default Create;
