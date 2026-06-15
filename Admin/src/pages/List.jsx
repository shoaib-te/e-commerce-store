import axios from 'axios';
import React from 'react'
import { toast } from 'react-toastify';

function List() {
  const [products, setProducts] = React.useState([]);
  const [images, setImages] = React.useState([]);
 console.log(products);
 console.log(images);
  const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/product/list', {
          headers: {
            token: localStorage.getItem('token') || ''
          },
        });
        if (response.data.success) {
          setProducts(response.data.product);
          setImages(response.data.image);
          toast.success('Products fetched successfully');
        } else {
          toast.error('Failed to fetch products');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Failed to fetch products');
      }
    };
    const deleteProduct = async (id) => {
      try {
        const response = await axios.post(`http://localhost:4000/api/product/remove`,{id}, {
          headers: {
            token: localStorage.getItem('token') || ''
          },
        });
        if (response.data.success) {
          toast.success('Product deleted successfully');
          // Refresh the product list after deletion
          fetchProducts();
        } else {
          toast.error('Failed to delete product');
        }
      } catch (error) {
        console.error('Error deleting product:', error);
        toast.error('Failed to delete product');
      }
    };

  React.useEffect(() => {
    // Fetch products from the backend API 

    fetchProducts();
  }, []);

  return (
    <div>
      
  <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
  <table className="w-full text-left border-collapse">
    {/* Table Header */}
    <thead className="bg-gray-50/50 border-b border-gray-200">
      <tr>
        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Product</th>
        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Description</th>
        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Sizes</th>
        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Price</th>
        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
      </tr>
    </thead>

    {/* Table Body */}
    <tbody className="divide-y divide-gray-100">
      {products.map((item) => (
        <tr key={item._id} className="hover:bg-gray-50 transition-colors group">
          {/* Product Image & Name */}
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center gap-4">
              <img 
                src={item.image[0]} 
                className="w-12 h-12 rounded-lg object-cover border border-gray-100" 
                alt={item.name} 
              />
              <span className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                {item.name}
              </span>
            </div>
          </td>

          {/* Description */}
          <td className="px-6 py-4 max-w-xs">
            <p className="text-sm text-gray-500 truncate" title={item.description}>
              {item.description}
            </p>
          </td>

          {/* Sizes (Badges) */}
          <td className="px-6 py-4 text-center">
            <div className="flex justify-center gap-1.5">
             
                <span  className="px-2 py-0.5 text-[10px] font-bold bg-gray-100 text-gray-600 rounded border border-gray-200">
                  {item.sizes.join(', ')}
                </span>
            
            </div>
          </td>

          {/* Price */}
          <td className="px-6 py-4 text-right">
            <span className="text-sm font-bold text-gray-900">${item.price}</span>
          </td>

          {/* Actions */}
          <td className="px-6 py-4 text-right">
            <div className="flex justify-end gap-3">
            
              <button onClick={()=>deleteProduct(item._id)} className="text-xs font-semibold text-red-600 hover:text-red-900 bg-red-50 px-3 py-1.5 rounded-md transition-colors">
                Delete
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>



      
    </div>
  )
}

export default List
