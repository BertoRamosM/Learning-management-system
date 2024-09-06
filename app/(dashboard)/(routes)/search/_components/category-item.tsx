'use client'

import { cn } from '@/lib/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import queryString from 'query-string';
import React from 'react'
import { IconType } from 'react-icons/lib';

interface CategoryItemProps {
  label?: string;
  icon?: IconType;
  value?: string;
}

const CategoryItem = ({
  label,
  icon: Icon,
  value
}: CategoryItemProps) => {

  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams() 

  const currentCategoryId = searchParams.get('categoryId')
  const currentTitle = searchParams.get('title')


  const isSelected = currentCategoryId === value

 const onClick = () => {
  const query = {
    title: currentTitle,
    categoryId: isSelected ? null : value
  };

  const url = queryString.stringifyUrl({
    url: pathname,
    query: query
  }, { skipNull: true, skipEmptyString: true });

  router.push(url);
};

 
  
  return (
    <button className={cn("py-2 px-3 text-sm border border-slate-200 rounded-full flex items-center gap-x-1 hover:border-sky-700 transition",
      isSelected && "border-sky-700 bg-sky-200/20 text-sky-800"
    )} value={value} type='button' onClick={onClick}>
      {Icon && <Icon size={20} />}
      <span className='truncate'>{label}</span>
    </button>
  )
}

export default CategoryItem;