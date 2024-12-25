import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function PATCH(
  req: Request,
  { params }: { params: { serverid: string } }
) {
  try {
    const { serverid } = await params;
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!serverid) {
      return new NextResponse("Server Id Missing", { status: 500 });
    }

    const { name, imageUrl } = await req.json();
    const server = await db.server.update({
      where: {
        id: params.serverid,
        profileId: profile.id,
      },

      data: {
        name,
        imageUrl,
      },
    });
    return NextResponse.json(server);
  } catch (error) {
    console.log("SERVER_ID_PATCH : ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { serverid: string } }
) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const server = await db.server.delete({
      where: {
        id: params.serverid,
        profileId: profile.id,
      },
    });
    return NextResponse.json(server);
  } catch (error) {
    console.log("SERVER_ID_DELETE : ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
