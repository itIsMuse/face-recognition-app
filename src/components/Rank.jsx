import React from 'react'

const Rank = ({name, entries}) => {
    const rank = `Your rank is ${entries}`
    const username = `Hi, ${name}`
  return (
  <>
    <div className='text-lg center '>
          <p>{username}</p>  
    </div>
    <div className='text-lg center '>
          {rank}  
    </div>
    </>
  )
}

export default Rank