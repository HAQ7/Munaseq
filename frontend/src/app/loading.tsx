'use client'
import LogoLoading from '@/components/common/logo-loading';

export default function Loading() {
  return (
    <div className='w-screen h-screen grid place-items-center'>
      <LogoLoading className="sm:w-32 w-20" />
    </div>
  );
}
