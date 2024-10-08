import { Category, Course } from "@prisma/client";
import CourseCard from "./CourseCard";

interface CoursesWithProgressWithCategory extends Course {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
}

interface CoursesListProps {
  courses: CoursesWithProgressWithCategory[]; 
}

const CoursesList = ({ courses }: CoursesListProps) => {
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {courses.map((item) => (
          <CourseCard key={item.id} id={item.id}
          title={item.title} imageUrl={item.imageUrl!} chaptersLength={item.chapters.length} price={item.price!} progress={item.progress} category={item?.category?.name!} />
        ))}
      </div>
      {courses.length === 0 && (
        <div className="text-center text-sm text-muted-foreground mt-10">
          No items found
        </div>
      )}
    </div>
  );
};

export default CoursesList;
