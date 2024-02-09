import * as z from "zod";

export const UpdateBoardSchema = z.object({
  id: z.string(),
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title is reuired",
    })
    .min(3, {
      message: "Title is too short",
    }),
});
