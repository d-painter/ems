import NavContent from "@/components/nav/NavContent";
import SideNav from "@/components/nav/SideNav";
import { fetchProjects } from "@/services/queries/projectQueries";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/(app)/")({
  component: RouteComponent,
});

function RouteComponent() {

  const [projects, setProjects] = useState([])

  async function getProjects() {
    const res = await fetchProjects()
    
  }

  useEffect(() => {

    getProjects()
  },[])


  return (
    <>
      <SideNav>
        <div className="my-auto">
          <NavContent />
        </div>
      </SideNav>
      <div>HOME DASHBOARD</div>
      <div>{projects && projects.map((p) => (
        <p>{JSON.stringify(p)}</p>
      ))}</div>
    </>
  );
}
