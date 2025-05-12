export function Loading({ message }: { message: string }) {
  return (
    <div className='flex h-[80vh] flex-col items-center justify-center'>
      <p className='max-w-[400px] text-center text-lg font-bold'>{message}</p>
    </div>
  );
}
