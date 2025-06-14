"use client";

import { useRef } from "react";
import { UploadCloud, X } from "lucide-react";

type Props = {
  value: File[]; // recebe os arquivos do react-hook-form
  onChange: (files: File[]) => void; // atualiza o campo
};

export default function ImageUploader({ value, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFiles = Array.from(e.target.files || []);
    onChange([...value, ...selectedFiles]); // acumula as imagens
  }

  function handleRemove(index: number) {
    const updated = [...value];
    updated.splice(index, 1);
    onChange(updated);
  }

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <label
        htmlFor="file-upload"
        className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 bg-white p-6 text-gray-500 transition hover:bg-gray-50"
        // onClick={() => inputRef.current?.click()}
      >
        <UploadCloud className="h-5 w-5" />
        <span>Selecione imagens (ou arraste)</span>
      </label>

      <input
        ref={inputRef}
        id="file-upload"
        type="file"
        accept="image/*"
        multiple
        onChange={handleSelect}
        className="hidden"
      />

      {value.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {value.map((file, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-lg shadow-md"
            >
              <img
                src={URL.createObjectURL(file)}
                alt={`preview-${idx}`}
                className="h-32 w-full rounded-md object-cover"
              />
              <button
                type="button"
                onClick={() => handleRemove(idx)}
                className="absolute right-1 top-1 rounded-full bg-red-600 p-1 text-white opacity-80 transition hover:opacity-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
