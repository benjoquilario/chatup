import React from 'react';
import classNames from 'classnames';

type Icon = {
  className?: string;
};

type InputProps = {
  containerClassName?: string;
  labelClassName?: string;
  label?: string;
  Icon?: React.ComponentType<Icon>;
  iconClassName?: string;
  className?: string;
} & React.HTMLProps<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    containerClassName,
    label,
    labelClassName,
    Icon,
    iconClassName,
    className,
    ...inputProps
  } = props;

  return (
    <div className={containerClassName}>
      {label && (
        <label htmlFor={label} className={labelClassName}>
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={classNames(
          'block px-4 rounded-sm w-full border-0 focus:outline-none ring-1 ring-inset ring-[#313550] focus:ring-inset focus:ring-2 focus:ring-white',
          'mb-2.5 text-sm shadow-background-900 py-1.5 placeholder:text-gray-900 text-ice',
          className
        )}
        {...inputProps}
      />
      {Icon && <Icon className={iconClassName} />}
    </div>
  );
});

Input.displayName = 'Input';

export default React.memo(Input);
