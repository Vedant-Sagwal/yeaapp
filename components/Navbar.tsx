import Link from "next/link"
import Image from "next/image"
import { auth, signOut, signIn } from "@/auth"

const Navbar = async () => {

  //to check whether a user is logged in or not
  const session = await auth()

  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.png" alt="" width={70} height={25} />
        </Link>
        <div className="flex items-center gap-5 text-black">
          {session && session?.user ? (
            <>
              <Link href="/writeup/create">
                <span>Create </span>
              </Link>

              <form action={async () => {
                'use server'
                await signOut({ redirectTo: "/" });
              }}>
                <button type="submit">Logout</button>
              </form>

              <Link href={`/user/${session?.id}`}>
                <span>{session?.user?.name}</span>
              </Link>
            </>
          ) : (
            <form action={async () => {
              "use server";

              await signIn('github');
            }
            }>
              <button type="submit">Login</button>
            </form>
          )}
        </div>
      </nav>
    </header >
  )
}

export default Navbar
