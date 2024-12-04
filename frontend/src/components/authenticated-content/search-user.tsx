// "use client";

// import { useState, useEffect } from "react";
// // import { Input } from "@/components/common/shadcn-ui/input";
// import { Card } from "@/components/common/shadcn-ui/card";
// // import Button from "@/components/common/button";
// import LogoLoading from "../common/logo-loading";
// import getUsersAction from "@/proxy/get-user-using-username-action";  // New proxy function to fetch users
// import { UserDataDto } from "@/dtos/user-data.dto";  // New data DTO for user
// import Link from "next/link";

// const SearchComponent = () => {
//     const [searchTerm, setSearchTerm] = useState("");
//     const [results, setResults] = useState([] as UserDataDto[]); // Change to store users
//     const [isLoading, setIsLoading] = useState(false);
//     const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

//     // Debounce search term
//     useEffect(() => {
//         const timer = setTimeout(() => {
//             setDebouncedSearchTerm(searchTerm);
//         }, 500); // 500ms delay

//         return () => clearTimeout(timer);
//     }, [searchTerm]);

//     // Perform search when debounced term changes
//     useEffect(() => {
//         const performSearch = async () => {
//             if (!debouncedSearchTerm) {
//                 setResults([]);
//                 return;
//             }

//             setIsLoading(true);

//             const userList: UserDataDto[] = await getUsersAction();  // Fetch users instead of events
//             const searchResults = userList.filter(user =>
//                 user.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())  // Filter by user name
//             );

//             setResults(searchResults);
//             setIsLoading(false);
//         };

//         performSearch();
//     }, [debouncedSearchTerm]);

//     return (
//         <div className="mx-auto space-y-2 relative lg:w-3/4 max-w-[500px] lg:min-w-[300px] w-full">
//             <div className="w-full lg:mx-auto bg-white rounded-full shadow-md flex items-center p-3 ">
//                 <input
//                     placeholder="ابحث عن مستخدم"
//                     type="text"
//                     value={searchTerm}
//                     onChange={e => setSearchTerm(e.target.value)}
//                     className="outline-none w-full flex-1 px-2"
//                 />
//             </div>
//             <div className="absolute grid place-items-center w-full bg-white z-10 shadow-lg rounded-2xl ">
//                 {isLoading && (
//                     <div className="grid place-items-center">
//                         <LogoLoading className={"w-14 aspect-square"} />
//                     </div>
//                 )}

//                 {!isLoading && results.length > 0 && (
//                     <Card className="divide-y w-full flex-col">
//                         {results.map((result, index) => (
//                             <Link
//                                 href={`/user/${result.id}`}  // Assuming user profile page URL
//                                 className="p-3 cursor-pointer hover:bg-[hsl(0,0,90)] block"
//                                 key={index}
//                                 onClick={() => setSearchTerm("")}
//                             >
//                                 {result.name}
//                             </Link>
//                         ))}
//                     </Card>
//                 )}

//                 {!isLoading && debouncedSearchTerm && results.length === 0 && (
//                     <p className="text-center text-gray-500 p-5">
//                         لا توجد نتائج للبحث
//                     </p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default SearchComponent;
