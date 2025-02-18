import { TRPCError } from "@trpc/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { authedLoggedProcedure } from "../trpc.ts";
import { SALT_ROUNDS } from "../utils/auth.ts";
import { UserPermLevel } from "../utils/dbtypes.ts";

export const editUser = authedLoggedProcedure
  .input(
    z.object({
      oldUsername: z.string(),
      newUsername: z.string().optional(),
      permLevel: z.enum(UserPermLevel),
      password: z.string().optional(),
    })
  )
  .mutation(async (opts) => {
    if (opts.ctx.user.permLevel !== "admin") {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "Wrong permissions to fetch data.",
      });
    }

    if (
      opts.input.newUsername === undefined &&
      opts.input.permLevel === undefined
    ) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "No changes requested.",
      });
    }

    let query = "UPDATE Users SET ";
    const changes: string[] = [];
    const params: string[] = [];
    if (opts.input.newUsername) {
      changes.push("username = ?");
      params.push(opts.input.newUsername);
    }
    if (opts.input.permLevel) {
      changes.push("permLevel = ?");
      params.push(opts.input.permLevel);
    }
    if (opts.input.password) {
      changes.push("hashedPassword = ?");
      params.push(await bcrypt.hash(opts.input.password, SALT_ROUNDS));
    }
    query += changes.join(", ");
    query += " WHERE username = ? LIMIT 1";

    const result = await opts.ctx.env.DB.prepare(query)
      .bind(...params, opts.input.oldUsername)
      .run();
    if (result.success) {
      return;
    } else {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Error while updating user.",
      });
    }
  });
