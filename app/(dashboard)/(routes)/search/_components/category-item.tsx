'use client'

import { cn } from '@/lib/utils';
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

  return (
    <button className={cn("py-2 px-3 text-sm border border-slate-200 rounded-full flex items-center gap-x-1 hover:border-sky-700 transition",
      //change styleif active
    )} value={value} type='button'>
      {Icon && <Icon size={20} />}
      <span className='truncate'>{label}</span>
    </button>
  )
}

export default CategoryItem;