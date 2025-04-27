import React from 'react'

export default function loading() {
  return (
    <div className='flex justify-center item-center h-screen'>
        <img src="spinner.svg" alt="loading..." className='animate-spin h-55 mt-16' />
    </div>
  )
}
