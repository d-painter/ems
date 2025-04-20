import { Link } from "@tanstack/react-router";

type NavContentProps = {
  navType: "side" | "mobile";
};

export default function NavContent({ navType: navType }: NavContentProps) {
  const routes = [
    { title: "Projects", to: "/projects" },
    { title: "Parts", to: "/parts" },
    { title: "Suppliers", to: "/suppliers" },
  ];

  return (
    <>
      {navType === "side" && (
        <div className="hidden md:flex flex-col text-xl gap-2 [&_*]:hover:border-l-4 [&_*]:border-l-4 [&_*]:border-transparent [&_*]:hover:border-l-primary [&_*]:pl-2">
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
              activeOptions={{ exact: true }}
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
              activeOptions={{ exact: true }}
            >
              {r.title}
            </Link>
          ))}
        </>
      )}
    </>
  );
}
