import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'danger' | 'ghost';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className = '', ...props }) => {
  const baseStyles = "relative px-6 py-3 font-mono text-xs tracking-technical transition-all duration-300 uppercase border select-none overflow-hidden group";
  
  const variants = {
    primary: "border-steel text-ash hover:border-ash bg-charcoal/50 backdrop-blur-sm",
    danger: "border-critical/50 text-critical hover:bg-critical hover:text-ash hover:border-critical",
    ghost: "border-transparent text-muted hover:text-ash hover:bg-steel/20"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
      {/* Hover Reveal Effect */}
      {variant !== 'ghost' && (
        <div className="absolute inset-0 bg-ash/5 translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
      )}
    </button>
  );
};