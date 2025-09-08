import { useGetAllProductsQuery } from "@/redux/api/productApi";
import { useState, type JSX } from "react";
import { BiSearch } from "react-icons/bi";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function SearchBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState<string>(
    searchParams.get("searchTerm") || "",
  );

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navigate = useNavigate();

  // Call RTK query (only when we have searchTerm length > 1)
  const { data, isFetching } = useGetAllProductsQuery(
    searchTerm
      ? { searchTerm, limit: 5 }
      : ({} as Record<string, string | number>),
    { skip: !searchTerm },
  );

  const searchResults = data?.data || [];

  // Handle search submission
  const handleSearchSubmit = () => {
    if (searchTerm.trim()) {
      navigate(`/all-products?searchTerm=${encodeURIComponent(searchTerm)}`);
      setIsSearchOpen(false);
    } else {
      toast.info("Please enter a search term", {
        position: "top-right",
        style: { bottom: "-54px" },
      });
    }
  };

  //clear search and remove from URL
  const handleClearSearch = () => {
    setSearchTerm("");
    searchParams.delete("searchTerm");
    setSearchParams(searchParams);
  };

  // Highlight matched text
  const highlightMatch = (text: string) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, "gi");
    return text.split(regex).map((part, i) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <span key={i} className="text-red-500 font-medium">
          {part}
        </span>
      ) : (
        part
      ),
    );
  };

  return (
    <>
      <div className="flex-1 relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsSearchOpen(true);
          }}
          placeholder="Search for items..."
          className="w-full py-2 px-4 border text-[11px] sm:text-[16px] border-gray-300  rounded-r-full rounded-l-full  md:rounded-l-none focus:outline-none focus:border-[#2C742F]"
        />
        {/* Search button */}
        <button
          onClick={handleSearchSubmit}
          className="absolute right-0 top-0 h-full px-6 bg-[#2C742F] hover:bg-[#236027] rounded-r-full  transition-colors cursor-pointer"
        >
          <BiSearch className="text-white text-xl" />
        </button>

        {/* Clear Button */}
        {searchTerm && (
          <button
            onClick={handleClearSearch}
            className="absolute right-20 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600  text-3xl cursor-pointer"
          >
            ×
          </button>
        )}

        {/* Dropdown list */}
        {isSearchOpen && searchTerm.length > 0 && (
          <div className="absolute left-0 mt-12 w-full max-w-[557px] top-0 bg-white border rounded py-2 border-gray-300 shadow-lg max-h-60 overflow-y-auto z-50">
            {isFetching && (
              <div className="p-2 text-sm text-gray-500">Loading...</div>
            )}

            {!isFetching && searchResults.length === 0 && (
              <div className="p-2 text-sm text-gray-500">No items found</div>
            )}

            {searchResults.length > 0 &&
              searchResults.map((product) => {
                let matchField: JSX.Element | null = null;

                if (
                  product.name?.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  matchField = (
                    <span className="text-xs text-gray-400">Name</span>
                  );
                } else if (
                  product.brand
                    ?.toLowerCase()
                    .includes(searchTerm.toLowerCase())
                ) {
                  matchField = (
                    <span className="text-xs text-gray-400">
                      Brand: {highlightMatch(product.brand)}
                    </span>
                  );
                } else if (
                  product.category
                    ?.toLowerCase()
                    .includes(searchTerm.toLowerCase())
                ) {
                  matchField = (
                    <span className="text-xs text-gray-400">
                      Category: {highlightMatch(product.category)}
                    </span>
                  );
                }

                return (
                  <Link
                    key={product._id}
                    to={`/product/${product._id}`}
                    className="flex justify-between items-center px-4 py-2 hover:bg-gray-100 text-sm"
                    onClick={() => setIsSearchOpen(false)}
                  >
                    {/* Always show name */}
                    <div className="font-medium">
                      {highlightMatch(product.name)}
                    </div>

                    {/* Show extra match info */}
                    {matchField}
                  </Link>
                );
              })}
          </div>
        )}
      </div>
    </>
  );
}
