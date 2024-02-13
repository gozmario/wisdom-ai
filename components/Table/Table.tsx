import React, { ReactNode, useState } from "react";
import TableFilter from "./components/TableFilter/TableFilter";
import "./table.style.css";

export type ColumnDef<T> = {
  dataIndex: keyof T;
  name: string;
  visible: boolean;
};

export type TableProps<T> = {
  data: T[];
  columnDef: ColumnDef<T>[];
};

function Table<T>({ columnDef, data }: TableProps<T>) {
  const [visibleColumns, setVisibleColumns] = useState(
    columnDef.map((v) => v.dataIndex)
  );

  const onFilterChange = (name: keyof T, visible: boolean) => {
    if (visible) {
      setVisibleColumns((prev) => [...prev, name]);
    } else {
      setVisibleColumns((prev) => prev.filter((v) => v !== name));
    }
  };

  const onSelectChange = (value: "show" | "hide") => {
    if (value === "show") {
      setVisibleColumns(columnDef.map((v) => v.dataIndex));
    } else {
      setVisibleColumns([]);
    }
  };

  const filteredColumns = columnDef.filter((c) =>
    visibleColumns.includes(c.dataIndex)
  );

  return (
    <div className="table-container">
      <TableFilter<T>
        columnDef={columnDef}
        visibleColumns={visibleColumns}
        onFilterChange={onFilterChange}
        onSelectChange={onSelectChange}
      />
      <table className="table">
        <thead>
          <tr>
            {filteredColumns.map((header, idx) => (
              <th key={`header-${idx}`}>{header.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={`row-${idx}`}>
              {filteredColumns.map((key, idx) => (
                <td key={`data-${idx}`}>{row[key.dataIndex] as ReactNode}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
