"use server";

import { cookies } from "next/headers";

export default async function rateEventAction(eventId: string, rating: number) {
  // Get token from cookies
  const cookiesList = cookies();
  const token = cookiesList.get("token");

  if (!token?.value) {
    throw new Error("Unauthorized: User is not signed in.");
  }

  
  

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/event/ratingEvent/${eventId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.value}`,
        },
        next: {
          tags: ['user']
        },
        body: JSON.stringify({ rating: rating }),
      }
    );

    if (!response.ok) {
      const errorResponse = await response.json(); // Capture the error response
      console.error("Error response from API:", errorResponse);
      throw new Error(errorResponse.message || "Failed to submit the rating.");
    }

    const data = await response.json();


    return data; // Return response data to the caller
  } catch (error: any) {
    console.error("Error submitting rating:", error);
    throw new Error(error.message || "An unexpected error occurred.");
  }
}
