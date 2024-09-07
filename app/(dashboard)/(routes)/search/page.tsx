import { db } from '@/lib/db'
import React from 'react'
import Categories from './_components/Categories'
import SearchInput from '@/components/search-input'
import { auth } from '@clerk/nextjs/server'
import { redirect, useSearchParams } from 'next/navigation'

const SearchPage = async () => {

  const { userId } = auth()
  if(!userId) {
    return redirect('/')
  }

  const catgories = await db.category.findMany({
    orderBy: {
      name: 'asc'
    }
  })

  const courses = await GetCourses({
    userId: userId,
    title: useSearchParams.get('title'),
    categoryId: searchParams.get('categoryId')
  })


  return (
    <>
      
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-6">
        <Categories items={catgories} />
      </div>
    </>
  );
}

export default SearchPage