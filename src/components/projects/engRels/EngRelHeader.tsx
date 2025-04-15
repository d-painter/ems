import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateEngRel } from "@/services/queries/engRelQueries";
import { Tables } from "@/services/supabase/supabaseTypes";
import { Check, Pen, X } from "lucide-react";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

export default function EngRelHeader({
  engRel,
}: {
  engRel: Tables<"eng_rels">;
}) {
  const [edit, setEdit] = useState(false);
  const [formState, setFormState] = useState({});

  const updateEngRelMutation = useUpdateEngRel();

  const emptyTitleBoolean = !engRel.title;
  const emptyDescriptionBoolean = !engRel.description;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      await updateEngRelMutation.mutateAsync({
        columnToMatch: "id",
        matchValue: engRel.id,
        updates: { ...formState },
      });
      setEdit(false);
    } catch (error) {
      // TODO: individual error handling
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("There was an error completing this task.");
      }
    }
  }

  return (
    <div className="flex flex-row text-white p-2 md:p-6 h-fit bg-primary justify-between">
      <form
        className="w-full flex flex-row"
        onSubmit={(e) => void handleSubmit(e)}
      >
        <div className="flex flex-col grow">
          <h1 className="mb-2 flex flex-row text-xl">
            {engRel.project_id}-ER-{String(engRel.release_id).padStart(4, "0")}
          </h1>
          <div className="min-h-14">
            <Label htmlFor="title" className="text-xs font-extralight">
              Title
            </Label>
            {emptyTitleBoolean || edit ? (
              <Input
                autoFocus
                placeholder="Title"
                type="text"
                id="title"
                name="title"
                className="placeholder:text-white mt-1 !text-base"
                defaultValue={engRel.title ?? ""}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            ) : (
              <h2 className="text-base">{engRel.title}</h2>
            )}
          </div>
          <div className="min-h-14">
            <Label htmlFor="description" className="text-xs font-extralight">
              Description
            </Label>
            {emptyDescriptionBoolean || edit ? (
              <Textarea
                placeholder="Description"
                id="description"
                name="description"
                className="placeholder:text-white mt-1 !field-sizing-content"
                defaultValue={engRel.description ?? ""}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            ) : (
              <h2 className="text-base">{engRel.description}</h2>
            )}
          </div>
        </div>
        <div>
          {(edit || emptyDescriptionBoolean || emptyTitleBoolean) && (
            <div className="flex flex-row gap-1">
              <Button
                variant="engRel"
                type="button"
                onClick={() => setEdit(false)}
              >
                <X />
              </Button>
              <Button variant="engRel" type="submit">
                <Check />
              </Button>
            </div>
          )}
          {!edit && !emptyDescriptionBoolean && (
            <Button
              variant="engRel"
              type="button"
              onClick={() => setEdit(true)}
            >
              <Pen />
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
