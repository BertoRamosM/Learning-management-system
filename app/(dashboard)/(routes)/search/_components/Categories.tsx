"use client"

import { Category } from "@prisma/client"

interface CategoriesProps {
  items: Category[]
}


const Categories = ({items}:CategoriesProps) => {

  
  return (
    <div>
      Categories
    </div>
  )
}

export default Categories