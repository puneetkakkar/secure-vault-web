import { SVGProps } from "react";
import { Tagged } from "./tagged";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type EncryptedString = Tagged<string, "EncString">;
