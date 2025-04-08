import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
    <div className="flex flex-row text-white p-6 text-2xl bg-primary justify-between">
      <form
        className="w-full flex flex-row justify-between"
        onSubmit={(e) => void handleSubmit(e)}
      >
        <div className="w-1/2 flex flex-col">
          <div className="min-h-14">
            <Label htmlFor="title">Title</Label>
            {emptyTitleBoolean || edit ? (
              <Input
                placeholder="Title"
                type="text"
                id="title"
                name="title"
                className="placeholder:text-white mt-1"
                defaultValue={engRel.title ?? ""}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            ) : (
              <h2>{engRel.title}</h2>
            )}
          </div>
          <div className="min-h-14">
            <Label htmlFor="description">Description</Label>
            {emptyDescriptionBoolean || edit ? (
              <Input
                placeholder="Description"
                type="text"
                id="description"
                name="description"
                className="placeholder:text-white mt-1"
                defaultValue={engRel.description ?? ""}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            ) : (
              <h2>{engRel.description}</h2>
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
                <Pen/>
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
