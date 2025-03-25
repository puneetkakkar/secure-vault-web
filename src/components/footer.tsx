import { Link } from "@heroui/link";

export default function Footer() {
  return (
    <footer className="w-full flex items-center justify-center py-3">
      <Link
        isExternal
        className="flex items-center gap-1 text-current"
        href="https://puneetkakkar.com/"
        title="Puneet Kakkar's Website"
      >
        <span className="text-default-600">Copyright &copy;</span>
        <p className="text-primary">Puneet Kakkar</p>
      </Link>
    </footer>
  );
}
