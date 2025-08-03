import { defineQuery } from "next-sanity";

export const blog_queries = defineQuery(`* [_type == "blog" && defined(slug.current)] | order(_createdAt desc) {
  _id,
  title,
  description,
  category,
  _createdAt,
  author -> {
  _id, name, image, bio
  },
  views,
  image,
  slug 
}`);
