"use client";

import toast from "react-hot-toast";
import { UploadDropzone } from "@/lib/uploadthing";
import { ourFileRouter } from "@/app/api/uploadthing/core";

interface FileUploadProps {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
}
 
export const FileUpload = ({
  onChange, 
  endpoint
} : FileUploadProps) => {
  return (
    <UploadDropzone
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url)
      }}
      endpoint={endpoint}
      onUploadError={(error: Error) => {
        toast.error("Something went wrong")
      }}
    />
  );
};