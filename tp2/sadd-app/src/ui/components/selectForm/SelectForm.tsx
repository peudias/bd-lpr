import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  FormHelperText,
  SxProps,
  MenuItem,
} from "@mui/material";
import { Theme } from "@mui/material/styles";
import { UseFormRegister, FieldError } from "react-hook-form";

interface SelectFormProps {
  name: string;
  label: string;
  value: string;
  handleChange: (event: SelectChangeEvent<string>) => void;
  sx?: SxProps<Theme>;
  error?: FieldError;
  children: React.ReactNode;
}

export const SelectForm: React.FC<SelectFormProps> = ({
  name,
  label,
  value,
  handleChange,
  sx,
  error,
  children,
}) => {
  const labelId = `${name}-label`;

  return (
    <FormControl sx={sx} error={!!error}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        labelId={labelId}
        id={name}
        value={value}
        label={label}
        onChange={handleChange}
        name={name} // Ensure the name matches the field name
      >
        {/* Pass children directly here */}
        {children}
      </Select>
      {error && <FormHelperText>{error.message}</FormHelperText>}
    </FormControl>
  );
};
