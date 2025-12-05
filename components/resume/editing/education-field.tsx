import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { DateRangePicker } from "@/components/ui/date-range-picker";

interface Education {
  degree: string;
  school: string;
  start: string;
  end: string;
}

export function EducationField({
  edu,
  index,
  onUpdate,
  onDelete,
}: {
  edu: Education;
  index: number;
  onUpdate: (index: number, updatedEdu: Education) => void;
  onDelete: (index: number) => void;
}) {
  return (
    <div className='group rounded-base relative border p-4'>
      <button
        className='text-foreground absolute top-2 right-2 transition-colors hover:text-red-500'
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

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        <div className='md:col-span-2'>
          <Label htmlFor={`edu-degree-${index}`} className='font-base text-sm'>
            Degree
          </Label>
          <Input
            id={`edu-degree-${index}`}
            value={edu.degree}
            onChange={(e) => {
              onUpdate(index, {
                ...edu,
                degree: e.target.value,
              });
            }}
            placeholder='Degree'
            required
          />
        </div>

        <div className='md:col-span-2'>
          <Label htmlFor={`edu-school-${index}`} className='font-base text-sm'>
            School
          </Label>
          <Input
            id={`edu-school-${index}`}
            value={edu.school}
            onChange={(e) => {
              onUpdate(index, {
                ...edu,
                school: e.target.value,
              });
            }}
            placeholder='School'
            required
          />
        </div>

        <div className='md:col-span-2'>
          <Label className='font-base text-sm'>Date Range</Label>
          <DateRangePicker
            startDate={edu.start}
            endDate={edu.end}
            onStartDateChange={(date) => {
              onUpdate(index, {
                ...edu,
                start: date,
              });
            }}
            onEndDateChange={(date) => {
              onUpdate(index, {
                ...edu,
                end: date,
              });
            }}
          />
        </div>
      </div>
    </div>
  );
}
