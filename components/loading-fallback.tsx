import React from "react";
import { Spinner } from "@/components/spinner";

interface LoadingFallbackProps {
  message: string;
}

const LoadingFallback: React.FC<LoadingFallbackProps> = ({ message }) => {
  return (
    <div className='flex h-[80vh] flex-col items-center justify-center'>
      <Spinner className='mr-2 size-10' />
      <p className='mt-2.5 max-w-[400px] text-center text-lg'>{message}</p>
    </div>
  );
};

export default LoadingFallback;
