"use server";

// export default async function getUserAction(username: string) {
//   try {
//     const response = await fetch(
//       `${process.env.BACKEND_URL}/user/username/${username}`,
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     if (!response.ok) {
//       throw Error("user not found");
//     }
//     const responseJson = await response.json();
//     return responseJson;
//   } catch (error) {
//     return undefined;
//   }
// }

export default async function getUserAction(username?: string) {
  try {
    const url = new URL(`${process.env.BACKEND_URL}/user`);
    const params = new URLSearchParams();

    if (username) {
      params.append("username", username);
    }

    url.search = params.toString();

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("User not found");
    }
    const responseJson = await response.json();
    console.log(responseJson);
    return responseJson;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}
