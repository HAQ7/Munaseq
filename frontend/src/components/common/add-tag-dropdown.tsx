'use client';
import user from '@/assets/icons/user-black.svg';
import signout from '@/assets/icons/signout.svg';
import plusIcon from '@/assets/icons/plus-circle.svg';
import { tags } from '@/util/tags';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../common/shadcn-ui/dropdown-menu';
import Link from 'next/link';
import { Separator } from '../common/shadcn-ui/separator';
import Image from 'next/image';

export default function addTagDropdown({
  onTagSelect,
}: {
  onTagSelect: (tag: string) => void;
}) {
  return (
    <DropdownMenu dir="rtl">
      <DropdownMenuTrigger className="absoulte left-2">
        <div className="flex gap-1 px-3">
          <span>اضافة</span>{' '}
          <Image className="w-5 aspect-square" src={plusIcon} alt="add icon" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white relative p-0 h-56 overflow-auto">
        {tags.map((tag) => (
          <div
          key={tag}
            onClick={() => onTagSelect(tag)}
            className="flex gap-3 items-center p-3 transition-colors hover:bg-[#ebebeb] cursor-pointer"
          >
            {tag}
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
