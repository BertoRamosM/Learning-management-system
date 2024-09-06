'use client'

import React from 'react'

interface CategoryItemProps {
  lable?: string;
  icon?: string;
  value?: string;
}

const CategoryItem = ({
  label,
  icon,
  value
}: CategoryItemProps) => {

  return (
    <div>category-item</div>
  )
}

export default CategoryItem;