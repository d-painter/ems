export default function ReleasesCardInfo() {
  return (
    <div className="w-full h-full space-y-4 text-justify flex flex-col items-center">
      <p>
        This card provides a snapshot of engineering releases created by the
        user regardless of project. At the moment it's displaying dumb data to
        allow for the site to be easily demonstrated but when fully integrated
        with the live projects it would fetch release data and sort by
        importance to highlight releases requiring attention.
      </p>
    </div>
  );
}
