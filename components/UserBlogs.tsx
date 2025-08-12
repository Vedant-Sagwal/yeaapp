import React from "react";
import { client } from "@/sanity/lib/client";
import { blogs_author_queries } from "@/sanity/lib/queries";
import BlogCard, { BlogCardType } from "@/components/BlogCard";

const UserBlogs = async ({ id }: { id: string }) => {
  const blogs = await client.fetch(blogs_author_queries, { id });

  return (
    <>
      {blogs.length > 0 ? (
        blogs.map((startup: BlogCardType) => (
          <BlogCard key={startup._id} post={startup} />
        ))
      ) : (
        <p className="text-black-100 text-sm font-normal">No posts yet</p>
      )}
    </>
  );
};
export default UserBlogs;
