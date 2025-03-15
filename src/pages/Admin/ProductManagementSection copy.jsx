import { useState, useEffect } from "react";

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
     productName: "",
     brandName: "",
     category: "",
     productImage: [],
     description: "",
     price: "",
     stock: "",
   });

  
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
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Product Price"
            className="block w-full p-2 border rounded mb-2"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Category"
            className="block w-full p-2 border rounded mb-2"
            value={newProduct.category}
            onChange={(e) =>
              setNewProduct({ ...newProduct, category: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Stock Quantity"
            className="block w-full p-2 border rounded mb-2"
            value={newProduct.stock}
            onChange={(e) =>
              setNewProduct({ ...newProduct, stock: e.target.value })
            }
          />
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md mt-4"
            onClick={handleAddProduct}
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