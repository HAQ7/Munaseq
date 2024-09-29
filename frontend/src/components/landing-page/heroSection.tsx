"use client";
import React from "react";
import Button from "../common/button";
import Image from "next/image";
import userIcon from "@/assets/land-assets/user-icon.svg";
import eventIcon from "@/assets/land-assets/event-icon.svg";
import effect from "@/assets/land-assets/landing-page-effect.svg";
import titleEffect from "@/assets/land-assets/title-effect.svg";
import userImage from "@/assets/land-assets/user-testimonial-1.svg";
import glow from "@/assets/land-assets/glow.svg";
import { Calendar } from "@/components/common/shadcn-ui/calendar";
import { motion } from "framer-motion";
import AnimatedCounter from "../common/animatedCounter";


export default function HeroSection() {
    return (
        <motion.div animate="animate" className="h-[90vh] relative">
            <div className="flex justify-center items-center h-[80vh] px-8">
                <div className="absolute bottom-[15%] left-[10%] -z-10 hidden md:block">
                    <Image src={glow} alt="" />
                </div>
                <motion.div
                    className="text-center max-w-xl"
                    variants={{
                        animate: { opacity: 1, y: 0 },
                    }}
                    initial={{ opacity: 0, y: 50 }}
                >
                  <Image src={titleEffect} className="absolute -z-10 lg:block hidden" alt='effect'/>
                    <h1 className="text-gray-900 text-5xl font-bold mb-4 leading-snug">
                        ننسق{" "}
                        <span className="bg-gradient-to-l from-primary to-secondary bg-clip-text text-transparent">
                            فعالياتك التعليمية{" "}
                        </span>
                        من الاف الى الياء
                    </h1>
                    <p className="text-gray-500 text-lg font-light mb-4">
                        منسق هي منصة متكاملة لإدارة الفعاليات التعليمية الحضورية
                        و الالكترونية مثل الدورات و ورش العمل و المحاضرات
                    </p>
                    <div className="flex justify-center">
                        <Button gradient>انضم الينا</Button>
                    </div>
                </motion.div>
            </div>

            <motion.div
                className="absolute top-[10%] left-[10%] hidden md:block"
                variants={{ animate: { opacity: 1, x: 0 } }}
                initial={{ opacity: 0, x: -100 }}
                transition={{ delay: 0.2 }}
            >
                <motion.div
                    className="w-48 h-48 bg-white border border-gray-200 rounded-3xl shadow-xl text-center flex flex-col items-center justify-center"
                    animate={{
                      y: [0, -10, 0],
                      transition: { repeat: Infinity, duration: 5, delay: 1 },
                  }}
                >
                    <AnimatedCounter from={0} to={2874} />
                    <p className="font-light text-xl text-gray-500">مستفيد</p>
                    <Image src={userIcon} alt={""} />
                </motion.div>
            </motion.div>

            <motion.div
                className="absolute top-[15%] right-[10%] hidden md:block"
                variants={{ animate: { opacity: 1, x: 0 } }}
                initial={{ opacity: 0, x: 100 }}
                transition={{ delay: 0.4 }}
            >
                <motion.div
                    className="w-48 h-48 bg-white border border-gray-200 rounded-3xl shadow-xl text-center flex flex-col items-center justify-center"
                    animate={{
                      y: [0, 10, 0],
                      transition: { repeat: Infinity, duration: 5, delay: 1 },
                  }}
                >
                    <AnimatedCounter from={0} to={361} />
                    <p className="font-light text-xl text-gray-500">فعاليه</p>
                    <Image src={eventIcon} alt={""} />
                </motion.div>
            </motion.div>

            <motion.div
                className="absolute top-[60%] left-[12%] hidden md:block"
                variants={{ animate: { opacity: 1, x: 0 } }}
                initial={{ opacity: 0, x: -100 }}
                transition={{ delay: 0.6 }}
            >
                <motion.div
                    className="w-80 max-w-md p-4 bg-white border border-gray-200 rounded-3xl shadow-xl sm:p-4"
                    animate={{
                      y: [0, 10, 0],
                      transition: { repeat: Infinity, duration: 5, delay: 1 },
                  }}
                >
                    <div className="flow-root">
                        <ul role="list" className="divide-y divide-gray-200">
                            <li className="py-3 sm:py-2">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <Image
                                            className="w-10 h-10 rounded-full"
                                            src={userImage}
                                            alt=""
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0 ms-4">
                                        <p className="text-sm font-medium text-gray-900 truncate">
                                            حسام القنام
                                        </p>
                                        <p className="text-sm text-gray-500 truncate">
                                            خدمة جميله جداً وتصميم الموقع أجمل
                                        </p>
                                    </div>
                                </div>
                            </li>
                            <li className="py-3 sm:py-2">
                                <div className="flex items-center ">
                                    <div className="flex-shrink-0">
                                        <Image
                                            className="w-10 h-10 rounded-full"
                                            src={userImage}
                                            alt=""
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0 ms-4">
                                        <p className="text-sm font-medium text-gray-900 truncate">
                                            هشام السحباني
                                        </p>
                                        <p className="text-sm text-gray-500 truncate">
                                            خدمة جميله جداً وتصميم الموقع أجمل
                                        </p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </motion.div>
            </motion.div>

            <motion.div
                className="absolute top-[55%] right-[15%] hidden md:block"
                variants={{ animate: { opacity: 1, x: 0 } }}
                initial={{ opacity: 0, x: 100 }}
                transition={{ delay: 0.8 }}
            >
                <motion.div
                    className="bg-white border border-gray-200 rounded-3xl shadow-xl py-4 px-6"
                    animate={{
                      y: [0, -10, 0],
                      transition: { repeat: Infinity, duration: 5, delay: 1 },
                  }}
                >
                    <h5 className="text-2xl font-semibold tracking-tight bg-gradient-to-l from-primary to-secondary bg-clip-text text-transparent text-center mb-2">
                        نسق فعالياتك بسهوله
                    </h5>
                    <Calendar />
                </motion.div>
            </motion.div>

            <div className="absolute -top-[10%] left-0 -z-10">
                <Image src={effect} alt="" />
            </div>
        </motion.div>
    );
}
