import { MacbookImage, PlaystationImage } from "../../assets";

const SummerBanner = () => {
  return (
    <section className="summerbanner flex flex-col lg:flex-row items-center justify-between py-8 px-4 lg:px-24 bg-black text-white rounded-md shadow-lg">
      <img
        src={PlaystationImage}
        alt="Playstation"
        className="w-full lg:w-1/3 h-auto object-contain mb-6 lg:mb-0"
      />
      <div className="text-center lg:text-left flex flex-col items-center lg:items-start">
        <h1 className="text-4xl font-bold mb-4">Big Summer Sale</h1>
        <p className="text-lg mb-6">Good taste is not expensive anywhere</p>
        <button className="bg-white text-blue-500 font-semibold px-6 py-3 rounded-full shadow-md hover:bg-gray-100 transition">
          Shop Now
        </button>
      </div>
      <img
        src={MacbookImage}
        alt="Macbook"
        className="w-full lg:w-1/3 h-auto object-contain mt-6 lg:mt-0"
      />
    </section>
  );
};

export default SummerBanner;
