"use client";

import { createClientAction } from "@/utils/actions/client-action-handler";
import { _getUserInfoAction } from "../user.action";

export const getUserInfoApiAction = createClientAction(_getUserInfoAction);
