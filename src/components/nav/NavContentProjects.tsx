import { Link } from "@tanstack/react-router";

type NavContentProps = {
  closeMobileNav?: () => void;
  projectId: string;
};

export default function NavContentProjects({ ...props }: NavContentProps) {
  const { closeMobileNav = () => null, projectId } = { ...props };

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
          <Link
            to="/projects/$projectId"
            params={{ projectId: projectId }}
            className="[&.active]:font-bold [&.active]:border-l-primary"
            onClick={() => closeMobileNav()}
            activeOptions={{ exact: true }}
          >
            Dashboard
          </Link>
          <Link
            to="/projects/$projectId/adr"
            params={{ projectId: projectId }}
            className="[&.active]:font-bold [&.active]:border-l-primary"
            onClick={() => closeMobileNav()}
            activeOptions={{ exact: false }}
          >
            Decision Record
          </Link>
          <Link
            to="/projects/$projectId/eng-rels"
            params={{ projectId: projectId }}
            className="[&.active]:font-bold [&.active]:border-l-primary"
            onClick={() => closeMobileNav()}
            activeOptions={{ exact: false }}
          >
            Eng Releases
          </Link>
          <Link
            to="/projects/$projectId/parts"
            params={{ projectId: projectId }}
            className="[&.active]:font-bold [&.active]:border-l-primary"
            onClick={() => closeMobileNav()}
            activeOptions={{ exact: false }}
          >
            Parts
          </Link>
        </div>
      </div>
    </div>
  );
}
