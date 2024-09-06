'use client'

import { Search } from 'lucide-react'
import React from 'react'
import { Input } from './ui/input'

const SearchInput = () => {
  return (
    <div className='relative'>
      <Search className='w-4 h-4 absolute left-3 top-3 text-slate-600'/>
      <Input className='w-full md:w-[300px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200'
        placeholder='Search for a course'
      />

    </div>
  )
}

export default SearchInput