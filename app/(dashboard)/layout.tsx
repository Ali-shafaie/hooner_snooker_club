import Link from "next/link";
import Image from "next/image";
import Navbar from "components/ui/Navbar";
import Sidebar from "components/ui/Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <main className="w-full h-full">
      <Navbar />
      {/*********************** * The Sidebar section starts ************************************/}

      <section className="relative flex">
        <Sidebar />
        {/* *********** * Content Starts *********************** */}
        <div className="mr-0 md:mr-64 pt-12 min-h-screen flex-1">
          {children}
        </div>
      </section>

      {/************* The Sidebar section ends ********************/}

      {/*************  Footer Section Starts  *******************/}

      <section className="footer text-white bg-green-700 py-10">
        <div className="container grid md:grid-cols-3 lg:grid-cols-4">
          <div></div>
          <div className="flex flex-col justify-center items-center gap-2">
            <Link href={"/"}>
              <p className="hover:underline hover:text-green-600">صفحه اصلی</p>
            </Link>
            <Link href={"/"}>
              <p className="hover:underline hover:text-green-600">منیو ها</p>
            </Link>
            <Link href={"/"}>
              <p className="hover:underline hover:text-green-600">تنظیمات</p>
            </Link>
          </div>

          <div className="flex flex-col justify-between items-center gap-2">
            <Link href={"/"}>
              <p className="hover:underline hover:text-green-600">محصولات</p>
            </Link>
            <Link href={"/"}>
              <p className="hover:underline hover:text-green-600">عواید</p>
            </Link>
            <Link href={"/"}>
              <p className="hover:underline hover:text-green-600">مخارج</p>
            </Link>
          </div>

          <div className="flex flex-col items-center justify-center">
            <Image
              src={"/assets/logopng.png"}
              alt="the logo"
              width={200}
              height={200}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
