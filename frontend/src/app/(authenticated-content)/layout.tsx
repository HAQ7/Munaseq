import Menu from '@/components/authenticated-content/menu';
import Image from 'next/image';
import logo from '@/assets/logo/munaseq-logo.svg';
import Link from 'next/link';
import Button from '@/components/common/button';
import deco from '@/assets/auth-content-assets/deco.svg';
import MenuMobile from '@/components/authenticated-content/menu-mobile';
import logoSmall from '@/assets/logo/munaseq-icon-dark-lines.svg';

export default function AuthContentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className=" flex grid-cols-2">
      <div className="h-screen w-[22rem] lg:block hidden">
        <Menu />
      </div>
      <div className="relative flex-1">
        <header className="flex items-center lg:justify-end justify-center lg:px-10 px-2 my-10 gap-2 w-full">
          <div className="lg:hidden block">
            <MenuMobile />
          </div>
          <Image
            src={deco}
            alt="deco"
            className="absolute -right-32 top-0 -z-10 min-w-96 sm:block hidden"
            priority
          />
          <div className="lg:w-3/4 max-w-[500px] lg:min-w-[300px] lg:mx-auto bg-white rounded-full shadow-md w-full flex items-center p-2 ">
            <input
              placeholder="ابحث عن فعالية"
              type="text"
              className="outline-none w-full flex-1 px-2"
            />
            <Button gradient className="px-5 h-8">
              بحث
            </Button>
          </div>
          <Link href="/" className="">
            <Image
              priority
              className="w-52 2xl:block hidden "
              src={logo}
              alt="Munaseq logo"
            />
            <Image
              priority
              className="min-w-14 w-14 block 2xl:hidden "
              src={logoSmall}
              alt="Munaseq logo"
            />
          </Link>
        </header>
        <div className="xl:px-20 px-5">{children}</div>
      </div>
    </section>
  );
}
