'use client';

import Image from 'next/image';
import logoIcon from '@/assets/logo/logo-small-white.svg';
import munaseq from '@/assets/logo/munaseq-text.svg';
import logo from '@/assets/logo/munaseq-logo.svg';
import TextField from '@/components/common/text-field';
import { motion, Transition, useAnimate } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signinAction } from '@/proxy/signin-action';
import { useState, useRef, useEffect } from 'react';
import { useFormState } from 'react-dom';
import SubmitButton from '@/components/auth/submit-button';

export default function SignIn() {
  const [scope, animate] = useAnimate();
  const [formError, setFormError] = useState([] as string[]);
  const [error, formAction] = useFormState(signinAction, { message: '' });
  const emailRef = useRef({} as HTMLInputElement);
  const passwordRef = useRef({} as HTMLInputElement);
  const router = useRouter();

  useEffect(() => {
    if (error?.message) {
      setFormError([...formError, error.message]);
    }
  }, [error]);

  const animation = {
    x: 0,
    opacity: 1,
  };
  const transition: Transition = {
    type: 'spring',
    duration: 0.5,
    bounce: 0,
  };

  // This function will be called when the user clicks on the sign up button and handles the transition to the sign up page
  const transitionToSignUpHandler = async () => {
    animate(
      '#card',
      {
        x: '50%',
        opacity: 0,
      },
      { type: 'spring', duration: 0.5, bounce: 0 }
    );

    await new Promise((resolve) => setTimeout(resolve, 500));

    router.push('/signup');
  };

  const checkEmailNotEmpty: () => boolean = () => {
    if (emailRef.current.value.length < 3) {
      if (!formError.includes('EMAIL_EMPTY')) {
        setFormError((prev) => [...prev, 'EMAIL_EMPTY']);
      }
      return false;
    }
    setFormError((prev) => prev.filter((e) => e !== 'EMAIL_EMPTY'));
    return true;
  };

  const checkPasswordNotEmpty: () => boolean = () => {
    if (passwordRef.current.value.length < 3) {
      if (!formError.includes('PASSWORD_EMPTY')) {
        setFormError((prev) => [...prev, 'PASSWORD_EMPTY']);
      }
      return false;
    }
    setFormError((prev) => prev.filter((e) => e !== 'PASSWORD_EMPTY'));
    return true;
  };

  const getErrorMessage: (error: string) => string = (error) => {
    switch (error) {
      case 'AUTHENTICATION_FAILED':
        return 'خطأ في البريد الالكتروني أو كلمة المرور';
      case 'EMAIL_EMPTY':
        return 'البريد الالكتروني لا يمكن أن يكون فارغاً';
      case 'PASSWORD_EMPTY':
        return 'كلمة المرور لا يمكن أن تكون فارغة';
      default:
        return 'حدث خطأ, الرجاء المحاولة في وقت لاحق';
    }
  };

  const formSubmitHandler = (e: any) => {
    e.preventDefault();
    if (!checkEmailNotEmpty() || !checkPasswordNotEmpty()) {
      return;
    }
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    formAction(formData);
  };

  return (
    <div ref={scope}>
      <motion.div
        initial={{ x: '50%', opacity: 0 }}
        animate={animation}
        transition={transition}
        id="card"
        className="bg-white w-[min(900px,90vw)] min-h-[600px] shadow-strong rounded-[50px] md:p-14 p-8 overflow-hidden grid"
      >
        <div className="grid md:grid-cols-2 md:gap-0 gap-3 h-full place-items-center relative">
          <Link className="md:hidden" href={'/'}>
            <div className="md:hidden grid ">
              <Image src={logo} className="w-64" alt="logo" />
            </div>
          </Link>
          <motion.div
            layout
            className="w-full md:p-10 flex flex-col items-center exit-right"
          >
            <motion.h1 layout className="font-bold text-3xl text-center">
              {' '}
              أهلاً بعودتك 👋
            </motion.h1>
            <form onSubmit={formSubmitHandler} className="max-w-96 w-full">
              <motion.div layout>
                <TextField
                  ref={emailRef}
                  placeholder="الايميل الالكتروني"
                  name="email"
                  className="w-full"
                  onBlur={checkEmailNotEmpty}
                  error={formError.includes('EMAIL_EMPTY')}
                />
                <TextField
                  ref={passwordRef}
                  type="password"
                  placeholder="كلمة المرور"
                  name="password"
                  onBlur={checkPasswordNotEmpty}
                  error={formError.includes('PASSWORD_EMPTY')}
                />
              </motion.div>
              {formError.length > 0 && (
                <motion.div
                  layout
                  animate={{ y: 0, opacity: 1 }}
                  initial={{ y: 12, opacity: 0 }}
                  transition={{ delay: 0.225 }}
                  className="text-red-500 text-center mt-5"
                >
                  {getErrorMessage(formError[0])}
                </motion.div>
              )}
              <motion.div
                layout
                className="mt-5 grid place-items-center relative h-10"
              >
                <SubmitButton>تسجيل الدخول</SubmitButton>
              </motion.div>
            </form>
            <motion.p layout className="mt-4 text-[#949494]">
              ليس لديك حساب؟{' '}
              <span
                onClick={transitionToSignUpHandler}
                className="text-primary text-nowrap cursor-pointer"
              >
                أنشئ حسابك الآن!
              </span>
            </motion.p>
          </motion.div>
          <Link className="w-full h-full" href={'/'}>
            <div className="w-full h-full rounded-[50px] bg-gradient-to-br from-primary to-secondary overflow-hidden items-center md:flex flex-col justify-center gap-14 hidden ">
              <Image src={logoIcon} className="w-32" alt="logo" />
              <Image src={munaseq} className="w-48" alt="munaseq" />
            </div>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
