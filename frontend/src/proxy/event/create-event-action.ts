"use server";

import { EventDataDto } from "@/dtos/event-data.dto";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function createEventAction(
  formData: FormData,
  formDataRole: FormData
) {
  // get token from cookie
  const cookiesList = cookies();
  const token = cookiesList.get("token");
  if (!token?.value) {
    redirect("signin");
  }

  try {
    const createRes = await fetch(`${process.env.BACKEND_URL}/event`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    });

    const eventData: EventDataDto = await createRes.json();

    if (!createRes.ok) {
      const errorResponse = await createRes.text(); // Capture the error message
      console.error("Error response:", errorResponse);
      throw Error(errorResponse);
    }

    revalidateTag("event");

    // FETCH HERE
    const rolesValue = formDataRole.get("roles"); // This will be FormDataEntryValue (string | File)

    if (typeof rolesValue === "string") {
      try {
        // Parse rolesValue into an object or array
        const parsedRoles:
          | { assignedUserId: string; role: string }
          | { assignedUserId: string; role: string }[] = JSON.parse(rolesValue);

        // Ensure parsedRoles is an array for consistent processing
        const rolesArray = Array.isArray(parsedRoles)
          ? parsedRoles
          : [parsedRoles];

        // Iterate through roles and make API calls
        for (const role of rolesArray) {
          try {
            const response = await fetch(
              `${process.env.BACKEND_URL}/event/assignRole/${eventData.id}`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token?.value}`,
                },
                body: JSON.stringify(role),
              }
            );

            if (!response.ok) {
              const error = await response.json();
              console.error(`Failed to assign role: ${error.message}`);
            } 
          } catch (fetchError) {
            console.error("Error during API call:", fetchError);
          }
        }
      } catch (parseError) {
        console.error("Failed to parse rolesValue:", parseError);
      }
    } else {
      console.error("rolesValue is not a string");
    }

    // const ratingRes = await fetch(
    //   `${process.env.BACKEND_URL}/event/assignRole/${eventData.id}`,
    //   {
    //     method: "POST",
    //     body:{

    //     }
    //   }
    // );
  } catch (error: any) {
    return {
      message: "ERROR",
    };
  }
  redirect("coordinated-events/upcoming");
}
