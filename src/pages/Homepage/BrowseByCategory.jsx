import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoIosPhonePortrait } from "react-icons/io";
import { IoWatchSharp } from "react-icons/io5";
import { CiCamera } from "react-icons/ci";
import { ImHeadphones } from "react-icons/im";
import { MdComputer } from "react-icons/md";
import { LuGamepad2 } from "react-icons/lu";

const categories = [
  { id: 1, name: "Phone", icon: <IoIosPhonePortrait /> },
  { id: 2, name: "Smart Watches", icon: <IoWatchSharp /> },
  { id: 3, name: "Cameras", icon: <CiCamera /> },
  { id: 4, name: "Headphone", icon: <ImHeadphones /> },
  { id: 5, name: "Computers", icon: <MdComputer /> },
  { id: 6, name: "Gaming", icon: <LuGamepad2 /> },
];

const BrowseByCategory = () => {
  return (
    <section className="py-6 md:px-12 bg-darkWhite">
      <article className="head flex items-center justify-between px-6 md:px-12">
        <h1 className="text-xl font-bold">Browse by Category</h1>
        <div className="swipe-icons flex items-center space-x-2 text-gray-600">
          <IoIosArrowBack size={24} />
          <IoIosArrowForward size={24} />
        </div>
      </article>
      {/* Categories */}
      <ul className="categories flex gap-11 overflow-x-auto space-x-4 px-6 md:px-12 py-4">
        {categories.map((category) => (
          <li
            key={category.id}
            className="flex-shrink-0 flex items-center justify-center text-center bg-white p-2 rounded-lg shadow-md h-24 w-24"
          >
            <a href="#" className="flex flex-col items-center">
              <div className="icon text-3xl mb-1">{category.icon}</div>
              <h2 className="text-sm font-medium">{category.name}</h2>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default BrowseByCategory;
