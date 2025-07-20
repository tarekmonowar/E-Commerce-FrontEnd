const categories = [
  {
    name: "Fashion",
    icon: "/icons/seasonal.png",
    color: "bg-pink-100 text-pink-600",
  },
  {
    name: "Electronics",
    icon: "/icons/special.png",
    color: "bg-purple-100 text-purple-600",
  },
  {
    name: "Bags",
    icon: "/icons/fresh.png",
    color: "bg-green-100 text-green-600",
  },
  {
    name: "Footwear",
    icon: "/icons/seasonal.png",
    color: "bg-blue-100 text-blue-600",
  },
  {
    name: "Groceries",
    icon: "/icons/bakery.png",
    color: "bg-orange-100 text-orange-600",
  },
  {
    name: "Beauty",
    icon: "/icons/fresh.png",
    color: "bg-pink-100 text-pink-600",
  },
  {
    name: "Wellness",
    icon: "/icons/special.png",
    color: "bg-green-100 text-green-600",
  },
  {
    name: "Jewellery",
    icon: "/icons/seasonal.png",
    color: "bg-yellow-100 text-yellow-600",
  },
];

const CategorySection = () => {
  return (
    <div className="w-full bg-white mt-10 xl:mt-15 py-4 rounded-md">
      <div className="container mx-auto">
        <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
          {categories.map((category) => {
            return (
              <button
                key={category.name}
                className={`flex flex-col group items-center p-4 rounded-sm transition-all duration-300  cursor-pointer bg-white [box-shadow:0px_2px_8px_0px_rgba(99,99,99,0.2)]`}
              >
                <div className="w-14 h-14 md:w-16 md:h-16 mb-4 transform transition-transform duration-300 group-hover:scale-110">
                  <img
                    src={category.icon}
                    alt={category.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-sm font-medium text-center">
                  {category.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
