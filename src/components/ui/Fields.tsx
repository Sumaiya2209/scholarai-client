import { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes, forwardRef } from "react";

const fieldBase =
  "w-full rounded-md border border-parchment-line bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-amber/40 focus:border-amber transition-colors";

interface FieldWrapperProps {
  label?: string;
  error?: string;
  htmlFor?: string;
}

function FieldWrapper({ label, error, htmlFor, children }: FieldWrapperProps & { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={htmlFor} className="text-[13px] font-medium text-ink-muted">
          {label}
        </label>
      )}
      {children}
      {error && <span className="text-[12px] text-red-600">{error}</span>}
    </div>
  );
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, className = "", ...props }, ref) => (
    <FieldWrapper label={label} error={error} htmlFor={id}>
      <input ref={ref} id={id} className={`${fieldBase} ${className}`} {...props} />
    </FieldWrapper>
  )
);
Input.displayName = "Input";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, id, className = "", ...props }, ref) => (
    <FieldWrapper label={label} error={error} htmlFor={id}>
      <textarea ref={ref} id={id} className={`${fieldBase} min-h-[120px] resize-y ${className}`} {...props} />
    </FieldWrapper>
  )
);
TextArea.displayName = "TextArea";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, id, className = "", children, ...props }, ref) => (
    <FieldWrapper label={label} error={error} htmlFor={id}>
      <select ref={ref} id={id} className={`${fieldBase} ${className}`} {...props}>
        {children}
      </select>
    </FieldWrapper>
  )
);
Select.displayName = "Select";
