import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function AddSkillDialog({
  open,
  onOpenChange,
  onAddSkill,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddSkill: (skill: string) => void;
}) {
  const [skillInput, setSkillInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedSkill = skillInput.trim();

    if (!trimmedSkill) {
      toast.warning("Skill cannot be empty.");
      return;
    }

    onAddSkill(trimmedSkill);
    setSkillInput("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent aria-describedby={undefined}>
        <DialogTitle is='add-new-skill'>Add New Skill</DialogTitle>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='skill'>Skill Name</Label>
            <Input
              id='skill'
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              placeholder='Enter skill name'
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button type='button' onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type='submit'>Add Skill</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
