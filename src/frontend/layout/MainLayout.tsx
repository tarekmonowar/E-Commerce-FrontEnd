import TopFooter from "./TopFooter";
import Footer from "./Footer";
import Navbar from "./Navbar";
import UtilityNav from "./UtilityNav";

//TS  types setup
type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <main className="min-h-screen flex flex-col font-custom bg-white">
      <Navbar />
      <UtilityNav />
      <section className="flex-grow">{children}</section>
      <TopFooter />
      <Footer />
    </main>
  );
};

export default MainLayout;
