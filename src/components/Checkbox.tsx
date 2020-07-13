import React, { useEffect, useState } from "react";
import cuid from "cuid";

import Stack from "./Stack";
import Text from "./Text";

export interface Option {
  label: string;
  value: string;
}

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  legend: string;
  options: Option[];
  value?: string | string[];
  type: "checkbox" | "radio";
}

const optionShouldBeChecked = (
  value: Props["value"],
  optionValue: Option["value"]
) => {
  if (!value) {
    return false;
  }

  if (value === optionValue) {
    return true;
  }

  if (Array.isArray(value) && value.includes(optionValue)) {
    return true;
  }

  return false;
};

const Checkbox: React.FC<Props> = ({
  name,
  value,
  legend,
  options,
  type,
  ...props
}) => {
  const [optionIds, setOptionIds] = useState<string[]>([]);

  useEffect(() => {
    setOptionIds(options.map(() => cuid()));
  }, [options]);

  return (
    <fieldset>
      <Stack gap={1}>
        <legend>
          <Text as="strong">{legend}</Text>
        </legend>
        <Stack gap={4} dir="row" responsive>
          {options.map(({ label, value: optionValue }, index) => (
            <label htmlFor={`option-${optionIds[index]}`} key={optionValue}>
              <Stack dir="row" gap={2} align="center">
                <input
                  name={name}
                  type={type}
                  value={optionValue}
                  id={`option-${optionIds[index]}`}
                  checked={optionShouldBeChecked(value, optionValue)}
                  {...props}
                />
                <span>{label}</span>
              </Stack>
            </label>
          ))}
        </Stack>
      </Stack>
    </fieldset>
  );
};

export default Checkbox;
