import * as React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DateInputProps {
  id: string;
  label: string;
  field?: any;
}

/**export date input component */
export default function DateInput(props: DateInputProps) {
  const { id, label, field, ...rest } = props;

  return (
    <div className="flex flex-col">
      <label htmlFor={props.id} className="font-bold text-sm mb-2">
        {props.label}
      </label>
      <DatePicker
        dateFormat="dd/MM/yyyy"
        onChange={(e) => field.onChange(e)}
        selected={field.value}
        placeholderText="Date of Birth"
        className="p-2 md:p-3 rounded-md w-full border-2"
        {...rest}
      />
    </div>
  );
}
