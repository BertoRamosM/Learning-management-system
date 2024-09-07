import { db } from '@/lib/db'
import React from 'react'
import Categories from './_components/Categories'
import SearchInput from '@/components/search-input'
import { auth } from '@clerk/nextjs/server'
import { redirect, useSearchParams } from 'next/navigation'
import { GetCourses } from '@/actions/get-courses'
import CoursesList from '@/components/CoursesList'

interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  }
}

const SearchPage = async ({
  searchParams
}: SearchPageProps) => {

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
    ...searchParams,
  })


  return (
    <>
      
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-6">
        <Categories items={catgories} />
        <CoursesList courses={courses} />
      </div>
    </>
  );
}

export default SearchPage