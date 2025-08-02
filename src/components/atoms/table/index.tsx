import { DataGrid } from "@mui/x-data-grid";
import GridAtom from "../grid";
import { FiltersTable } from "./filters";
import RowAtom from "../row";
import { localeText } from "./libs";
import dashColumns from "./libs/dashColumns";
import { useState } from "react";
import "./style.css";
import ColumnAtom from "../column";
import TextAtom from "../text";
import { BASE_COLORS } from "../../../style/constants";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";

const rows = [
  {
    id: 1,
    order: 1013138654,
    site: "Óptica Txt 01",
    lot: "10135-79840",
    state: "En proceso",
    date: "2024-09-01",
  },
  {
    id: 2,
    order: 1013138654,
    site: "Óptica Txt 02",
    lot: "20135-79840",
    state: "Finalizado",
    date: "2024-09-02",
  },
];

const paginationModel = { page: 0, pageSize: 10 };

export default function DataTable() {
  const [siteFilter, setSiteFilter] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const filteredRows = rows.filter((row) => {
    const matchesSite = siteFilter ? row.site.includes(siteFilter) : true;
    const matchesState = stateFilter ? row.state.includes(stateFilter) : true;
    const matchesDate = dateFilter ? row.date === dateFilter : true;
    return matchesSite && matchesState && matchesDate;
  });

  return (
    <GridAtom style={{ height: 505, width: "100%" }} gap={4}>
      <RowAtom style={{ width: "100%" }} gap={2}>
        <ColumnAtom flex={3} style={{minWidth:158}}>
          <RowAtom alignItems="center" gap={2} style={{ height: 32 }}>
            <RowAtom gap={1}>
              <Inventory2RoundedIcon
                style={{ color: BASE_COLORS.blue, fontSize: 20 }}
              />

              <TextAtom
                style={{
                  color: BASE_COLORS.blue,
                  fontSize: 20,
                  fontWeight: 900,
                }}
              >
                Pedidos
              </TextAtom>
            </RowAtom>
            <span
              style={{ background: BASE_COLORS.blue, height: "100%", width: 1 }}
            ></span>
            <FilterAltOutlinedIcon
              style={{ color: BASE_COLORS.blue, fontSize: 20 }}
            />
          </RowAtom>
        </ColumnAtom>
        <ColumnAtom flex={12}>
          <FiltersTable
            siteFilter={siteFilter}
            setSiteFilter={setSiteFilter}
            stateFilter={stateFilter}
            setStateFilter={setStateFilter}
            dateFilter={dateFilter}
            setDateFilter={setDateFilter}
          />
        </ColumnAtom>
      </RowAtom>
      <DataGrid
        localeText={localeText}
        style={{ width: "100%" }}
        rows={filteredRows}
        columns={dashColumns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[10, 20, 50, 100]}
        checkboxSelection={false}
        rowSelection={false}
        onRowClick={() => {}}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "alternate-row" : ""
        }
        sx={{ border: 0 }}
      />
    </GridAtom>
  );
}
