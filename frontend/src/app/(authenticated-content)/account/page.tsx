import { Metadata } from "next";
import Title from "@/components/common/title";
import userIcon from "@/assets/icons/user-gradiant.svg";
import editIcon from "@/assets/icons/edit.svg";
import Image from "next/image";
import userCircle from "@/assets/icons/user-circle.svg";
import Label from "@/components/common/lable";
import Subtitle from "@/components/common/subtitle";
import Category from "@/components/common/category";
import { cookies } from "next/headers";
import getProfileAction from "@/proxy/user/get-profile-action";
import cvIcon from "@/assets/auth-content-assets/CV-Icon.svg";
import { redirect } from "next/navigation";
import { UserDataDto } from "@/dtos/user-data.dto";
import Link from "next/link";

export const metadata: Metadata = {
  title: "معلومات الحساب",
};

export default async function Account() {
  const cookiesStore = cookies();
  const token = cookiesStore.get("token");
  let data: UserDataDto;

  if (token) {
    data = await getProfileAction(token.value);
    data.socialAccounts = JSON.parse(data.socialAccounts as string);
    return (
      <section className="relative pb-10">
        <Title>
          <Link className="absolute left-0" href={"account/edit"}>
            <Image className=" left-0 w-10" src={editIcon} alt="edit icon" />
          </Link>
          <Image src={userIcon} className="sm:w-14 w-10" alt="" />
          <span>معلومات الحساب</span>
        </Title>
        <div className="grid grid-cols-1 gap-10">
          <div className="grid grid-cols-1 gap-10">
            <Subtitle>المعلومات الاساسية</Subtitle>

            <Label label="الاسم المستخدم">{data.username}</Label>
            <Label label="البريد الالكتروني">{data.email}</Label>
          </div>
          <div className="grid grid-cols-1 gap-10">
            <Subtitle>معلومات الملف الشخصية</Subtitle>

            <div className="flex gap-10 ">
              <Label label="الاسم الاول">{data.firstName}</Label>
              <Label label="الاسم الاخير">{data.lastName}</Label>
            </div>
            <Label label="الاسم المعروض">
              {data.visibleName !== "null" ? data.visibleName : ""}
            </Label>
            <Label label="صورة الملف الشخصي">
              {data.profilePictureUrl ? (
                <Image
                  src={data.profilePictureUrl}
                  alt="preview"
                  priority
                  width={80}
                  height={80}
                  className="rounded-full aspect-square"
                />
              ) : (
                <Image
                  src={userCircle}
                  alt="user-circle"
                  priority
                  className="w-20"
                />
              )}
            </Label>
            <Label label="السيرة الذاتيه">
              {data.cvUrl ? (
                <a href={data.cvUrl} target="_blank" rel="noopener noreferrer">
                  <Image
                    src={cvIcon}
                    alt="CV icon"
                    className="w-10 cursor-pointer"
                  />
                </a>
              ) : (
                ""
              )}
            </Label>

            <Label label="رابط X">{data.socialAccounts?.xLink || ""}</Label>
            <Label label="رابط LinkedIn">
              {data.socialAccounts?.linkedinLink || ""}
            </Label>
            <Label label="الوصف" className={""}>
              {data.description}
            </Label>
            <Label label="الجنس">
              {data.gender === "MALE" ? "ذكر" : "انثى"}
            </Label>
          </div>
          <div className="grid grid-cols-1 gap-10">
            <Subtitle>الاهتمامات</Subtitle>

            <div className="flex flex-wrap gap-2">
              {data.categories.map((category) => (
                <Category key={category}>{category}</Category>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }
  redirect("/signin");
}
