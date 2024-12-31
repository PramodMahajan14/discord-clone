"use client";
import { File, FileIcon, X } from "lucide-react";
import Image from "next/image";
import { UploadDropzone } from "@/lib/uploadthing";
import "@uploadthing/react/styles.css";
import { useEffect, useState } from "react";
import { checkFileType } from "@/lib/checkFileType";
import { cn } from "@/lib/utils";

interface FileUplodProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "messageFile" | "serverImage";
}

export const FileUpload = ({ onChange, value, endpoint }: FileUplodProps) => {
  const [fileType, setFileType] = useState<string | null>(null);
  const [clientUrl, setClientUrl] = useState<any>();

  useEffect(() => {
    const validateFile = async () => {
      if (value) {
        setFileType(null);
        const type = await checkFileType(value);
        setFileType(type);
      }
    };

    validateFile();
  }, [value]);

  return value.length > 0 ? (
    <div
      className={cn(
        "relative",
        fileType === "pdf"
          ? "flex items-center  p-2  mt-2 rounded-md bg-indigo-50"
          : "h-20 w-20"
      )}
    >
      {fileType === null && (
        <div className="skeleton-loader h-20 w-20 rounded bg-gray-200" />
      )}
      {fileType === "image" && (
        <>
          <Image fill src={value} alt="Upload" className="rounded" />

          <button
            onClick={() => onChange("")}
            className="bg-rose-500 cursor-pointer text-white p-1 rounded-full absolute -top-1 -right-1 shadow-sm"
            type="button"
          >
            <X className="h-3 w-3 font-bold" />
          </button>
        </>
      )}

      {fileType === "pdf" && (
        <>
          <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
          >
            {" "}
            {clientUrl?.name}
          </a>
          <button
            onClick={() => onChange("")}
            className="bg-rose-500 cursor-pointer text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm"
            type="button"
          >
            <X className="h-3 w-3 font-bold" />
          </button>
        </>
      )}
      {fileType === null && (
        <div className="text-red-500">Invalid file type</div>
      )}
    </div>
  ) : (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
        setClientUrl(res?.[0]);
      }}
      onUploadError={(error: Error) => {
        console.log(error);
      }}
    />
  );
};
