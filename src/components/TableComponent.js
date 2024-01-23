import React,{useState,useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MdKeyboardDoubleArrowRight,MdKeyboardDoubleArrowLeft } from "react-icons/md";

import ClothingImage from '../images/clothing.jpg';
import KitchenImage from '../images/kitchen.jpg';
import ElectronicsImage from '../images/electronics.jpg';
import BooksImage from '../images/books.jpeg';
import HomeAppliancesImage from '../images/homeappliances.jpg';
import AutomobilesImage from '../images/automobiles.jpg';
import '../index.css'


const categoryImages = {
  'Clothing': ClothingImage,
  'Kitchen': KitchenImage,
  'Electronics': ElectronicsImage,
  'Books': BooksImage,
  'Home Appliances': HomeAppliancesImage,
  'Automobiles': AutomobilesImage,
};

function Category({ data }) {
  const [arrowLeft, setArrowLeft] = useState(900);
  const [arrowRight, setArrowRight] = useState(1010);
  const divRef = useRef();
  
  const handleScroll = () => {
    divRef.current.scrollBy({
      left: 1000,
      behavior: 'smooth',
    });

    setArrowLeft((prevLeft) => prevLeft + 1000);
    if(arrowLeft>900) {
    setArrowRight((prevLeft) => prevLeft + 1000);
    }
  }
  const handleReverse = () => {
    divRef.current.scrollBy({
      left: -1000,
      behavior: 'smooth',
    });

    setArrowLeft((prev) => prev - 1000);

    if(arrowRight>1010 ) {
      setArrowRight((prev) => prev - 1000);
    }
  }

  const imageDiv= {
    width: '700px',
    height: '400px',
    margin: '10px',
  }

  const image= {
    minWidth: "100%",
    minHeight: "100%",
    overflow: "hidden",
    backgroundSize: "cover", 
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat", 
  }
 
  const navigate = useNavigate();

  const handleShopNowClick = (categoryId) => {
    navigate(`/categories/${categoryId}`);
  };
  return (
    <>
      <div className='ml-32 flex flex-row min-vw-full relative max-w-[1000px] overflow-x-hidden' ref={divRef}>
        {data.map((item) => (
         <div key={item.id} className='flex flex-row bg-black text-white justify-around'>
            <div className='bg-white' style={imageDiv}>
              <img src={categoryImages[item.category_name]} style={image} alt={item.category_name}/>
            </div>
            <div className='self-center'>
              <p className='font-body title mt-5 p-5'>Checkout our <span className='text-red-600'>{item.category_name}</span> Collections here</p>
              <button onClick={()=>handleShopNowClick(item.id)} className='rounded-full ml-[30%]'>
              Shop Now
              </button>
            </div>
          </div>
        ))}
        {arrowLeft <5400 &&
        <MdKeyboardDoubleArrowRight  style={{ left: `${arrowLeft}px` }} className='absolute bottom-9 text-6xl cursor-pointer text-white z-10' onClick={()=>handleScroll()}/>
        } 
          { arrowLeft >=1800 &&
          <MdKeyboardDoubleArrowLeft   style={{ left: `${arrowRight}px` }} className='absolute bottom-9 text-6xl cursor-pointer text-white z-10' onClick={()=>handleReverse()}/>
          } 
      
     </div>  
     <div className='absolute bottom-28 right-10 min-w-[100px]'></div>
     </>
  );
}

export default Category;
