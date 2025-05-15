import { Spinner } from "./spinner";

export function Loading({ message }: { message: string }) {
  return (
    <div className='mx-auto flex h-[80vh] flex-col items-center justify-center gap-2'>
      <Spinner className='size-10' />
      <p className='max-w-[400px] text-center font-bold'>{message}</p>
    </div>
  );
}
