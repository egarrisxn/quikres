import { Button } from "@/components/ui/button";

export const AddButton = ({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) => {
  return (
    <Button variant='ghost' className='w-full p-2' onClick={onClick}>
      + {label}
    </Button>
  );
};
