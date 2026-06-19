type ButtonProps = {
  children: any;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "outline" | "secondary";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
};

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  className = "",
}: ButtonProps) {
  // Base button styles
  const baseStyles = "rounded-full font-semibold transition cursor-pointer";
  
  // Variant styles based on your existing buttons
  const variantStyles = {
    primary: "bg-neutral-900 text-white hover:bg-neutral-800",
    outline: "border border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white",
    secondary: "border border-neutral-200 text-neutral-700 hover:border-neutral-300 hover:text-neutral-900"
  };
  
  // Size styles
  const sizeStyles = {
    sm: "px-3 py-1 text-xs",
    md: "px-4 py-2 text-sm", 
    lg: "px-5 py-2 text-base"
  };
  
  // Width styles
  const widthStyles = fullWidth ? "w-full" : "";
  
  // Disabled styles
  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed" : "";
  
  // Combine all styles
  const buttonClasses = [
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    widthStyles,
    disabledStyles,
    className
  ].filter(Boolean).join(" ");

  return (
    <button
      type={type}
      onClick={disabled ? undefined : onClick}
      className={buttonClasses}
      disabled={disabled}
    >
      {children}
    </button>
  );
}