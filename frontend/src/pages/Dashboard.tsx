const Dashboard = () => {
  return (
    <div className="p-10 flex flex-col lg:flex-row items-center gap-10">
      <img
        src="https://img.freepik.com/free-photo/top-view-fast-food-mix-mozzarella-sticks-club-sandwich-hamburger-mushroom-pizza-caesar-shrimp-salad-french-fries-ketchup-mayo-cheese-sauces-table_141793-3998.jpg?semt=ais_hybrid&w=740&q=80"
        alt="Dashboard Preview"
        className="w-full max-w-md rounded-xl shadow-md"
      />
      <div>
        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          Food Management Dashboard
        </h1>
        <p className="text-gray-600 leading-relaxed">
          This dashboard allows you to manage all your food items efficiently.
          You can add new dishes with their name, price, weight, and image, view
          all items on the Read page, and make updates or deletions anytime.
        </p>
        <p className="text-gray-600 mt-3">
          It’s built using <span className="font-semibold">React.js</span> and
          styled with <span className="font-semibold">Tailwind CSS</span> for a
          fast and responsive experience.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
