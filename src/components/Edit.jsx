import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { ProductContext } from '../Utils/Context';
// import {nanoid} from 'nanoid'
import { useNavigate, useParams } from 'react-router-dom';
const Edit = () => {
    const [products, setProducts] = useContext(ProductContext);
    const navigate = useNavigate();  
    const {id} = useParams();
    const [product, setProduct] = useState({
        title: "",
        image: "",
        description: "",
        price: "",
        category: ""
    });

    const chanegeHandler = (e) => {
    //   console.log(e.target.name,e.target.value);
      setProduct({
        ...product, 
        [e.target.name]: e.target.value
      });
    }

    // const [title, setTitle] = useState("");
    // const [image, setImage] = useState("");
    // const [description, setDescription] = useState("");
    // const [price, setPrice] = useState("");
    // const [category, setCategory] = useState("");


    useEffect(() => {
        setProduct(products.filter((p) => p.id == id)[0]);
    //     if (product) {
    //         setTitle(product.title);
    //         setImage(product.image);
    //         setDescription(product.description);
    //         setPrice(product.price);
    //         setCategory(product.category);
    //     }

    // }, [id, products, product]);

    },[id]);
    // console.log(product);
    
 

    const addProductHandler = (e) => {
        e.preventDefault();

        if (product.title.trim().length < 5 || 
            product.image.trim().length < 5 || 
            product.description.trim().length < 5 || 
            product.price.trim().length < 1 || 
            product.category.trim().length < 5
        ) {
            alert("Please fill all the fields");
            return;
        }

        const pi = products.findIndex((p) => p.id == id);
        const newProducts = [...products];
        newProducts[pi] = { 
            ...newProducts[pi],
            ...product
        };
        console.log(newProducts);

        // const product = {
        //     id: nanoid(),
        //     title,
        //     image,
        //     description,
        //     price,
        //     category
        // };
        setProducts(newProducts);

        localStorage.setItem("products", JSON.stringify(newProducts));
        navigate(-1);
        // console.log(product);
    }

  return (
    <div>
      <form onSubmit={addProductHandler} 
      className='flex flex-col items-center p-[5%] w-screen h-screen'>
        <h1 className='mb-3 w-1/2 text-3xl font-serif'>Edit Product</h1>
        <input 
            onChange={chanegeHandler}
        value={product && product.image}
        type="url" 
        placeholder='Product Image URL' 
        name='image'
        className='text-xl bg-zinc-100  rounded p-2 w-1/2 mb-3' 
        />

        <input 
            onChange={chanegeHandler}
        value={product && product.title}
        type="text" 
        placeholder='Product Title' 
        name='title'
        className='text-xl bg-zinc-100  rounded p-2 w-1/2 mb-3' 
        />

        <div className='w-1/2 flex justify-between '>
            <input 
                onChange={chanegeHandler}
                value={product && product.category}
                type="text" 
                placeholder='Product Category' 
                name='category'
                className='text-xl bg-zinc-100  rounded p-2 w-[45%] mb-3' 
            />

            <input 
                onChange={chanegeHandler}
                value={product && product.price}
                type="number" 
                placeholder='Product Price' 
                name='price'
                className='text-xl bg-zinc-100  rounded p-2 w-[45%] mb-3' 
            />
        </div>
        <textarea
            onChange={chanegeHandler}
            value={product && product.description}
            placeholder='Enter product description here...'
            className='text-xl bg-zinc-100  rounded p-2 w-1/2 mb-3'
            rows="10"
        ></textarea>
        
        <div className='w-1/2'>
            <button className='py-2 px-5 border rounded border-blue-200 text-blue-300'>
                Edit products
            </button>
        </div>

      </form>
    </div>
  )
}

export default Edit;
