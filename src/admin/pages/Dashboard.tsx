import { SquarePen, Star } from "lucide-react";

//components import
import { Footer } from "@/admin/layout/footer";
import { topProducts } from "../components/constants";
import FourItems from "../components/FourItems";
import Overview from "../components/Overview";
// import ProjectDetails from "./components/ProjectDetails";

const DashboardPage = () => {
  // //for toastify message

  // const toastId = "contact-form-toast"; // unique id
  // const location = useLocation();

  // useEffect(() => {
  //     if (!toast.isActive(toastId)) {
  //         toast.info("Open for testing; in a real project, it will be protected for admins/owners only.", {
  //             toastId: toastId,
  //             autoClose: 15000,
  //             hideProgressBar: false,
  //             closeOnClick: true,
  //             pauseOnHover: true,
  //             draggable: true,
  //             theme: "colored",
  //         });
  //     }
  //     // Cleanup: Dismiss toast when route changes
  //     return () => {
  //         toast.dismiss(toastId);
  //     };
  // }, [location]);

  //for project details components
  // const [showDetails, setShowDetails] = useState(false);

  // useEffect(() => {
  //     const hasClosed = sessionStorage.getItem("hasClosedProjectDetails");

  //     if (!hasClosed) {
  //         setShowDetails(true);
  //     }
  // }, []);

  // const handleCloseDetails = () => {
  //     setShowDetails(false);
  //     sessionStorage.setItem("hasClosedProjectDetails", "true");
  // };

  return (
    <div className="scroll-hidden flex flex-col gap-y-4">
      {/* {showDetails && <ProjectDetails onClose={handleCloseDetails} />} */}
      <h1 className="title">Dashboard</h1>

      {/* top 4 cards section */}

      <FourItems />

      {/* overview and recent sales section */}

      <Overview />
      <div className="card">
        <div className="card-header">
          <p className="card-title">Top Products</p>
        </div>
        <div className="card-body p-0">
          <div className="relative h-[500px] w-full flex-shrink-0 overflow-auto rounded-none [scrollbar-width:_thin]">
            <table className="table2">
              <thead className="table-header">
                <tr className="table-row">
                  <th className="table-head">#</th>
                  <th className="table-head">Product</th>
                  <th className="table-head">Sales</th>
                  <th className="table-head">Status</th>
                  <th className="table-head">Rating</th>
                  <th className="table-head">Actions</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {topProducts.map((product, index) => (
                  <tr key={index} className="table-row">
                    <td className="table-cell"># {index + 1}</td>
                    <td className="table-cell">
                      <div className="flex w-max gap-x-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="size-14 rounded-lg object-cover"
                        />
                        <div className="flex flex-col">
                          <p>{product.name}</p>
                          <p className="font-normal text-slate-600 dark:text-slate-400">
                            {product.description
                              .split(" ")
                              .slice(0, 4)
                              .join(" ")}
                            {product.description.split(" ").length > 4 && "..."}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="table-cell">${product.price}</td>
                    <td className="table-cell">
                      {product.stock > 0 ? (
                        `In Stock (${product.stock})`
                      ) : (
                        <span className="text-red-500 font-semibold">
                          Out of Stock
                        </span>
                      )}
                    </td>
                    <td className="table-cell">
                      <div className="flex items-center gap-x-2">
                        <Star
                          size={18}
                          className="fill-yellow-600 stroke-yellow-600"
                        />
                        {product.rating}
                      </div>
                    </td>
                    <td className="table-cell">
                      <div className="flex items-center justify-center pr-5 ">
                        <button className="text-blue-600 cursor-pointer">
                          <SquarePen size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardPage;
