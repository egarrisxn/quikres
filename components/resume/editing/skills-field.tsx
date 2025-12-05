export function SkillField({
  skill,
  index,
  onUpdate,
  onDelete,
}: {
  skill: string;
  index: number;
  onUpdate: (index: number, updatedSkill: string) => void;
  onDelete: (index: number) => void;
}) {
  return (
    <div className='group bg-primary text-primary-foreground [a&]:hover:bg-primary/90 font-base rounded-base relative flex w-fit items-center gap-1 border border-transparent px-3 py-1 transition-[color,box-shadow]'>
      <div
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => {
          const trimmedSkill = (e.currentTarget.textContent || "").trim();
          onUpdate(index, trimmedSkill);
        }}
        className='h-6 min-w-[40px] overflow-hidden bg-transparent py-0 outline-hidden'
        style={{ width: "fit-content" }}
      >
        {skill}
      </div>
      <button
        className='text-gray-400 transition-colors hover:text-red-500'
        onClick={() => onDelete(index)}
      >
        <svg
          className='size-4'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M6 18L18 6M6 6l12 12'
          />
        </svg>
      </button>
    </div>
  );
}
