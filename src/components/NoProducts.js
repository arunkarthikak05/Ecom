import React from 'react'
import Noresults from '../images/no-results.jpg'
export default function NoProducts({query}) {
  return (
    <div className='mt-5 w-vw-full flex-col flex items-center justify-center gap-2'>
        <div>
        <p>You searched for <b className='text-blue-600'>{query}</b></p>
        </div>
       
        <div className='w-[300px] h-[200px]' style={{ overflow: 'hidden' }}>
          <img
            src={Noresults}
            alt="no-results-found"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </div>    

        <div className='mt-4'>
            <p className='text-center text-4xl'>We couldn't find any matches</p>
            <p className='text-sm text-gray-400 text-center'>Please check the spelling or try searching something else</p>
        </div>    
    </div>
  )
}
