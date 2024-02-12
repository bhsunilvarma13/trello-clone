import { auth, currentUser } from "@clerk/nextjs";
import { Action, Entity_Type } from "@prisma/client";

import { db } from "@/lib/db";

interface Props {
  entityId: string;
  entityType: Entity_Type;
  entityTitle: string;
  action: Action;
}

export const createAuditLog = async (props: Props) => {
  try {
    const { orgId } = auth();
    const user = await currentUser();

    if (!user || !orgId) {
      throw new Error("User not found!");
    }

    const { entityId, entityType, entityTitle, action } = props;

    await db.auditLog.create({
      data: {
        orgId,
        entityId,
        entityType,
        entityTitle,
        action,
        userId: user.id,
        userImage: user.imageUrl,
        userName: user?.firstName + " " + user?.lastName,
      },
    });
  } catch (error) {
    console.log("[AUDIT_LOG_ERROR]", error);
  }
};
