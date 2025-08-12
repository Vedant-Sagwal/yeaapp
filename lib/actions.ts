"use server";

import { auth } from "@/auth";
import { parseServerActionResponse } from "@/lib/utils";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write-client";

export const createBlog = async (
  state: any,
  form: FormData,
  writeup: string,
) => {
  const session = await auth();

  if (!session)
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });

  const { title, desciption, category, link } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== "writeup"),
  );

  const slug = slugify(title as string, { lower: true, strict: true });

  try {
    const blog = {
      title,
      desciption,
      category,
      image: link,
      slug: {
        _type: slug,
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: session?.id,
      },
      writeup,
    };

    const result = await writeClient.create({ _type: "blog", ...blog });

    return parseServerActionResponse({
      ...result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.log(error);

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};
