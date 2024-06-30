import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CustomSimpleSelectProps {
  field: {
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<any>) => void;
    onBlur: (e: React.FocusEvent<any>) => void;
  };
  form: {
    touched: Record<string, boolean>;
    errors: Record<string, string>;
  };
  selectFor: string;
  items: any[];
}

const CustomSimpleSelect: React.FC<CustomSimpleSelectProps> = ({
  field,
  form: { touched, errors },
  selectFor,
  items,
}) => {
  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={`انتخاب ${selectFor}`} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{selectFor}</SelectLabel>
          <select
            {...field}
            className={`${
              touched[field.name] && errors[field.name]
                ? "border-red-500"
                : "border-gray-300"
            } block w-full mt-1`}
          >
            <option value="" disabled>
              انتخاب {selectFor}
            </option>
            {items.map((item: any) => (
              <option key={item.value} value={item.value}>
                {item.key}
              </option>
            ))}
          </select>
          {touched[field.name] && errors[field.name] && (
            <div className="text-red-500 mt-1 text-sm">
              {errors[field.name]}
            </div>
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CustomSimpleSelect;
