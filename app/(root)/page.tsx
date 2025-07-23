import SearchBlog from "../../components/searchBlog";
import BlogCard from "../../components/BlogCard";

export default async function Home({ searchParams }: { searchParams: Promise<{ query: string }> }) {
  const query = (await searchParams).query;
  const posts = [{
    _createdAt: new Date(),
    views: 55,
    author: { _id: 1, name: "Vedant Sagwal" },
    _id: 1,
    description: "This is description",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Neovim-mark.svg",
    category: "editor",
    title: "neovim",
  },

  ];
  return (
    <div>
      <section className="w-full bg-primary min-h-[530px]  flex justify-center items-center flex-col py-10 px-6">
        <h1 className="uppercase bg-[#eb6f92] px-6 py-3 font-work-sans font-extrabold text-[##e0def4] text-[54px] max-w-5xl text-center my-5">
          Write what you are thinking
        </h1>
        <p className="font-medium text-[20px] text-[#e0def4] max-w-2xl text-center break-words">
          Writing is the greatest way of saying what is in your mind and let
          that imagination of your write some revolutionary writeups.
        </p>
        <SearchBlog query={query} />
      </section>

      <section className=" px-6 py-10 max-w-7xl mx-auto">
        <p className="font-semibold text-[30px] text-black">
          {query ? `Seach Results for "${query}"` : "All Blogs"}
        </p>
        <ul className="mt-7 grid md:grid-cols-3 sm:grid-cols-2 gap-5 ">
          {posts?.length > 0 ? (
            posts.map((post: BlogCardType) =>
              <BlogCard key={post?._id} post={post} />
            )) : (<p className="text-black-100 text-sm font-normal">No Blogs Found</p>)}
        </ul>
      </section>
    </div>
  );
}
