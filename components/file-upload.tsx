"use client";
import { X } from "lucide-react";
import Image from "next/image";
import { UploadDropzone } from "@/lib/uploadthing";
import "@uploadthing/react/styles.css";
import { useEffect, useState } from "react";
import { checkFileType } from "@/lib/checkFileType";

interface FileUplodProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "messageFile" | "serverImage";
}

export const FileUpload = ({ onChange, value, endpoint }: FileUplodProps) => {
  const [isChecker, setChecker] = useState<boolean | null>(null);
  useEffect(() => {
    const validateFile = async () => {
      if (value) {
        setChecker(null);
        const isValid = await checkFileType(value);
        setChecker(isValid);
      }
    };

    validateFile();
  }, [value]);

  return value.length > 0 ? (
    <div className="relative h-20 w-20">
      {isChecker === null && (
        <div className="skeleton-loader h-20 w-20 rounded-full bg-gray-200" />
      )}
      {isChecker && (
        <>
          <Image fill src={value} alt="Upload" className="rounded-full" />
          <button
            onClick={() => onChange("")}
            className="bg-rose-500 cursor-pointer  text-white p-1 rounded-full absolute top-0 right-0  shadow-sm "
            type="button"
          >
            <X className="h-3 w-3 font-bold" />
          </button>
        </>
      )}
      {isChecker === false && (
        <div className="text-red-500">Invalid file type</div>
      )}
    </div>
  ) : (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        console.log(error);
      }}
    />
  );
};
