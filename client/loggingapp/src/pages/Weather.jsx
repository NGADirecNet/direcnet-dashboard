import React, { useEffect } from 'react'
import { Page } from '../components'
import { BsSun } from 'react-icons/bs'

const Weather = () => {

  return (
    <Page headerCat="App" headerTitle="Weather">
      <div className='flex gap-2'>
        <button
          style={{ color: "rgb(254, 201, 15)" }}
          className="text-4xl drop-shadow-xl align-middle"
        >
          <BsSun />
        </button>
        <div>
          <div className='font-semibold text-2xl'>
            Wednesday
          </div>
          <p className='text-gray-400'>June 8, 2022</p>
        </div>
      </div>
    </Page>
  )
}

export default Weather