import { auth } from "@clerk/nextjs/server";

import { db } from "@/lib/db";

export const currentProfile = async () => {
  try {
    const { userId } = await auth();

    if (!userId) {
      return null;
    }

    const profile = await db.profile.findUnique({
      where: {
        userId,
      },
    });

    return profile;
  } catch (error: any) {
    if (error.name === "FetchError" || error.message.includes("network")) {
      console.error("Network_Error_Occurred:", error.message);
    }
  }
};
