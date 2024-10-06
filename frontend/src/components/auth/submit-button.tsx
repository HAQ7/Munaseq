import { useFormStatus } from 'react-dom';
import Button from '../common/button';
import LogoLoading from '../common/logo-loading';

export default function SubmitButton({ children }: { children: any }) {
  const { pending, data }: { pending: boolean, data: any } = useFormStatus();
  console.log(data);

  if (!pending) {
    return <Button className="shadow-xl w-full">{children}</Button>;
  }
  return <LogoLoading className={'w-14 aspect-square absolute'} />;
}
