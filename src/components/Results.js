import React from 'react'
import CardItem from './CardItem'

export default function Results({data}) {
  return (
    <div className='flex flex-row flex-wrap'>
        {data.map((item)=>{
            return <CardItem key={item.id} item={item}/>
        })}
    </div>
  )
}
