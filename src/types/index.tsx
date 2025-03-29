import { SVGProps } from "react";
import { Tagged } from "type-fest";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type EncryptedString = Tagged<string, "EncString">;
