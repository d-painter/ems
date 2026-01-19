import { Link } from "@tanstack/react-router";
import { SheetClose } from "../ui/sheet";

type NavContentProps = {
  navType: "side" | "mobile" | "drawer";
};

export default function NavContent({ navType: navType }: NavContentProps) {
  const routes = [
    { title: "Projects", to: "/projects/" },
    { title: "Parts", to: "/parts/" },
    { title: "Suppliers", to: "/suppliers/" },
  ];

  return (
    <>
      {navType === "drawer" && (
        <div className="flex flex-col text-xl gap-2 [&_*]:hover:border-l-4 [&_*]:border-l-4 [&_*]:border-transparent [&_*]:hover:border-l-primary [&_*]:pl-2">
          <SheetClose asChild>
            <Link
              to={"/"}
              className="[&.active]:font-bold [&.active]:border-l-primary"
            >
              Home
            </Link>
          </SheetClose>
          {routes.map((r) => (
            <SheetClose asChild>
              <Link
                key={r.title}
                to={r.to}
                className="[&.active]:font-bold [&.active]:border-l-primary"
                activeOptions={{ exact: true }}
              >
                {r.title}
              </Link>
            </SheetClose>
          ))}
        </div>
      )}
      {navType === "side" && (
        <div className="hidden text-base md:flex flex-col lg:text-xl gap-2 [&_*]:hover:border-l-4 [&_*]:border-l-4 [&_*]:border-transparent [&_*]:hover:border-l-primary [&_*]:pl-2">
          <Link
            to={"/"}
            className="[&.active]:font-bold [&.active]:border-l-primary"
          >
            Home
          </Link>
          {routes.map((r) => (
            <Link
              key={r.title}
              to={r.to}
              className="[&.active]:font-bold [&.active]:border-l-primary"
              activeOptions={{ exact: false }}
            >
              {r.title}
            </Link>
          ))}
        </div>
      )}
      {navType === "mobile" && (
        <>
          <Link
            className="p-2 flex h-full justify-center items-center"
            to={"/"}
          >
            Home
          </Link>
          {routes.map((r) => (
            <Link
              className="p-2 flex h-full justify-center items-center"
              key={r.title}
              to={r.to}
              activeOptions={{ exact: false }}
            >
              {r.title}
            </Link>
          ))}
        </>
      )}
    </>
  );
}
