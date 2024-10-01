'use client'
import LogoLoading from '@/components/common/logo-loading';

export default function Loading() {
  return (
    <div className='h-full w-full grid place-items-center'>
      <LogoLoading className="w-32" />
    </div>
  );
}
