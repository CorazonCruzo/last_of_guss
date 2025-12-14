import { useState } from 'react';

interface GooseProps {
  onClick?: () => void;
  disabled?: boolean;
}

export function Goose({ onClick, disabled }: GooseProps) {
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = () => {
    if (disabled || !onClick) return;

    setIsPressed(true);
    onClick();
    setTimeout(() => setIsPressed(false), 100);
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`
        transition-transform duration-100
        ${isPressed ? 'scale-95' : 'scale-100'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-105'}
      `}
    >
      <img
        src={isPressed ? '/goose-tap.png' : '/goose.png'}
        alt="Goose"
        className="w-[576px] h-[576px] object-contain select-none"
        draggable={false}
      />
    </button>
  );
}
