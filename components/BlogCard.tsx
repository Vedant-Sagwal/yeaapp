import { convertDate } from "@/lib/utils"
import { EyeIcon } from "lucide-react"
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Author } from "@/sanity/types"
import { Blog } from "@/sanity/types";

export type BlogCardType = Omit<Blog, "author"> & { author?: Author }

function BlogCard({ post }: { post: BlogCardType }) {
  return (
    <li className=" mt-5 bg-[#eecfd7] border-[5px] border-black py-6 px-5 rounded-[22px] shadow-200 hover:border-[#ffffff] transition-all duration-500 hover:shadow-300 hover:bg-[#FFE8F0] group">
      <div className="flex justify-between items-center">
        <p className="font-medium text-[16px] bg-[#FFE8F0] px-4 py-2 rounded-full group-hover:bg-white-100">
          {convertDate(post._createdAt)}
        </p>
        <div className="flex gap-1.5">
          <EyeIcon className="size-6 text-[#eb6f92]"></EyeIcon>
          <span className="text-16-medium">{post.views}</span>
        </div>
      </div>
      <div className="flex justify-between items-center mt-5 gap-5">
        <div className="flex-1">
          <Link href={`/user/${post.author?._id}`}>
            <p className="text-[20px] font-medium line-clamp-1">{post.author?.name}</p>
          </Link>
          <Link href={`/blog/${post._id}`}>
            <h3 className="text-[26px] font-medium line-clamp-1">{post.title}</h3>
          </Link>
        </div>
        <Link href={`/user/${post.author?._id}`}>
          <Image src="https://placehold.co/48x48" alt="placeholder" width={48} height={48} className="rounded-full" />
        </Link>
      </div>
      <Link href={`/blog/${post._id}`}>
        <p className="font-normal text-[16px] line-clamp-2 my-3 text-black-100 break-all">{post.desciption}</p>
        <img src={post.image} alt="placeholder" className="w-full h-[164px] rounded-[10px] object-contain" />
      </Link>
      <div className="flex justify-between items-center gap-3 mt-5">
        <Link href={`/?query=${post.category?.toLowerCase()}`}>
          <p className=" font-medium text-[16px] text-black">{post.category}</p>
        </Link>
        <Button className="rounded-full bg-black font-medium text-[16px] text-white px-5 py-3 !important" asChild>
          <Link href={`/blog/${post._id}`}>Details</Link>
        </Button>
      </div>
    </li>
  )
}

export default BlogCard
