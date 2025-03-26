import { Link } from "@tanstack/react-router";

type NavContentProps = {
  closeMobileNav?: () => void;
  projectId?: string | null;
};

export default function NavContentProjects({ ...props }: NavContentProps) {
  const { closeMobileNav = () => null, projectId } = { ...props };
  const projectsRoutes = [
    {
      title: "Dashboard",
      to: `/projects/${projectId}`,
    },
    {
      title: "Decision Records",
      to: `/projects/${projectId}/adr`,
    },
    {
      title: "Eng Releases",
      to: `/projects/${projectId}/eng-rels`,
    },
    {
      title: "Parts",
      to: `/projects/${projectId}/parts`,
    },
    
  ];

  return (
    <div className="flex flex-col text-xl h-full justify-center">
      <div className="flex shrink-0">
        <div className="relative top-0 text-2xl font-bold">{projectId}</div>
      </div>
      <div className="flex flex-grow">
        <div className="justify-center flex flex-col gap-2 [&_*]:hover:border-l-4 [&_*]:border-l-4 [&_*]:border-transparent [&_*]:hover:border-l-primary [&_*]:pl-2">
          <Link
            to={"/"}
            className="[&.active]:font-bold [&.active]:border-l-primary md:hidden"
            onClick={() => closeMobileNav()}
            activeOptions={{ exact: true }}
          >
            Home
          </Link>
          {projectsRoutes.map((r) => (
            <Link
              key={r.title}
              to={r.to}
              className="[&.active]:font-bold [&.active]:border-l-primary"
              onClick={() => closeMobileNav()}
              activeOptions={{ exact: true }}
            >
              {r.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
