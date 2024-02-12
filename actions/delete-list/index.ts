"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { DeleteListSchema } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { Action, Entity_Type } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { id, boardId } = data;

  let list;

  try {
    list = await db.list.delete({
      where: {
        id,
        boardId,
        board: {
          orgId,
        },
      },
    });

    await createAuditLog({
      entityTitle: list.title,
      entityId: list.id,
      entityType: Entity_Type.LIST,
      action: Action.DELETE,
    });
  } catch (error) {
    return {
      error: "Failed to delete list",
    };
  }

  revalidatePath(`/boards/${boardId}`);
  return { data: list };
};

export const deleteList = createSafeAction(DeleteListSchema, handler);
