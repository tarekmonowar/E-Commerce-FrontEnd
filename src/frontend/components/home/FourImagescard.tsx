import image1 from "/adds/10.webp";
import image2 from "/adds/8.png";
import image3 from "/adds/3.png";
import image4 from "/adds/1.jpg";

export default function FourImagescard() {
  return (
    <section className=" bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl py-7 xl:py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          <div className="md:w-[250] xl:w-[308px] group overflow-hidden   h-[190px] rounded-sm cursor-pointer">
            <img
              src={image1}
              className="w-full transition-all h-full group-hover:scale-105 group-hover:rotate-1"
              alt="banner"
            ></img>
          </div>
          <div className="md:w-[250] xl:w-[308px] group overflow-hidden rounded-sm  h-[190px] cursor-pointer">
            <img
              src={image2}
              className="w-full h-full transition-all group-hover:scale-105 group-hover:rotate-1"
              alt="banner"
            ></img>
          </div>
          <div className="md:w-[250] xl:w-[308px]    h-[190px] group overflow-hidden rounded-sm cursor-pointer hidden sm:block">
            <img
              src={image3}
              className="w-full h-full transition-all group-hover:scale-105 group-hover:rotate-1"
              alt="banner"
            ></img>
          </div>
          <div className="md:w-[250] xl:w-[308px]  h-[190px] group overflow-hidden rounded-sm cursor-pointer hidden md:block">
            <img
              src={image4}
              className="w-full h-full transition-all group-hover:scale-105 group-hover:rotate-1"
              alt="banner"
            ></img>
          </div>
        </div>
      </div>
    </section>
  );
}
