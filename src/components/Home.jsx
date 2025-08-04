import { useContext, useEffect, useState } from 'react'
import Nav from './Nav'
import { Link, useLocation } from 'react-router-dom'
import { ProductContext } from '../Utils/Context'
import axios from '../Utils/Axios'
import Loading from "./Loading";



const Home = () => {

  const [products] = useContext(ProductContext);

  const { search } = useLocation();
  const category = decodeURIComponent(search.split('=')[1]);

  const [filteredProducts, setFilteredProducts] = useState(null);

  const getproductscategory = async () => {
    try {
      const { data } = await axios.get(`/products/category/${category}`);
      setFilteredProducts(data);
      
    } catch (error) {
      console.log(error);
      
    }
  };
  
  useEffect(() =>{
    if(!filteredProducts || category == "undefined") 
      setFilteredProducts(products);
    if (category != "undefined") {
      // getproductscategory();
      setFilteredProducts(products.filter((p) => p.category == category));
    }
  }, [category , products]);

  // console.log(filteredProducts);
  
  return products ? (
    <>
      <div className='w-[20%] h-full bg-zinc-50'>
        <Nav />
      </div>
      <div className='h-full w-[80%] bg-green-10 pt-[5%] flex flex-wrap overflow-x-hidden  overflow-y-auto '>
        
        {filteredProducts && filteredProducts.map((p, i) =>(
            <Link key={p.id}
            to={`/details/${p.id}`} className='ml-10 mb-3 card p-3 border shadow rounded w-[18%] h-[30vh] flex justify-center items-center flex-col'>
          <div 
            className='hover:scale-110 mb-3 w-full h-[80%] bg-contain bg-no-repeat bg-center'
            style={{
              backgroundImage:`url(${p.image})`,
              }}
            ></div>
            <h1 className='hover:text-blue-300'>{p.title}</h1>
          </Link>
        ))}
      </div>
    </>
  ) : (
    <Loading />
  )
}

export default Home
