import Form from "next/form";
import SearchBlogReset from "../components/searchBlogReset";
import { Search } from "lucide-react";

function searchBlog({ query }: { query?: string }) {
  return (
    <Form
      action="/"
      scroll={false}
      className="searchBlogForm  max-w-3xl w-full min-h-[80px] bg-[#6e6a86] border-[5px] border-black rounded-[80px] text-[24px] mt-8 px-5 flex flex-row items-center gap-5"
    >
      <input
        name="query"
        defaultValue={query}
        className="flex-1 font-bold placeholder:font-semibold placeholder:text-black-100 w-full h-auto outline-none"
        placeholder="Seach Blogs"
      />
      <div className="flex gap-2">
        {query && <SearchBlogReset />}
        <button
          type="submit"
          className="size-[50px] rounded-full bg-black flex justify-center items-center !important text-white"
        >
          <Search />
        </button>
      </div>
    </Form>
  );
}

export default searchBlog;
