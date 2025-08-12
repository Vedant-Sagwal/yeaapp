import BlogForm from "@/components/BlogForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth();

  if (!session) redirect("/");

  return (
    <>
      <section className="w-full bg-primary min-h-[530px] pattern flex justify-center items-center flex-col py-10 px-6 !min-h-[230px]">
        <h1 className="uppercase bg-[#eb6f92] px-6 py-3 font-work-sans font-extrabold text-black sm:text-[54px] sm:leading-[64px] text-[36px] leading-[46px] max-w-5xl text-center my-5">Submit Your Writeup</h1>
      </section>

      <BlogForm />
    </>
  );
};

export default Page;
