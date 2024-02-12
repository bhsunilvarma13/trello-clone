import * as z from "zod";

export const CopyCardSchema = z.object({
  id: z.string(),
  boardId: z.string(),
});
