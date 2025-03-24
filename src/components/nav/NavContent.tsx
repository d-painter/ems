import { Link } from "@tanstack/react-router";

type NavContentProps = {
  closeMobileNav?: () => void;
};

export default function NavContent({ closeMobileNav = ()=> null }: NavContentProps) {
  const routes = [
    { title: "Projects", to: "/projects" },
    { title: "Parts", to: "/parts" },
    { title: "Suppliers", to: "/suppliers" },
  ];

  return (
    <div className="flex flex-col text-2xl gap-2 [&_*]:hover:border-l-4 [&_*]:border-l-4 [&_*]:border-transparent [&_*]:hover:border-l-primary [&_*]:pl-2">
      <Link
        to={"/"}
        className="[&.active]:font-bold [&.active]:border-l-primary"
        onClick={() => closeMobileNav()}
      >
        Home
      </Link>
      {routes.map((r) => (
        <Link
          key={r.title}
          to={r.to}
          className="[&.active]:font-bold [&.active]:border-l-primary"
          onClick={() => closeMobileNav()}
        >
          {r.title}
        </Link>
      ))}
    </div>
  );
}
