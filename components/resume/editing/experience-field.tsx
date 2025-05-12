import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DateRangePicker } from "@/components/ui/date-range-picker";

interface WorkExperience {
  title: string;
  company: string;
  description: string;
  location: string;
  link: string;
  contract: string;
  start: string;
  end?: string | null;
}

export function WorkExperienceField({
  work,
  index,
  onUpdate,
  onDelete,
}: {
  work: WorkExperience;
  index: number;
  onUpdate: (index: number, updatedWork: WorkExperience) => void;
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
          <Label htmlFor={`work-title-${index}`} className='font-base text-sm'>
            Job Title
          </Label>
          <Input
            id={`work-title-${index}`}
            value={work.title}
            onChange={(e) =>
              onUpdate(index, { ...work, title: e.target.value })
            }
            placeholder='Job Title'
            required
          />
        </div>

        <div>
          <Label
            htmlFor={`work-company-${index}`}
            className='font-base text-sm'
          >
            Company
          </Label>
          <Input
            id={`work-company-${index}`}
            value={work.company}
            onChange={(e) =>
              onUpdate(index, { ...work, company: e.target.value })
            }
            placeholder='Company'
            required
          />
        </div>

        <div>
          <Label
            htmlFor={`work-location-${index}`}
            className='font-base text-sm'
          >
            Location
          </Label>
          <Input
            id={`work-location-${index}`}
            value={work.location}
            onChange={(e) =>
              onUpdate(index, { ...work, location: e.target.value })
            }
            placeholder='Location'
            required
          />
        </div>

        <div className='md:col-span-2'>
          <Label className='font-base text-sm'>Date Range</Label>
          <DateRangePicker
            startDate={work.start}
            endDate={work.end}
            onStartDateChange={(date) =>
              onUpdate(index, { ...work, start: date })
            }
            onEndDateChange={(date) => onUpdate(index, { ...work, end: date })}
          />
        </div>

        <div className='md:col-span-2'>
          <Label
            htmlFor={`work-description-${index}`}
            className='font-base text-sm'
          >
            Description
          </Label>
          <Textarea
            id={`work-description-${index}`}
            value={work.description}
            onChange={(e) =>
              onUpdate(index, { ...work, description: e.target.value })
            }
            placeholder='Description'
            rows={3}
            required
          />
        </div>
      </div>
    </div>
  );
}
