import { useState, useEffect } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useAppContext } from "../../Context/ContextProvider";

const cloudinaryUrl='https://api.cloudinary.com/v1_1/dtbmyj4ng/image/upload';

// Sample products data (this would typically come from a backend)
const initialProducts = [
  {
    id: 1,
    name: "Smartphone XYZ",
    price: 599,
    category: "Mobiles",
    stock: 12,
  },
  {
    id: 2,
    name: "Laptop ABC",
    price: 999,
    category: "Laptops",
    stock: 5,
  },
  {
    id: 3,
    name: "Wireless Earphones",
    price: 149,
    category: "Earphones",
    stock: 23,
  },
];

const ProductManagementSection = () => {
  const [products, setProducts] = useState([]);
 
  //  const [newData, setNewData] = useState({
  //   name: "",
  //   price: "",
  //   category: "",
  //   stock: "",
  // });

   const [newProduct, setNewProduct] = useState({
     productName: "Iphone",
     brandName: "",
     category: "",
    //  productImage: [],
    productImage:"",
     description: "",
     price: "",
     stock: "",
   });

   const handleInputChange = (e) => {
     // setNewProduct({...newProduct, [e.target.name]: e.target.value });
     const { name, value } = e.target;
    //  setNewProduct({...newProduct, [name]: value });
     setNewProduct((prev)=>{
      return { ...prev, [name]: value };
     });
   };

   const handleUploadProduct = async(e) => {
     const file = e.target.files[0];
     console.log(file)
     console.log('about to cloudinary')
     const fileData = new FormData();
     fileData.append("file", file);
     const res = await fetch(`${cloudinaryUrl}/upload`, {
       method: "POST",
       body: fileData,
     });
     const imageUrlData = await res.json();
     console.log(imageUrlData)
     
    //  setNewProduct((prev)=>{
    //   return {...prev, productImage: imageUrlData.secure_url };
    //  });
   };

  
  const [isAdding, setIsAdding] = useState(false);

  // Fetch products from the backend or set initial data
  useEffect(() => {
    // Ideally, you'd fetch products from an API here
    // Example: fetch("/api/products").then(res => res.json()).then(data => setProducts(data));
    setProducts(initialProducts);
  }, []);

  // Handle deleting a product
  const handleDelete = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
    // Make DELETE request to backend here
  };

  // Handle adding a new product------For ordinary  statc product only available to be stored in the frontend
  const handleAddProduct = () => {
    if (
      newProduct.name &&
      newProduct.price &&
      newProduct.category &&
      newProduct.stock
    ) {
      const newProductData = {
        id: products.length + 1,
        name: newProduct.name,
        price: Number(newProduct.price),
        category: newProduct.category,
        stock: Number(newProduct.stock),
      };
      setProducts([...products, newProductData]);
      setNewProduct({ name: "", price: "", category: "", stock: "" });
      setIsAdding(false);
    }
  };

  const handleSubmit = async(e)=>{
    e.preventDefault();
     console.log(newProduct)
     const newProd = {...newProduct,price: Number(newProduct.price), stock: Number(newProduct.stock)}
     console.log(newProd)

     try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/product`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProd),
      });
      const data = await res.json();
      console.log(data)
     } catch (error) {
      console.log(error)
     }
  }
  return (
    <section className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Manage Products</h1>

      {/* Add Product Button */}
      <div className="mb-6">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={() => setIsAdding(true)}
        >
          Add New Product
        </button>
      </div>

      {/* Add New Product Form */}
      {isAdding && (
        <div className="mb-6 bg-gray-100 p-4 rounded-md shadow-md">
          <h2 className="text-xl font-medium mb-4">Add Product</h2>
          <input
            type="text"
            placeholder="Product Name"
            className="block w-full p-2 border rounded mb-2"
            name="productName"
            value={newProduct.productName}
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="Brand Name"
            className="block w-full p-2 border rounded mb-2"
            name="brandName"
            value={newProduct.brandName}
            onChange={handleInputChange}
          />

          <input
            type="text"
            placeholder="Category"
            className="block w-full p-2 border rounded mb-2"
            name="category"
            value={newProduct.category}
            onChange={handleInputChange}
          />
          {/* <input
            type="file"
            placeholder="Product Image"
            className="block w-full p-2 border rounded mb-2"
            onChange={handleInputChange}
          /> */}

          {/* ========================================= */}

          {/* <label htmlFor="uploadImageInput">
            <div className="p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer">
              <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
                <span className="text-4xl">
                  <FaCloudUploadAlt />
                </span>
                <p className="text-sm">Upload Product Image</p>
                <input
                  type="file"
                  id="uploadImageInput"
                  className="hidden"
                  onChange={handleUploadProduct}
                />
              </div>
            </div>
          </label> */}
          <input
            type="text"
            placeholder="Product image"
            className="block w-full p-2 border rounded mb-2"
            name="productImage"
            value={newProduct.productImage}
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="Product Description"
            className="block w-full p-2 border rounded mb-2"
            name="description"
            value={newProduct.description}
            onChange={handleInputChange}
          />
          <input
            type="number"
            placeholder="Product Price"
            className="block w-full p-2 border rounded mb-2"
            name="price"
            value={newProduct.price}
            onChange={handleInputChange}
          />
          <input
            type="number"
            placeholder="Stock Quantity"
            className="block w-full p-2 border rounded mb-2"
            name="stock"
            value={newProduct.stock}
            onChange={handleInputChange}
          />
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md mt-4"
            // onClick={handleAddProduct}
            onClick={handleSubmit}
          >
            Save Product
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md mt-4 ml-4"
            onClick={() => setIsAdding(false)}
          >
            Cancel
          </button>
        </div>
      )}

      {/* Products Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">
                Product Name
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">
                Price ($)
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                  {product.name}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                  {product.price}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                  {product.category}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                  {product.stock}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ProductManagementSection;