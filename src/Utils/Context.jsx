import React, { useState } from 'react'
import axios from '../Utils/Axios'
import { createContext, useEffect } from 'react'

export const ProductContext = createContext();

const Context = (props) => {
    const [products, setProducts] = useState(JSON.parse(localStorage.getItem("products")) || []);

    // const getProducts = async () => {
    //     try {
    //         const {data} = await axios.get("/products");
    //         // console.log(data);
    //         setProducts(data);
            
    //     } catch (error) {
    //         console.log(error);
            
    //     } 
    // };
    // console.log(products);
    
    // useEffect(() => {
    //     getProducts();
    // }, []);

    return (
    <div>
      <ProductContext.Provider value={[products, setProducts]}>
        {props.children}
    </ProductContext.Provider>
    </div>
  )
};

export default Context;
