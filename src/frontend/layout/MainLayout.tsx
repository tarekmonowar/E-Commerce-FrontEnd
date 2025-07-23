import Footer from "./Footer";
import Navbar from "./Navbar";
import TopFooter from "./TopFooter";

//TS  types setup
type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <main className="min-h-screen flex flex-col font-custom bg-white">
      <Navbar />
      <section className="flex-grow">{children}</section>
      <TopFooter />
      <Footer />
    </main>
  );
};

export default MainLayout;
