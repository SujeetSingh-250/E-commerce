
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
// import axios from '../Utils/Axios'
import Loading from './Loading'
import { ProductContext } from '../Utils/Context';

const Detail = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useContext(ProductContext);
  const [product, setProduct] = useState(null);
  const {id} = useParams();
  // console.log(id);


  // const getsingleProduct = async () => {
   
  //   try {
  //     const {data} = await axios.get(`/products/${id}`)
  //     setProduct(data);
      
  //   } catch (error) {
  //     console.log(error);
      
  //   }
  // };

  useEffect(() => {
    // getsingleProduct() 
    if(!product){
      setProduct(products.filter((p) => p.id == id)[0]);
    }      
  }, []);

  const deleteProductHandler = (id) => {
    const newProducts = products.filter((p) => p.id != id);
    setProducts(newProducts);
    localStorage.setItem("products", JSON.stringify(newProducts));
    // setProduct(null);
    navigate("/"); // Reset product state after deletion
    // console.log(id);
  }

  return product ? (
    <div className='w-[70%] flex justify-between items-center h-full bg-red-10 m-auto p-[10%]'>
      <img className="h-[90%] w-[40%] object-contain" src={`${product.image}`} alt="" />
      <div className='content bg-red-10 w-[50%] mt-10'>
        <h1 className='text-4xl'>{product.title}</h1>
        <h3 className='text-zinc-500 my-5'>{product.category}</h3>
        <h2 className='text-red-400 font-bold mb-3'>{product.price}</h2>
        <p className='mb-[5%]'>{product.description}</p>

        <Link to={`/edit/${product.id}`} 
        className='mr-5 py-1 px-5 border rounded border-blue-200 text-blue-300'>
          Edit
        </Link>

        <button onClick={() => deleteProductHandler(product.id)}
        className='py-1 px-5 border rounded border-red-200 text-red-300'>
          Delete
        </button>
      </div>
    </div>
  ) : (
    <Loading/>
  )
}

export default Detail;
