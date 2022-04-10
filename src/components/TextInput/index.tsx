import * as React from "react";

interface TextInputProps extends React.HTMLProps<HTMLInputElement> {
  id: string;
  label: string;
  isInValid?: boolean;
  validationMessage?: string;
}

/**export text input component */
export default React.forwardRef<HTMLInputElement, TextInputProps>(
  function TextInput(props, ref) {
    const { id, label, isInValid, validationMessage, ...rest } = props;

    return (
      <div className="flex flex-col">
        <label htmlFor={props.id} className="font-bold text-sm mb-2">
          {props.label}
        </label>
        <input
          id={id}
          type="text"
          {...rest}
          ref={ref}
          aria-invalid={props.isInValid}
          aria-describedby={`helper-text-for-${id}`}
          className="p-2 md:p-3 rounded-md w-full border-2"
        />
        {props.validationMessage && (
          <p
            className={`text-sm mt-2 ${
              props.isInValid ? "text-danger" : "text-light"
            }`}
          >
            {props.validationMessage}
          </p>
        )}
      </div>
    );
  }
);
