import Banner from "../Homepage/Banner";
import BrowseByCategory from "../Homepage/BrowseByCategory";
import Products from "../Homepage/Products";
import SmallerBanner from "../Homepage/SmallerBanner";
import SummerBanner from "../Homepage/SummerBanner";

const HomePage = () => {
  return (
    <main>
      <Banner />
      <SmallerBanner />
      <BrowseByCategory />
      <Products />
      <SummerBanner />
    </main>
  );
};

export default HomePage;
