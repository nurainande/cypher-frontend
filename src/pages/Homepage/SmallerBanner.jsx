import {
  EarjamImage,
  MacbookImage,
  PlaystationImage,
  VisionproImage,
} from "../../assets";

const SmallerBanner = () => {
  return (
    <section className="smaller-banner bg-gray-100 py-12">
      {/* First Section with Three Grid Items */}
      <section className="small-b-section container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* First Grid Item */}
          <div className="small-3grid bg-white p-6 rounded-lg shadow-md">
            <article className="small-b-image mb-4">
              <img
                src={PlaystationImage}
                alt="Playstation"
                className="w-full h-auto object-cover rounded-lg"
              />
            </article>
            <article className="small-b-text">
              <h1 className="text-xl font-bold mb-2">Playstation 5</h1>
              <p className="text-gray-700">
                A new 15 inch Macbook makes the experience really worth it and
                worthwhile.
              </p>
            </article>
          </div>

          {/* Second Grid Item */}
          <div className="small-3grid bg-white p-6 rounded-lg shadow-md">
            <article className="small-b-image mb-4">
              <img
                src={EarjamImage}
                alt="Macbook"
                className="w-full h-auto object-cover rounded-lg"
              />
            </article>
            <article className="small-b-text">
              <h1 className="text-xl font-bold mb-2">Apple Airpods Max</h1>
              <p className="text-gray-700">
                A new 15 inch Macbook makes the experience really worth it and
                worthwhile.
              </p>
            </article>
          </div>

          {/* Third Grid Item */}
          <div className="small-3grid bg-white p-6 rounded-lg shadow-md">
            <article className="small-b-image mb-4">
              <img
                src={VisionproImage}
                alt="Macbook"
                className="w-full h-auto object-cover rounded-lg"
              />
            </article>
            <article className="small-b-text">
              <h1 className="text-xl font-bold mb-2">Apple Vision Pro</h1>
              <p className="text-gray-700">
                A new 15 inch Macbook makes the experience really worth it and
                worthwhile.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Second Section with Two Columns */}
      <section className="small-b-section container mx-auto px-6 md:px-12 mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Text Column */}
        <article className="small-b-text flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-4">Macbook Air</h1>
          <p className="text-gray-700 mb-4">
            A new 15 inch Macbook makes the experience really worth it and
            worthwhile.
          </p>
          <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500">
            Shop Now
          </button>
        </article>

        {/* Image Column */}
        <article className="small-b-image">
          <img
            src={MacbookImage}
            alt="Macbook"
            className="w-full h-auto object-cover rounded-lg"
          />
        </article>
      </section>
    </section>
  );
};

export default SmallerBanner;
