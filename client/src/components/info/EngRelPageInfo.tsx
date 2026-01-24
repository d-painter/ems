import { usePublicFiles } from "@/services/queries/engRelQueries";
import { supabase } from "@/services/supabase/supabaseClient";
import { toast } from "sonner";

export default function EngRelPageInfo() {
  const { data } = usePublicFiles();

  async function getFile(name: string) {
    const { data, error } = await supabase.storage
      .from("general")
      .download(name);
    if (error) {
      toast.error("There was an error retrieving the file.");
    }
    if (data) {
      const url = window.URL.createObjectURL(data);
      const a = document.createElement("a");
      a.href = url;
      a.download = name;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      toast.success(`${name} Downloaded`);
    }
  }

  return (
    <div className="w-full h-full space-y-4 text-justify flex flex-col items-start">
      <p>
        This page manages the individual release. The parts associated to the
        release can only be updated using a CSV exported from CAD software which
        ensures consistency of data between platforms. The two files below are
        exports from a CAD system. Click to edit the parts table and use the
        CSVs to update the release.
      </p>
      <ul>
        {data &&
          data.map((d, i) => (
            <li key={i}>
              <button
                className="underline hover:cursor-pointer"
                onClick={() => void getFile(d.name)}
              >
                {d.name}
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}
