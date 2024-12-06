import Image from 'next/image';
import userCircle from '@/assets/icons/user-circle.svg';
import Link from 'next/link';
import edit from '@/assets/icons/edit.svg';
import Subtitle from '@/components/common/subtitle';
import { cookies } from 'next/headers';
import getProfileAction from '@/proxy/user/get-profile-action';
import { notFound, redirect } from 'next/navigation';
import tag from '@/assets/auth-content-assets/tag.svg';
import rateIcon from '@/assets/auth-content-assets/Rate-Icon.svg';
import XIcon from '@/assets/auth-content-assets/X-Icon.svg';
import linkedinIcon from '@/assets/auth-content-assets/Linkedin-Icon.svg';
import cvIcon from '@/assets/auth-content-assets/CV-Icon.svg';
import emailIcon from '@/assets/auth-content-assets/Email-Icon.svg';
import Tag from '@/components/common/category';
import { UserDataDto } from '@/dtos/user-data.dto';
import getUserAction from '@/proxy/user/get-user-using-username-action';

export function generateMetadata({
  params,
}: {
  params: { username: string };
}) {
  return {
    title: params.username,
  };
}

export default async function UserProfile({
  params,
}: {
  params: { username: string };
}) {
  const username = params.username;
  const cookiesStore = cookies();
  const token = cookiesStore.get('token');
  let data: UserDataDto;
  if (token) {
    data = await getUserAction(username);
    if (!data) {
      notFound();
    }
    const profile: UserDataDto = await getProfileAction();
    const hisProfile: boolean = data.username === profile.username;
    data.socialAccounts = JSON.parse(data.socialAccounts as string);
    return (
      <section>
        {hisProfile && (
          <div className="flex gap-5 w-full justify-between">
            <Link
              href="/account"
              className="bg-black text-white p-3 rounded-full font-bold"
            >
              معلومات الحساب
            </Link>
            <Link href={'/account/edit'} className="grid place-items-center">
              <Image src={edit} alt="edit icon" className="w-10" />
            </Link>
          </div>
        )}
        <div className="flex justify-between items-center mt-5">
          <div className="flex gap-5 items-center">
            <div className="lg:w-32 w-24 aspect-square relative rounded-full overflow-hidden">
              {data.profilePictureUrl ? (
                <Image
                  src={data.profilePictureUrl}
                  alt="preview"
                  fill
                  priority
                />
              ) : (
                <Image
                  src={userCircle}
                  alt="user-circle"
                  fill
                  priority
                  className="w-auto"
                />
              )}
            </div>
            <div className="mt-2">
              <div className="flex gap-3">
                <div className="font-bold text-nowrap overflow-ellipsis overflow-hidden max-w-96 text-3xl">
                  {data.firstName + ' ' + data.lastName}
                </div>
              </div>

              <div className="text-custom-gray text-nowrap overflow-ellipsis overflow-hidden max-w-96 text-xl">
                {data.username}
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-3 mt-3">
          {data.cvUrl && (
            <a href={data.cvUrl} target="_blank" rel="noopener noreferrer">
              <Image
                src={cvIcon}
                alt="CV icon"
                className="w-10 cursor-pointer"
              />
            </a>
          )}
          {data.email && (
            <a href={`mailto:${data.email}`}>
              <Image
                src={emailIcon}
                alt="email icon"
                className="w-10 cursor-pointer"
              />
            </a>
          )}
        </div>
        <div className="mt-5 flex gap-24">
          {/* <div>
            <Image src={rateIcon} alt="rating icon" className="w-10" />
            RATING
          </div> */}

          <div className="flex gap-3">
            {data.socialAccounts?.linkedinLink && (
              <a
                href={data.socialAccounts.linkedinLink}
                className="cursor-pointer"
              >
                <Image
                  src={linkedinIcon}
                  alt="linkedin icon"
                  className="w-10"
                />
              </a>
            )}
            {data.socialAccounts?.xLink && (
              <a href={data.socialAccounts.xLink} className="cursor-pointer">
                <Image src={XIcon} alt="X icon" className="w-10" />
              </a>
            )}
          </div>
        </div>

        <div className="mt-5 flex gap-1">
          <Image src={tag} alt="catigory icon" className="w-10" />
          <div className="flex flex-wrap gap-1">
            {data.categories.map((category: string) => {
              return <Tag key={category}>{category}</Tag>;
            })}
          </div>
        </div>
        <Subtitle>الوصف</Subtitle>
        {data.description ? (
          <p className="p-5 w-full">{data.description}</p>
        ) : (
          <p className="p-5 text-gray-500">لا يوجد وصف للمستخدم</p>
        )}
      </section>
    );
  }
  redirect('/signin');
}
