import AddsCard from "../components/home/AddsCard";
import Blogs from "../components/home/Blogs";
import CategorySection from "../components/home/CategorySection";
import FourImagescard from "../components/home/FourImagescard";
import HeroBanner from "../components/home/heroBanner";
import BeautyProducts from "../components/home/products/BeautyProducts";
import FashionProducts from "../components/home/products/FashionProducts";
import FeaturesProducts from "../components/home/products/FeaturesProducts";
import GroceriesProducts from "../components/home/products/GroceriesProducts";
import JewelleryProducts from "../components/home/products/JewelleryProducts";
import LatestProducts from "../components/home/products/LatestProducts";
import PopularProducts from "../components/home/products/Popularproducts";

export default function Home() {
  return (
    <section className=" bg-gradient-to-b from-neutral-50 to-white pt-[40px] md:pt-0 min-h-screen">
      <div className="container mx-auto px-4 max-w-7xl  pb-5 md:py-5 xl:py-12 ">
        <HeroBanner />
        <CategorySection />
      </div>
      <PopularProducts />
      <FourImagescard />
      <LatestProducts />
      <FeaturesProducts />
      <AddsCard />
      <GroceriesProducts />
      <FashionProducts />
      <BeautyProducts />
      <JewelleryProducts />
      <Blogs />
    </section>
  );
}
