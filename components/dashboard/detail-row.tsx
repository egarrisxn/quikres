export function DetailRow({
  desc,
  value,
  children,
}: {
  desc: string;
  value: string;
  children: React.ReactNode;
}) {
  return (
    <div className='relative grid h-[2.125rem] grid-cols-2 items-center'>
      <span className='block flex-shrink-0 text-xs font-semibold'>{desc}</span>
      <span className='relative block font-mono text-xs'>
        <span className='block w-full truncate'>{value}</span>
        {children}
      </span>
    </div>
  );
}
