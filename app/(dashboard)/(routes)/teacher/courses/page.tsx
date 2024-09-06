import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import { DataTable } from './_components/data-table';
import { columns } from './_components/columns';

async function getData(): Promise<any[]> {
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ];
}

const CoursesPage = async () => {
  const data = await getData();

  
  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}

export default CoursesPage