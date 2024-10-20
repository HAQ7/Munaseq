'use client';

import TextField from '@/components/common/text-field';
import Tag from '@/components/common/tag';
import Subtitle from '@/components/common/subtitle';
import TextArea from '@/components/common/text-area';
import Label from '@/components/common/lable';
import Radio from '@/components/common/radio-group';
import AddTagDropdown from '@/components/common/add-tag-dropdown';
import { UserDataDto } from '@/dtos/user-data.dto';
import Image from 'next/image';
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/common/shadcn-ui/input';
import Button from '@/components/common/button';

export default function EditForm({ userData }: { userData: UserDataDto }) {
  const [selectedCatagories, setSelectedCatagories] = useState(
    userData.categories
  );
  const [image, setImage] = useState(userData.profilePictureUrl);
  const ref = useRef({} as HTMLInputElement);

  const handleImageUpload = (e: any) => {
    if (e.target.files.length === 0) {
      return;
    }
    setImage(URL.createObjectURL(e.target.files[0]));
  };
  return (
    <>
      <div className="grid grid-cols-1 gap-10">
        <Subtitle>المعلومات الاساسية</Subtitle>
        <div className="w-56">
          <TextField
            placeholder="الاسم المستخدم"
            name="username"
            defaultValue={userData.username}
          />
          <TextField
            placeholder="البريد الالكتروني"
            name="email"
            defaultValue={userData.email}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-10">
        <Subtitle>معلومات الملف الشخصية</Subtitle>

        <div className="max-w-96 w-full grid grid-cols-1 gap-10">
          <div className="grid grid-cols-2 gap-10">
            <TextField
              placeholder="الاسم الاول"
              name="firstName"
              defaultValue={userData.firstName}
            />
            <TextField
              placeholder="الاسم الاخير"
              name="lastName"
              defaultValue={userData.lastName}
            />
          </div>
          <TextField
            placeholder="الاسم المعروض"
            name="visibleName"
            defaultValue={userData.visibleName}
          />
          <Label label="صورة الملف الشخصي">
            <motion.div className="grid gap-3 mt-5">
              <motion.label
                layout
                htmlFor="profileImage"
                className="block text-lg text-custom-gray text-md"
              >
                صورة العرض
              </motion.label>

              {image ? (
                <div className="flex items-center gap-5">
                  <motion.div
                    layout
                    className="w-20 aspect-square relative rounded-full overflow-hidden"
                  >
                    <Image src={image} alt="preview" fill />
                  </motion.div>
                  <motion.button
                    layout
                    className="rounded-3xl p-2"
                    onClick={(e) => {
                      e.preventDefault();
                      ref.current.click();
                    }}
                  >
                    تغيير الصورة
                  </motion.button>
                </div>
              ) : null}
              <Input
                name="profileImage"
                id="profileImage"
                type="file"
                className={'cursor-pointer ' + (image ? 'hidden' : '')}
                accept="image/png, image/jpeg , image/jpg"
                onChange={handleImageUpload}
                ref={ref}
              />
            </motion.div>
          </Label>
          <TextArea
            placeholder="الوصف"
            name="description"
            defaultValue={userData.description}
          ></TextArea>
        </div>
        <div className="grid gap-3 mt-5">
          <label className="block text-lg text-custom-gray">الجنس</label>
          <Radio name={'gender'} options={['ذكر', 'انثى']} />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-10">
        <Subtitle>الاهتمامات</Subtitle>

        <motion.div layout className="flex flex-wrap gap-2">
          {selectedCatagories.map((category) => (
            <Tag
              onClick={() => {
                if (selectedCatagories.length === 1) {
                    return
                }
                setSelectedCatagories((prevState) => {
                  return prevState.filter((t) => t !== category);
                });
              }}
              checked
              active
              key={category}
            >
              {category}
            </Tag>
          ))}
          <motion.div layout className="grid place-items-center">
            <AddTagDropdown
              onTagSelect={(tag: string) => {
                if (selectedCatagories.includes(tag)) {
                  return;
                }
                setSelectedCatagories((prevState) => [...prevState, tag]);
              }}
            />
          </motion.div>
        </motion.div>
        <motion.div layout className="flex justify-between">
          <Button className="bg-transparent !text-custom-gray hover:!text-white">
            الغاء
          </Button>
          <Button gradient className="shadow-xl px-9 ">
            تثبيت
          </Button>
        </motion.div>
      </div>
    </>
  );
}
