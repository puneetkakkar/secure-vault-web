"use client";

import { createClientAction } from "@/core/action-utils/client-action-handler";
import { _getUserInfoAction } from "../server/user.action";

export const getUserInfoApiAction = createClientAction(_getUserInfoAction);
