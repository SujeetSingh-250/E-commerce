import React, { useContext } from 'react'
import { useState } from 'react'
import { ProductContext } from '../Utils/Context';
import {nanoid} from 'nanoid'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const Create = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useContext(ProductContext);

    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");


    const addProductHandler = (e) => {
        e.preventDefault();

        if (title.trim().length < 5 || 
            image.trim().length < 5 || 
            description.trim().length < 5 || 
            price.trim().length < 1 || 
            category.trim().length < 5
        ) {
            alert("Please fill all the fields");
            return;
        }
        const product = {
            id: nanoid(),
            title,
            image,
            description,
            price,
            category
        };
        setProducts([...products, product]);
        localStorage.setItem("products", JSON.stringify([...products, product]));
        navigate("/");
        toast.success("Product added successfully")
        // console.log(product);
    }

  return (
    <div>
      <form onSubmit={addProductHandler} 
      className='flex flex-col items-center p-[5%] w-screen h-screen'>
        <h1 className='mb-3 w-1/2 text-3xl font-serif'>Add New Product</h1>
        <input 
            onChange={(e) =>{
            setImage(e.target.value)
        }}
        value={image}
        type="url" 
        placeholder='Product Image URL' 
        className='text-xl bg-zinc-100  rounded p-2 w-1/2 mb-3' 
        />

        <input 
            onChange={(e) =>{
            setTitle(e.target.value)
        }}
        value={title}
        type="text" 
        placeholder='Product Title' 
        className='text-xl bg-zinc-100  rounded p-2 w-1/2 mb-3' 
        />

        <div className='w-1/2 flex justify-between '>
            <input 
                onChange={(e) =>{
                setCategory(e.target.value)
            }}
                value={category}
                type="text" 
                placeholder='Product Category' 
                className='text-xl bg-zinc-100  rounded p-2 w-[45%] mb-3' 
            />

            <input 
                onChange={(e) =>{
                setPrice(e.target.value)
           }}
                value={price}
                type="number" 
                placeholder='Product Price' 
                className='text-xl bg-zinc-100  rounded p-2 w-[45%] mb-3' 
            />
        </div>
        <textarea
            onChange={(e) =>{
                setDescription(e.target.value)
            }}
            value={description}
            placeholder='Enter product description here...'
            className='text-xl bg-zinc-100  rounded p-2 w-1/2 mb-3'
            rows="10"
        ></textarea>
        
        <div className='w-1/2'>
            <button className='py-2 px-5 border rounded border-blue-200 text-blue-300'>
                Add new products
            </button>
        </div>

      </form>
    </div>
  )
}

export default Create
