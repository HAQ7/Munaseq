import React from "react";
import logo from "@/assets/logo/munaseq-logo-dark-white.svg";
import Image from "next/image";
export default function footerSection() {
  return (
    <div>
      <footer
        id="footer"
        className="bg-gradient-to-l from-primary to-secondary"
      >
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <a href="" className="mb-4 sm:mb-0">
              <Image
                priority
                className="sm:w-52 w-40"
                src={logo}
                alt="Munaseq logo"
              />
            </a>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-normal text-white sm:mb-0">
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  حول منسق
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  سياسة الخصوصية
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  الرئيسية
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  تسجيل
                </a>
              </li>
            </ul>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
          <span className="block text-sm text-white sm:text-center">
            جميع الحقوق محفوظة منصة منسق 2024 ©
          </span>
        </div>
      </footer>
    </div>
  );
}
