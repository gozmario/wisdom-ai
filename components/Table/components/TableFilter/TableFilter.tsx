import {
  Divider,
  FormControlLabel,
  FormGroup,
  Menu,
  Switch,
} from "@mui/material";
import { useState } from "react";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { ColumnDef } from "../..";
import "./table-filter.style.css";

type TableFilterProps<T> = {
  columnDef: ColumnDef<T>[];
  visibleColumns: (keyof T)[];
  onFilterChange: (name: keyof T, visible: boolean) => void;
  onSelectChange: (value: "show" | "hide") => void;
};

function TableFilter<T>(props: TableFilterProps<T>) {
  const { columnDef, visibleColumns, onFilterChange, onSelectChange } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="table-filter">
      <IconButton onClick={handleClick}>
        <MenuIcon />
      </IconButton>
      <Menu
        id="filter-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <div className="filter-content">
          <div className="filter-header">
            <a
              onClick={() => onSelectChange("show")}
              className={
                visibleColumns.length < columnDef.length ? "active" : ""
              }
            >
              Select all
            </a>
            |{" "}
            <a
              onClick={() => onSelectChange("hide")}
              className={visibleColumns.length > 0 ? "active" : ""}
            >
              Hide all
            </a>
          </div>
          <Divider sx={{ marginY: 2 }} />
          <FormGroup>
            {columnDef.map((col, idx) => (
              <FormControlLabel
                key={`filter-${idx}`}
                control={
                  <Switch
                    checked={visibleColumns.includes(col.dataIndex)}
                    onChange={(_, checked) =>
                      onFilterChange(col.dataIndex, checked)
                    }
                  />
                }
                label={col.name}
              />
            ))}
          </FormGroup>
        </div>
      </Menu>
    </div>
  );
}

export default TableFilter;
