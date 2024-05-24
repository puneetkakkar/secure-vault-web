import NotFoundImage from "@/../assets/not-found.svg";
import { link as linkStyles } from "@nextui-org/theme";
import { clsx } from "clsx";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="">
        <Image
          src={NotFoundImage}
          alt="404 not found"
          height={550}
          width={550}
        />
      </div>
      <p className="font-josefin text-3xl">Could not find requested resource</p>
      <Link
        href="/"
        className={clsx(
          linkStyles({
            color: "foreground",
            className: "font-josefin text-xl text-primary-foreground mt-4",
          }),
          "data-[active=true]:text-primary data-[active=true]:font-medium"
        )}
      >
        Return Home
      </Link>
    </div>
  );
}
