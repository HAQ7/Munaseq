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
        <header className="flex items-center justify-center my-10 gap-2 w-full">
          <div className="absolute right-5">
            <MenuMobile />
          </div>
          <Image
            src={deco}
            alt="deco"
            className="absolute -right-32 top-0 -z-10"
          />
          <Link href="/" className="absolute left-5">
            <Image
              priority
              className="w-52 2xl:block hidden "
              src={logo}
              alt="Munaseq logo"
            />
            <Image
              priority
              className="w-14 block 2xl:hidden "
              src={logoSmall}
              alt="Munaseq logo"
            />
          </Link>
          <div className="lg:w-3/4 max-w-[500px] lg:min-w-[300px] bg-white rounded-full shadow-md flex w-full items-center p-2 ">
            <input
              placeholder="ابحث عن فعالية"
              type="text"
              className="outline-none flex-1 ps-2"
            />
            <Button gradient className="px-5 h-8">
              بحث
            </Button>
          </div>
        </header>
        <div className="px-20">{children}</div>
      </div>
    </section>
  );
}
