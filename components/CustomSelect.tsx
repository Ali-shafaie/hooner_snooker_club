import React from "react";
import { FormikProps } from "formik";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "./ui/button";

interface CustomSelectProps {
  field: any;
  form: FormikProps<any>;
  items: any;
  selectFor: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  field,
  form,
  items,
  selectFor,
}) => {
  const [open, setOpen] = React.useState(false);

  let { name, value } = field;

  const { setFieldValue } = form;

  const handleChange = (currentValue: string) => {
    setFieldValue(name, currentValue === value ? "" : currentValue);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="mt-1">
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between border-gray-300"
        >
          {value?.name
            ? value.name
            : value
            ? items.find((item: any) => item.value === value)?.label
            : `انتخاب ${selectFor}`}
          <ChevronsUpDown className="mr-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-full p-0 bg-white">
        <Command>
          <CommandInput placeholder={`جستجوی ${selectFor}`} />
          <CommandEmpty>هیچ {selectFor} یافت نشد</CommandEmpty>
          <CommandGroup>
            {items.map((item: any) => (
              <CommandItem
                key={item.value}
                onSelect={(currentValue) => {
                  handleChange(currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "ml-2 h-4 w-4",
                    value === item.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CustomSelect;
