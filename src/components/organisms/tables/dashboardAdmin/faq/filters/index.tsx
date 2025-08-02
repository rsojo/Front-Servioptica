
import {
  ButtonAtom,
  ColumnAtom,
  RowAtom,
  SelectAtom,
} from "../../../../../atoms";
import { TableFaqAdminView } from "..";

interface FiltersTableProps {
  stateFilter: string;
  setStateFilter: React.Dispatch<React.SetStateAction<string>>;
  setView: React.Dispatch<React.SetStateAction<TableFaqAdminView>>
}
export const FiltersTable = ({
  stateFilter,
  setStateFilter,
  setView
}: FiltersTableProps) => {


  return (
    <RowAtom
      style={{ width: "100%", flexFlow: "wrap" }}
      gap={1}
      justifyContent="space-between"
    >
      <ColumnAtom flex={2} style={{ minWidth: 100, maxWidth: 160 }}>
        <SelectAtom
          id="state"
          name="state"
          variant="small"
          options={[
            { option: "Inactive", value: "Inactive" },
            { option: "Active", value: "Active" },
          ]}
          placeholder={"Todos los estados"}
          defaultValue={stateFilter}
          onChangeCallback={(value) => setStateFilter(value)}
        />
      </ColumnAtom>
      <ColumnAtom flex={2} style={{ minWidth: 130, maxWidth: 180 }}>
        <ButtonAtom
          adVariant="small"
          style={{
            minWidth: "initial",
            width: "100%",
          }}
          onClick={() => {setView('form')}}
        >
          Crear Nuevo
        </ButtonAtom>
      </ColumnAtom>
    </RowAtom>
  );
};
