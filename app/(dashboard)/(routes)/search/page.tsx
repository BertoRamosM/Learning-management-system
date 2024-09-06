import { db } from '@/lib/db'
import React from 'react'
import Categories from './_components/Categories'

const SearchPage = async () => {

  const catgories = await db.category.findMany({
    orderBy: {
      name: 'asc'
    }
  })


  return (
    <div className='p-6'>
      <Categories items={catgories} />

    </div>
  )
}

export default SearchPage