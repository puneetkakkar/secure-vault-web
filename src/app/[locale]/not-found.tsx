import NotFoundImage from "../../../assets/not-found.svg";
import { link as linkStyles } from "@heroui/theme";
import { clsx } from "clsx";
import Image from "next/image";
import React from "react";
import { Navbar } from "@/shared/components";
import { getTranslations } from "next-intl/server";
import { Link } from "@heroui/link";

export default async function NotFound() {
  const t = await getTranslations("NotFound");
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center">
        <div className="">
          <Image
            src={NotFoundImage}
            alt="404 not found"
            height={550}
            width={550}
          />
        </div>
        <p className="font-josefin text-xl sm:text-3xl">
          {t("couldnt_find_resource")}
        </p>
        <Link
          href="/"
          className={clsx(
            linkStyles({
              color: "foreground",
              className:
                "font-josefin text-md sm:text-xl text-primary-foreground mt-4",
            }),
            "data-[active=true]:text-primary data-[active=true]:font-medium",
          )}
        >
          {t("return_home")}
        </Link>
      </div>
    </>
  );
}
