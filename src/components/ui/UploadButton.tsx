import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

export function ImageUploader() {
  return (
    <UploadButton<OurFileRouter, any>
      endpoint="imageUploader"
      onClientUploadComplete={(res) => {
        console.log("Resultado do upload:", res);
      }}
      onUploadError={(error) => {
        console.error("Erro no upload:", error.message);
      }}
    />
  );
}
