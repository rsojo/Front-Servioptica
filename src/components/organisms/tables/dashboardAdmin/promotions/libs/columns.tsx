import { GridColDef } from "@mui/x-data-grid";
import generalColumnProps from "../../../../../atoms/table/libs/generalColumnProps";
import { ButtonAtom, RowAtom } from "../../../../../atoms";



const columns = (handleEdit: (id: number) => void, handleDelete: (id: number) => void): GridColDef[] => {
  const columnData: GridColDef[] = [
    {
      ...generalColumnProps,
      field: "id",
      headerName: "Nº",
      minWidth: 50,
      maxWidth: 50,
    },
    {
      ...generalColumnProps,
      field: "title",
      headerName: "Nombre",
      minWidth: 330,
      maxWidth: 320,
    },
    {
      ...generalColumnProps,
      field: "date",
      headerName: "Fecha de finalización",
      minWidth: 200,
      maxWidth: 200,
      valueGetter: (value, row) =>
        `${String(row.date).split("-")[2]}/${String(row.date).split("-")[1]}/${
          String(row.date).split("-")[0]
        }`,
    },
    {
      field: "actions",
      headerName: "Acciones",
      minWidth: 180,
      maxWidth: 180,
      renderCell: (params) => (
        <RowAtom
          style={{ width: "100%", height: "100%" }}
          justifyContent="space-around"
          alignItems="center"
        >
          <ButtonAtom
            size="small"
            adVariant="linkStyle"
            onClick={() => handleEdit(params.row.id)}
          >
            Editar
          </ButtonAtom>
          <ButtonAtom
            size="small"
            adVariant="linkStyle"
            onClick={() => handleDelete(params.row.id)}
          >
            Eliminar
          </ButtonAtom>
        </RowAtom>
      ),
    },
    // {
    //   ...generalColumnProps,
    //   field: "fullName",
    //   headerName: "Full name",
    //   description: "This column has a value getter and is not sortable.",
    //   width: 160,
    //   valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
    // },
  ];
  return columnData;
};

export default columns;
