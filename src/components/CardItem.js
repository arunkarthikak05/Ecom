import React from 'react'
import Card from 'react-bootstrap/Card';
import ClothingImage from '../images/product_clothing.jpg'
import BooksImage from '../images/product_books.jpg'
import AutomobilesImage from '../images/product_automobiles.jpeg'
import ElectronicsImage from '../images/product_electronics.jpg'
import KitchenImage from '../images/product_kitchen.jpg'
import HomeImage from '../images/product_home.jpg'

export default function CardItem({item}) {
  const categoryImages = {
    'clothing': ClothingImage,
    'books': BooksImage,
    'automobile': AutomobilesImage,
    'electronics': ElectronicsImage,
    'kitchen': KitchenImage,
    'homeAppliances': HomeImage,
  };

  return (
    <>
    <Card className='w-1/4 p-2 mx-5 mt-5'>
        <Card.Img variant="top" src={categoryImages[item.category_name]}/>
        <span className='max-w-fit text-sm relative bg-white left-2 bottom-10 p-1 opacity-75'>Only <b>{item.stock} </b>left</span>
        <Card.Body>
        <Card.Title>{item.product_name}</Card.Title>
        <Card.Text>
        <span className='text-gray-500'> 
            <span className='font-semibold'>By {item.brand}</span><br />
            <span className='font-semibold'>Rs.{item.discounted_price}</span>
            <span className='ml-3 line-through text-xs font-light'>Rs.{item.MRP}</span>
            <span className='ml-3 text-yellow-500 text-sm'>(Rs.{item.MRP-item.discounted_price} OFF)</span>
        </span> 
        </Card.Text>
        </Card.Body>
    </Card>
    </>
  )
}
