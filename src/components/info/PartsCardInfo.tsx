export default function PartsCardInfo() {
  return (
    <div className="w-full h-full space-y-4 text-justify flex flex-col items-center">
      <p>
        This card displays all of the parts associated with the organisation. It
        serves as a quick way of searching for a known part number and view it's
        details by clicking on it.
      </p>
      <p>
        Parts have a lot of information associated with them outside of their
        name and number. This information can be viewed on the part page which
        shows it's release history, cost, order quantity, what to do with
        previous revisions etc.
      </p>
    </div>
  );
}
