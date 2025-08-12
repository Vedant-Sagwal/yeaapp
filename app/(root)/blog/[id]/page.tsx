import { details_queries } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import { convertDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link"
import markdownit from 'markdown-it'
import { Suspense } from "react";
import View from "@/components/View";

const md = markdownit()

export const experimental_ppr = true;

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const posts = await client.fetch(details_queries, { id });

  if (!posts) {
    return notFound()
  }

  const parsedContent = md.render(posts?.writeup || '')

  return (
    <div>
      <section className="w-full bg-primary min-h-[230px] pattern flex justify-center items-center flex-col py-10 px-6">
        <p className="bg-[#6e6a86] px-6 py-3 font-work-sans font-bold rounded-sm uppercase relative before:content-[''] before:absolute before:top-2 before:left-2 before:border-t-[10px] before:border-t-black before:border-r-[10px] before:border-r-transparent after:content-[''] after:absolute after:bottom-2 after:right-2 after:border-b-[10px] after:border-b-black after:border-l-[10px] after:border-l-transparent">{convertDate(posts?._createdAt)}</p>
        <h1 className="uppercase bg-[#eb6f92] px-6 py-3 font-work-sans font-extrabold text-black sm:text-[54px] sm:leading-[64px] text-[36px] leading-[46px] max-w-5xl text-center my-5">{posts?.title}</h1>
        <p className="font-medium text-[20px] text-[#9ccfd8] max-w-5xl text-center break-words ">{posts.desciption}</p>
      </section>
      <section className="px-6 py-10 max-w-7xl mx-auto">
        <img src={posts.image} alt="thumbnail" className="w-full h-auto rounded-xl shadow-lg" />

        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex justify-between items-center gap-5 shadow-2xl">
            <Link href={`/user/${posts.author?.id}`} className="flex gap-2 items-center mb-3">
              <Image src={posts.author?.image || "https://upload.wikimedia.org/wikipedia/commons/f/f8/Odin%2C_der_G%C3%B6ttervater.jpg"} alt="avatar" width={64} height={64} className="rounded-full drop-shadow-lg" />
              <div>
                <p className="font-medium text-[20px] text-black">{posts.author?.name}</p>
                <p className="font-medium text-[16px] !text-black-300">@{posts.author?.username}</p>
              </div>
            </Link>
            <p className="font-medium text-[16px] bg-[#FFE8F0] px-4 py-2 rounded-full">{posts.category}</p>
          </div>
          <h3 className="text-[30px] font-bold text-black">BLOG</h3>
          {parsedContent ? (
            <article className="max-w-4xl font-work-sans break-all  mx-auto text-lg leading-relaxed text-gray-800 dark:text-gray-200 space-y-6"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          ) : (
            <p className=" text-black-100 text-sm font-normal"> No Results Provided</p>
          )}
        </div>
        <hr className="border-dotted bg-zinc-400 max-w-4xl my-10 mx-auto" />

        <Suspense fallback={<p className="text-3xl">Loading!!!!!!!!!!!!!!!!!!!</p>}>
          <View id={id} />
        </Suspense>
      </section>
    </div>
  )
}

export default page
