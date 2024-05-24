import { subtitle, title } from "@/components/primitives";
import Image from "next/image";
import HackerImage from "../../assets/homepage-hacker.svg";

export default function Home() {
  return (
    <section className="flex flex-col-reverse sm:flex-row justify-center gap-4 py-8 md:py-10">
      <div className="inline-block items-center text-center sm:text-left justify-center max-w-lg">
        <h1 className="font-josefin text-3xl py-6 sm:text-4xl sm:py-12 font-semibold ">
          Data Protection?
        </h1>
        <h1 className={title({ size: "xs", class: "font-medium" })}>
          Keep your secrets safe with{" "}
          <span className="font-bold">SECRET&nbsp;</span>
        </h1>
        <h1
          className={title({
            color: "purple",
            class: "bg-gradient-to-tl font-bold text-transparent",
            size: "xs",
          })}
        >
          VAULT,&nbsp;
        </h1>
        <br />
        <h1 className={title({ size: "xs", class: "font-medium" })}>
          the end-to-end encrypted password manager that puts you in control.
        </h1>
        <h2 className={subtitle({ class: "mt-4" })}>
          Never remember your passwords again.
        </h2>
      </div>
      <div className="">
        <Image src={HackerImage} alt="hacker" />
      </div>
    </section>
  );
}
