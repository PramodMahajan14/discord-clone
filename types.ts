import { Member, Profile, Server } from "@prisma/client";

export type ServerWithMemebersWithProfiles = Server & {
  members: (Member & { profile: Profile })[];
};
