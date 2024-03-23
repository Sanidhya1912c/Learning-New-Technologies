import React from 'react'

const ListItems = (e) => {
    return (
      <div className='listItem-container'>
        <div className='listDivs listDivs-1'>
          <label htmlFor="">Name:</label>
          <p>{e.name}</p>
        </div>
        <div className='listDivs listDivs-2'>
          <label htmlFor="">Age:</label>
          <p>{e.age}</p>
        </div>
      </div>
    )
  }

export default ListItems