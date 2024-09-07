import { Category, Course } from "@prisma/client";

interface CoursesWithProgressWithCategory extends Course {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
}

interface CoursesListProps {
  courses: CoursesWithProgressWithCategory[]; // Correctly typed courses
}

const CoursesList = ({ courses }: CoursesListProps) => {
  return (
    <div>
      {courses.map((item) => (
        <div key={item.id}>
          <p>{item.title}</p> {/* Accessing title */}
         
        </div>
      ))}
    </div>
  );
};

export default CoursesList;
