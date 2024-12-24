import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { name, type } = await req.json();

    const { searchParams } = new URL(req.url);

    const serverId = searchParams.get("serverId");

    if (!serverId) {
      return new NextResponse("Server ID missing", { status: 400 });
    }

    if (name === "general") {
      return new NextResponse("Name cannot be 'general", { status: 400 });
    }

    // const server = db.server.update({
    //   where: {
    //     id: serverId,
    //     members: {
    //       some: {
    //         profileId: profile.id,
    //         role: {
    //           in: [MemberRole.ADMIN, MemberRole.MODERATOR],
    //         },
    //       },
    //     },
    //   },
    //   data: {
    //     channels: {
    //       create: {
    //         profileId: profile.id,
    //         name,
    //         type,
    //       },
    //     },
    //   },
    // });

    const memberExists = await db.member.findFirst({
      where: {
        profileId: profile.id,
        serverId: serverId,
        role: {
          in: [MemberRole.ADMIN, MemberRole.MODERATOR],
        },
      },
    });

    if (!memberExists) {
      throw new Error("You do not have permission to add a channel.");
    }

    const updatedServer = await db.server.update({
      where: { id: serverId },
      data: {
        channels: {
          create: {
            profileId: profile.id,
            name,
            type,
          },
        },
      },
    });
    return NextResponse.json(updatedServer);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal_Error", { status: 500 });
  }
}
