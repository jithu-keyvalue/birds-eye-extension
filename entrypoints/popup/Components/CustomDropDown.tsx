import { useState } from "react";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";

import ChevronDown from "../../../assets/icons/chevronDown.svg";

const CustomDropdown = ({
  options,
}: {
  options: { key: string; value: string }[];
}) => {
  const [selectedOption, setSelectedOption] = useState(options[0].key);

  useEffect(() => {
    console.log(selectedOption);
  }, [selectedOption]);

  const handleOptionSelect = (event: SelectChangeEvent<string>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <Select
      value={selectedOption}
      onChange={handleOptionSelect}
      IconComponent={() => (
        <img
          className="dropdown-arrow"
          style={{ cursor: "pointer" }}
          src={ChevronDown}
        />
      )} // Custom dropdown icon
      variant="standard"
      disableUnderline
      MenuProps={{
        PaperProps: {
          style: {
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
          },
        },
      }}
      sx={{
        "& .MuiSelect-select": {
          padding: "0px 5px !important", // Remove padding
        },
        "& .MuiSvgIcon-root": {
          marginLeft: "8px", // Icon spacing
        },
        color: "#4a3500", // Text color
        fontWeight: "600",
        border: "none", // Remove border
        outline: "none",
        backgroundColor: "transparent", // Remove background color
        "&:hover": {
          backgroundColor: "transparent",
        }
      }}
    >
      {options.map((option: { key: string; value: string }, index: number) => (
        <MenuItem key={index} value={option.key}>
          {option.value}
        </MenuItem>
      ))}
    </Select>
  );
};

export default CustomDropdown;
