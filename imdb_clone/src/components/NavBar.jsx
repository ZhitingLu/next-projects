import React from 'react'
import NavBarItem from './NavBarItem'

export default function NavBar() {
  return (
    <div className='flex gap-6 bg-amber-100 dark:bg-gray-700 
    p-4 lg:text-lg justify-center'>
        <NavBarItem title="Trending" param="fetchTrending" />
        <NavBarItem title="Top Rated" param="fetchTopRated" />

    </div>
  )
}
