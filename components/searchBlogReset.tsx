"use client";

import Link from "next/link";
import { X } from "lucide-react";

function SearchBlogReset() {
  const reset = () => {
    const form = document.querySelector(".searchBlogForm") as HTMLFormElement;
    if (form) {
      form.reset();
    }
  };

  return (
    <button type="reset" onClick={reset}>
      <Link
        href="/"
        className="size-[50px] rounded-full bg-black flex justify-center items-center !important text-white"
      >
        <X className="size-5" />
      </Link>
    </button>
  );
}

export default SearchBlogReset;
