"use client"

import { Category } from "@prisma/client"

import {
  FcEngineering,
  FcFilmReel,
  FcMultipleDevices,
  FcMusic,
  FcOldTimeCamera,
  FcSalesPerformance,
  FcSportsMode

} from "react-icons/fc"
import { IconType } from "react-icons/lib"
import CategoryItem from "./category-item"

interface CategoriesProps {
  items: Category[]
}

const iconMap: Record<Category["name"], IconType> = {
  "Music": FcMusic,
  "Fitness": FcSportsMode,
  "Accounting": FcSalesPerformance,
  "Engineering": FcEngineering,
  "Filming": FcFilmReel,
  "Photography": FcOldTimeCamera,
  "Computer Science": FcMultipleDevices,
}


const Categories = ({items}:CategoriesProps) => {


  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {items.map((item) => (
        <CategoryItem key={item.id} lable={item.name} icon={iconMap[item.name]} value={item.id} />
      ))}
    </div>
  )
}

export default Categories