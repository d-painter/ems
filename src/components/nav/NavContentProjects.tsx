import { Link } from "@tanstack/react-router";

type NavContentProps = {
  navType: "side" | "mobile";
  projectId: string;
};

export default function NavContentProjects({ ...props }: NavContentProps) {
  const { projectId, navType } = { ...props };

  return (
    <>
      {navType === "side" && (
        <div className="hidden md:flex flex-col text-base lg:text-xl gap-2 [&_*]:hover:border-l-4 [&_*]:border-l-4 [&_*]:border-transparent [&_*]:hover:border-l-primary [&_*]:pl-2">
          <Link
            to={"/"}
            className="[&.active]:font-bold [&.active]:border-l-primary mb-6"
            activeOptions={{ exact: true }}
          >
            Home
          </Link>
          <Link
            to="/projects/$projectId/"
            params={{ projectId: projectId }}
            className="[&.active]:font-bold [&.active]:border-l-primary"
            activeOptions={{ exact: true }}
          >
            Dashboard
          </Link>
          <Link
            to="/projects/$projectId/adr/"
            params={{ projectId: projectId }}
            className="[&.active]:font-bold [&.active]:border-l-primary"
            activeOptions={{ exact: false }}
          >
            Decision Record
          </Link>
          <Link
            to="/projects/$projectId/eng-rels/"
            params={{ projectId: projectId }}
            className="[&.active]:font-bold [&.active]:border-l-primary"
            activeOptions={{ exact: false }}
          >
            Eng Releases
          </Link>
          <Link
            to="/projects/$projectId/parts/"
            params={{ projectId: projectId }}
            className="[&.active]:font-bold [&.active]:border-l-primary"
            activeOptions={{ exact: false }}
          >
            Parts
          </Link>
        </div>
      )}
      {navType === "mobile" && (
        <>
          <Link
            className="p-2 flex h-full justify-center items-center"
            to="/projects/$projectId/"
            params={{ projectId: projectId }}
            activeOptions={{ exact: true }}
          >
            Dashboard
          </Link>
          <Link
            className="p-2 flex h-full justify-center items-center"
            to="/projects/$projectId/adr/"
            params={{ projectId: projectId }}
            activeOptions={{ exact: false }}
          >
            Decision Record
          </Link>
          <Link
            className="p-2 flex h-full justify-center items-center"
            to="/projects/$projectId/eng-rels/"
            params={{ projectId: projectId }}
            activeOptions={{ exact: false }}
          >
            Eng Releases
          </Link>
          <Link
            className="p-2 flex h-full justify-center items-center"
            to="/projects/$projectId/parts/"
            params={{ projectId: projectId }}
            activeOptions={{ exact: false }}
          >
            Parts
          </Link>
        </>
      )}
    </>
  );
}
