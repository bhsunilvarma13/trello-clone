"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { DeleteCardSchema } from "./schema";
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

  let card;

  try {
    card = await db.card.delete({
      where: {
        id,
        list: {
          board: {
            orgId,
          },
        },
      },
    });

    await createAuditLog({
      entityTitle: card.title,
      entityId: card.id,
      entityType: Entity_Type.CARD,
      action: Action.DELETE,
    });
  } catch (error) {
    return {
      error: "Failed to delete card",
    };
  }

  revalidatePath(`/boards/${boardId}`);
  return { data: card };
};

export const deleteCard = createSafeAction(DeleteCardSchema, handler);
