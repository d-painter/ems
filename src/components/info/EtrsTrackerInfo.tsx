export default function EtrsTrackerInfo() {
  return (
    <div className="w-full h-full space-y-4 text-justify flex flex-col items-center">
      <p>
        This chart provides a visual on when BOM parts need to be released. The
        curve illustrates when the busy release period is over the project plan
        and this helps with resource planning.
      </p>
      <p>
        Individual part lead times are a parameter on each CAD file. For live
        projects, a CSV of the BOM can be exported from CAD software which is
        used to auto update project timings.
      </p>
    </div>
  );
}
