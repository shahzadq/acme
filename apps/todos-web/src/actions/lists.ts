"use server";

import { db } from "@workspace/db-todos";
import { reservedListNames } from "@workspace/db-todos/constants";
import { InsertList, listTable } from "@workspace/db-todos/schema";

import {
  CREATE_LIST_MESSAGES,
  INTERNAL_SERVER_ERROR_MESSAGE,
} from "@/constants/actions";
import { arrayIncludes } from "@/utils/arrays";
import { createAction } from "./_internals";

export const createList = createAction(async (params: InsertList) => {
  if (arrayIncludes(reservedListNames, params.name.toLowerCase()))
    return {
      type: "Error",
      message: CREATE_LIST_MESSAGES.RESERVED_NAME_PROVIDED,
    };

  try {
    await db.insert(listTable).values(params);
    const content = await db.query.listTable.findFirst({
      where: (list, { eq }) => eq(list.name, params.name),
    });

    if (typeof content === "undefined")
      throw new Error("Something went wrong creating the list.");

    return { type: "Success", message: CREATE_LIST_MESSAGES.SUCCESS, content };
  } catch {
    return { type: "Error", message: INTERNAL_SERVER_ERROR_MESSAGE };
  }
});
