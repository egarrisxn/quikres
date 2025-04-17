import React from "react";

interface AddButtonProps {
  label: string;
  onClick: () => void;
}

export const AddButton: React.FC<AddButtonProps> = ({ label, onClick }) => {
  return (
    <button
      className='rounded-base hover:border-primary w-full border-2 border-dashed p-2 text-gray-500'
      onClick={onClick}
    >
      + {label}
    </button>
  );
};
