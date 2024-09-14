"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import colors from "@/constant/colors";

import dynamic from "next/dynamic";
import { ContentEditableEvent } from "react-simple-wysiwyg";

const DynamicEditor = dynamic(() => import("react-simple-wysiwyg"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

export default function Home() {
  const [note, setNote] = useState("");
  const [color, setColor] = useState("red"); // Varsayılan renk
  const router = useRouter();

  const handleViewNote = () => {
    const encryptedNote: string = btoa(encodeURIComponent(note)); // Notu önce URL-safe hale getir, sonra Base64 ile şifrele
    const safeColor = encodeURIComponent(color); // Rengi URL-safe hale getir
    const protectUrl = `/notepage/?message=${encryptedNote}&color=${safeColor}`;
    router.push(protectUrl); // Güvenli URL ile yönlendirme yap
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <div className="text-center mt-4">
        <h1 className="text-2xl font-extrabold text-gray-800">Future Note</h1>
        <p className="text-lg text-gray-600">A note to your future self.</p>
      </div>

      <div className="w-full md:w-2/3 lg:w-2/3 xl:w-2/4 mx-auto mt-8 px-4">
        <div
          className="border border-gray-300 rounded-lg overflow-hidden"
          style={{ minHeight: "200px" }}
        >
          <DynamicEditor
            containerProps={{
              style: {
                resize: "vertical",
                minHeight: "200px",
                height: "100%",
                width: "100%",
              },
            }}
            value={note}
            onChange={(e: ContentEditableEvent) =>
              setNote(e.target.value.length >= 1000 ? note : e.target.value)
            }
          />
        </div>
      </div>

      <div className="max-w-2xl mx-auto mt-8">
        <div className="flex flex-wrap justify-center gap-4">
          {colors.map((colorOption) => (
            <div key={colorOption} className="flex items-center">
              <input
                type="radio"
                id={colorOption}
                name="color"
                value={colorOption}
                className="sr-only peer"
                checked={color === colorOption} // Seçili rengi kontrol et
                onChange={() => setColor(colorOption)} // Renk değişimini state'e kaydet
              />
              <label
                htmlFor={colorOption}
                className={`w-10 h-10 rounded-full cursor-pointer border-2 border-white shadow-lg transition-all duration-200 ease-in-out peer-checked:ring-2 peer-checked:ring-offset-2`}
                style={{ backgroundColor: colorOption }}
              ></label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-8">
        <button
          className="cursor-pointer disabled:opacity-50 px-8 py-3 bg-blue-500 text-white font-semibold rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-colors duration-300"
          onClick={handleViewNote} // Butona tıklandığında yönlendirme
          disabled={!note}
        >
          View Note
        </button>
      </div>
    </div>
  );
}
