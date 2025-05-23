import { useParams } from "@tanstack/react-router";
import { Button } from "../ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import { useAddNewParts, useUpdatePart } from "@/services/queries/partsQueries";
import { toast } from "sonner";

export default function PartsPageInfo({
  result,
}: {
  result: number | undefined;
}) {
  const { projectId } = useParams({ strict: false });

  const updatePartMutation = useUpdatePart();
  const addNewPartsMutation = useAddNewParts();

  async function addNewCategory() {
    try {
      await updatePartMutation.mutateAsync({
        columnToMatch: "id",
        matchValue: result!,
        updates: { description: "CHASSIS" },
      });
    } catch (error) {
      // TODO: individual error handling
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("There was an error completing this task.");
      }
    }
  }

  const parts = [
    {
      project_id: "P002",
      description: "POWERTRAIN",
      part_number: 9000,
      sub_system: "B",
    },
    {
      project_id: "P002",
      description: "TRANSMISSION",
      part_number: 9000,
      sub_system: "C",
    },
    {
      project_id: "P002",
      description: "COOLING",
      part_number: 9000,
      sub_system: "D",
    },
    {
      project_id: "P002",
      description: "FRONT SUSPENSION",
      part_number: 9001,
      sub_system: "A",
    },
    {
      project_id: "P002",
      description: "FRONT CORNER UNITS",
      part_number: 9003,
      sub_system: "A",
    },
    {
      project_id: "P002",
      description: "WHEELS AND TYRES",
      part_number: 9005,
      sub_system: "A",
    },
    {
      project_id: "P002",
      description: "STEERING",
      part_number: 9007,
      sub_system: "A",
    },
    {
      project_id: "P002",
      description: "FUWB - LH",
      part_number: 9009,
      sub_system: "A",
    },
    {
      project_id: "P002",
      description: "FUWB - RH",
      part_number: 9010,
      sub_system: "A",
    },
    {
      project_id: "P002",
      description: "FPR",
      part_number: 9011,
      sub_system: "A",
    },
    {
      project_id: "P002",
      description: "FPR WELDED ASSY",
      part_number: 9013,
      sub_system: "A",
    },
    {
      project_id: "P002",
      description: "FPR TUBE",
      part_number: 3,
      sub_system: "A",
    },
    {
      project_id: "P002",
      description: "BEARING END - IB",
      part_number: 1,
      sub_system: "A",
    },
  ];

  async function populateParts() {
    try {
      await addNewPartsMutation.mutateAsync(parts);
    } catch (error) {
      // TODO: individual error handling
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("There was an error completing this task.");
      }
    }
  }

  async function populateProject() {
    await addNewCategory();
    await populateParts();
  }

  return (
    <div className="w-full h-full space-y-4 text-justify flex flex-col items-center">
      <p>
        This page is the first point of call for most design engineers. When a
        new part or assembly is required, the first step is to allocate a part
        number to it, which can be generated by clicking on the appropriate
        button. Right clicking on a row allows the user to quickly copy the part
        number and description in the format required for the CAD PLM software.
      </p>
      <p>
        Typically engineering BOMs are split up into categories. This provides a
        useful way to structure CAD data, as well as provide some context for
        the part numbers. Categories 'A' and 'T' are automatically generated as
        every project will have these two. Further categories can be added as
        needed.
      </p>
      {projectId === "P002" && (
        <>
          <p>
            Click the button below to create all of the parts associated with
            this project. Feel free to create more to test out the manual flow.
          </p>
          <DialogClose className="w-full">
            <Button className="w-full" onClick={() => void populateProject()}>
              Create project parts
            </Button>
          </DialogClose>
        </>
      )}
    </div>
  );
}
