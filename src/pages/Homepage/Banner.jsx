import { IphoneImage } from "../../assets";
const Banner = () => {
  return (
    <section className="banner bg-black text-white px-6 md:px-24 py-6 flex flex-col md:flex-row items-center justify-between md:h-[80vh] overflow-hidden">
      <div className="banner-text text-center md:text-left mb-4 md:mb-0 mt-44 md:mt-0">
        <h4 className="text-xl md:text-2xl font-semibold mb-2">Pro. Beyond</h4>
        <h1 className="text-4xl md:text-6xl font-bold mb-4">iPhone 14 Pro</h1>
        <p className="text-lg md:text-xl mb-6">
          Created to change everything for the better. For everyone.
        </p>
        <button
          href="#"
          className="bg-gray-800 hover:bg-gray-700 text-white py-3 px-8 rounded-md text-lg"
        >
          Shop
        </button>
      </div>
      <div className="banner-image flex justify-center md:justify-end overflow-hidden">
        <img
          src={IphoneImage}
          alt="iPhone 14 Pro"
          className="w-full max-w-xs md:max-w-md"
        />
      </div>
    </section>
  );
};

export default Banner;
