import { UserIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

export const blog = defineType({
  name: "blog",
  title: "Article",
  type: "document",
  fields: [
    defineField({
      name: 'title',
      type: 'string'
    }),
    defineField({
      name: 'id',
      type: 'number'
    }),
    defineField({
      name: 'views',
      type: 'number'
    }),
    defineField({
      name: 'author',
      type: 'reference',
      to: {
        type: "author"
      }
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: "title"
      }
    }),
    defineField({
      name: 'desciption',
      type: 'text'
    }),
    defineField({
      name: 'category',
      type: 'string',
      validation: (Rule) => Rule.min(1).max(20).required().error("Please Enter a Category"),
    }),
    defineField({
      name: 'image',
      type: 'url',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'writeup',
      type: 'markdown',
    }),
  ],
});
