"use client";

import React, { useState, useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createBlog } from "@/lib/actions";

const BlogForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [writeup, setwriteup] = useState("");
  const router = useRouter();

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        desciption: formData.get("desciption") as string,
        category: formData.get("category") as string,
        link: formData.get("link") as string,
        writeup,
      };

      await formSchema.parseAsync(formValues);

      const result = await createBlog(prevState, formData, writeup);

      if (result.status == "SUCCESS") {
        toast.success("Your blog writeup  has been created successfully");

        router.push(`/blog/${result._id}`);
      }

      return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErorrs = error.flatten().fieldErrors;

        setErrors(fieldErorrs as unknown as Record<string, string>);

        toast.error("Please check your inputs and try again");


        return { ...prevState, error: "Validation failed", status: "ERROR" };
      }

      toast.error("An unexpected error has occurred");

      return {
        ...prevState,
        error: "An unexpected error has occurred",
        status: "ERROR",
      };
    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
    <form action={formAction} className="max-w-2xl mx-auto bg-white my-10 space-y-8 px-6">
      <div>
        <label htmlFor="title" className="font-bold text-[18px] text-black uppercase">
          Title
        </label>
        <Input
          id="title"
          name="title"
          className="border-[3px] border-black px-5 py-7 text-[18px] text-black font-semibold rounded-full mt-3 placeholder:text-black-300 !important"
          required
          placeholder="Blog Title"
        />

        {errors.title && <p className="text-red-500 mt-2 ml-5">{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="desciption" className="font-bold text-[18px] text-black uppercase">
          Description
        </label>
        <Textarea
          id="desciption"
          name="desciption"
          className=" border-[3px] border-black p-5 text-[18px] text-black font-semibold rounded-[20px] mt-3 placeholder:text-black-300 !important"
          required
          placeholder="Blog Description"
        />

        {errors.desciption && (
          <p className="text-red-500 mt-2 ml-5">{errors.desciption}</p>
        )}
      </div>

      <div>
        <label htmlFor="category" className="font-bold text-[18px] text-black uppercase">
          Category
        </label>
        <Input
          id="category"
          name="category"
          className=" border-[3px] border-black px-5 py-7 text-[18px] text-black font-semibold rounded-full mt-3 placeholder:text-black-300 !important"
          required
          placeholder="Blog Category (Tech, Health, Education...)"
        />

        {errors.category && (
          <p className="text-red-500 mt-2 ml-5">{errors.category}</p>
        )}
      </div>

      <div>
        <label htmlFor="link" className="font-bold text-[18px] text-black uppercase">
          Image URL
        </label>
        <Input
          id="link"
          name="link"
          className="border-[3px] border-black px-5 py-7 text-[18px] text-black font-semibold rounded-full mt-3 placeholder:text-black-300 !important"
          required
          placeholder="Blog Image URL"
        />

        {errors.link && <p className=" text-red-500 mt-2 ml-5">{errors.link}</p>}
      </div>

      <div data-color-mode="light">
        <label htmlFor="writeup" className="font-bold text-[18px] text-black uppercase">
          Writeup
        </label>

        <MDEditor
          value={writeup}
          onChange={(value) => setwriteup(value as string)}
          id="writeup"
          preview="edit"
          height={300}
          style={{ borderRadius: 20, overflow: "hidden" }}
          textareaProps={{
            placeholder:
              "Briefly describe your idea and what problem it solves",
          }}
          previewOptions={{
            disallowedElements: ["style"],
          }}
        />

        {errors.writeup && <p className="text-red-500 mt-2 ml-5">{errors.writeup}</p>}
      </div>

      <Button
        type="submit"
        className="bg-primary border-[4px] border-black rounded-full p-5 min-h-[70px] w-full font-bold text-[18px] !important text-white"
        disabled={isPending}
      >
        {isPending ? "Submitting..." : "Submit Your WriteUp"}
        <Send className="size-6 ml-2" />
      </Button>
    </form>
  );
};

export default BlogForm;
