import React, { useContext } from 'react'
import { ProductContext } from '../Utils/Context';
import { Link } from 'react-router-dom';

const Nav = () => {
  const [products, setProducts] = useContext(ProductContext);

  let distinct_Categories = products && products.reduce((acc, curr) => [...acc, curr.category], []);
  distinct_Categories = [...new Set(distinct_Categories)];

  // console.log(distinct_Categories);

  const color = () =>{
    return `rgba(${Math.floor(Math.random() * 256).toFixed()},
     ${Math.floor(Math.random() * 256).toFixed()}, 
     ${Math.floor(Math.random() * 256).toFixed()}, 0.5)`
  }
  
  // console.log(color());
  

  return (
    <div>
      <nav className=' h-full bg-zinc-50 flex flex-col items-center pt-5'>
        <a className='py-1 px-1 border rounded border-blue-200 text-blue-300' 
        href="/create">
          Add new products
        </a>
        <hr className='my-3 w-[90%]' />
        <h1 className='text-2xl mb-3 w-[90%]'>Category filter</h1>
        <div className='w-[90%]'>

          {distinct_Categories.map((c,i) => (

          <Link key={i}
          to={`/?category=${c}`} className=' flex items-center mb-2'>
            <span style={{ backgroundColor: color() }} className='rounded-full mr-2 w-[15px] h-[15px]'></span> 
            {c}
          </Link>
          ))}
        </div>
      </nav>
    </div>
  )
}

export default Nav
