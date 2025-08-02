/* eslint-disable react-hooks/exhaustive-deps */
import {
  FormHelperText,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { ReactElement, useEffect, useState } from "react";
import "./style.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import GridAtom from "../grid";

export interface OptionsSelectAtomIt {
  option: string;
  value: string;
}

export type SelectAtomType = {
  id?: string;
  name?: string;
  disabled?: boolean;
  erroForm?: boolean;
  IconComponent?: any;
  important?: boolean;
  cleanValue?: boolean;
  placeholder?: string;
  defaultValue?: string;
  options: OptionsSelectAtomIt[];
  variant?: "general" | "linkStyle" | "listStyle" | "small";
  onChangeCallback: (value: string) => void;
};

export const SelectAtom = ({
  id,
  name,
  variant,
  options,
  erroForm,
  disabled,
  important,
  cleanValue,
  placeholder,
  defaultValue,
  IconComponent,
  onChangeCallback,
}: SelectAtomType): ReactElement => {
  const [error, setError] = useState(false);

  const [otionList, setOtionList] = useState(
    defaultValue === "" || defaultValue === undefined ? "NA" : defaultValue
  );

  useEffect(() => {
    setOtionList(!defaultValue || defaultValue === "" ? "NA" : defaultValue);
  }, [defaultValue]);

  const handleChange = (event: SelectChangeEvent) => {
    setOtionList(event.target.value);
    onChangeCallback(
      event.target.value === "NA" || Number(event.target.value) === 0
        ? ""
        : event.target.value
    );
  };

  useEffect(() => {
    important && erroForm ? setError(true) : setError(false);
    if (cleanValue) {
      setOtionList("NA");
    }
  }, [erroForm, cleanValue]);

  return (
    <GridAtom
      style={{ width: "100%" }}
      justifyContent="center"
      className={`${variant ? variant + "_box" : ""} ${
        IconComponent ? "baxSelectWithIcon" : ""
      }`}
    >
      {IconComponent && <IconComponent />}
      <Select
        className={`customSelect ${variant ?? ""} ${
          IconComponent ? "withIcon" : ""
        } ${error ? "erro" : ""} ${variant ? variant + "_list" : ""}`}
        error={error}
        id={id}
        name={name ?? id}
        value={otionList.toString()}
        disabled={disabled ?? false}
        onChange={handleChange}
        IconComponent={KeyboardArrowDownIcon}
        placeholder={placeholder}
      >
        {placeholder && (
          <MenuItem selected={true} value="NA" style={{ opacity: 0.5 }}>
            {placeholder}
          </MenuItem>
        )}
        {options.map((option: OptionsSelectAtomIt) => (
          <MenuItem
            key={option.option}
            value={option.value}
            className={`${variant ? variant + "_item" : ""}`}
          >
            {option.option}
          </MenuItem>
        ))}
      </Select>
      {error && otionList === "NA" && (
        <FormHelperText style={{ color: "rgb(211, 47, 47)" }}>
          Error
        </FormHelperText>
      )}
    </GridAtom>
  );
};

export default SelectAtom;
