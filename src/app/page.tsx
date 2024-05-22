import { subtitle, title } from "@/app/components/primitives";
import Image from "next/image";
import HackerImage from "../../assets/homepage-hacker.svg";

export default function Home() {
  return (
    <section className="flex flex-row justify-center gap-4 py-8 md:py-10">
      <div className="inline-block items-center justify-center max-w-lg">
        <h1 className="text-5xl py-12 font-semibold ">Data Protection?</h1>
        <h1 className={title({ size: "sm", class: "font-medium" })}>
          Keep your secrets safe with{" "}
          <span className="font-semibold">SECRET&nbsp;</span>
        </h1>
        <h1
          className={title({
            color: "purple",
            class: "bg-gradient-to-tl",
            size: "sm",
          })}
        >
          VAULT,&nbsp;
        </h1>
        <br />
        <h1 className={title({ size: "sm", class: "font-medium" })}>
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
