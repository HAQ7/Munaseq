import user from '@/assets/icons/user.svg'
import userCircle from '@/assets/icons/user-circle.svg'
import check from '@/assets/icons/check-circle.svg'
import tag from '@/assets/icons/tag.svg'
import Image from 'next/image'

export default function Progress() {
    return (
        <div className="grid grid-cols-4 place-items-center w-full">
            <Image src={user} alt={'user icon'}/>
            <Image src={userCircle} alt={'user icon'}/>
            <Image src={check} alt={'check icon'}/>
            <Image src={tag} alt={'tag icon'}/>
        </div>
    );
}
