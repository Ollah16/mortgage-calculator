import React from 'react';

interface InputFieldProps {
  label: string;
  type: string;
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  onBlur?: () => void;
  className: string;
  id: string;
  ariaLabelledby: string;
  error?: string;
  suffix?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  value,
  min,
  max,
  onChange,
  onBlur,
  className,
  id,
  ariaLabelledby,
  error,
  suffix,
}) => {
  return (
    <div className={`form__group ${className}`}>
      <label id={ariaLabelledby} htmlFor={id} className="form__label">
        {label}
      </label>
      <div className="form__input-wrapper">
        <input
          type={type}
          value={value || ''}
          min={min}
          max={max}
          onChange={(e) =>
            onChange(e.target.value === '' ? 0 : Number(e.target.value))
          }
          onBlur={onBlur}
          className={`form__input form__input--${type}`}
          id={id}
          aria-labelledby={ariaLabelledby}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        {suffix && <span className="form__suffix">{suffix}</span>}
      </div>
      {error && (
        <span id={`${id}-error`} className="form__error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
};

export default InputField;
