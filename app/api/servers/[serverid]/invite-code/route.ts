import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function PATCH(
  req: Request,
  { params }: { params: { serverid: string } }
) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!params.serverid) {
      return new NextResponse("Server Id Missing", { status: 500 });
    }
    const server = await db.server.update({
      where: {
        id: params.serverid,
        profileId: profile.id,
      },

      data: {
        inviteCOde: uuidv4(),
      },
    });
    return NextResponse.json(server);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
