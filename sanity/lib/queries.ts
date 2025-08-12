import { defineQuery } from "next-sanity";

export const blog_queries = defineQuery(`* [_type == "blog" && defined(slug.current) && !defined($search) || title match $search || category match $search || author->name match $search] | order(_createdAt desc) {
  _id,
  title,
  desciption,
  category,
  _createdAt,
  author -> {
  _id, name, image, bio
  },
  views,
  image,
  slug 
}`);

export const details_queries = defineQuery(`*[_type == "blog" && _id == $id][0] {
 _id, title, desciption, category, _createdAt, 
   author -> {
     _id, name,username, image, bio
   }
   , views, image, slug,writeup, desciption 
}`)
export const views_queries = defineQuery(`*[_type == "blog" && _id == $id][0] {
  _id, views
}`)

export const author_github_queries = defineQuery(`*[_type=="author" && id == $id][0] {
  _id, id, name, username, email, image, bio
}`)
