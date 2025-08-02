import { Link, useNavigate } from "react-router-dom";
import {
  ButtonAtom,
  ColumnAtom,
  ContainerAtom,
  GridAtom,
  InputTextAtom,
  RowAtom,
  SpaceAtom,
  TextAtom,
  TitleAtom,
} from "../../atoms";

import LogoServioptica from "../../../assets/img/logo_servioptica@2x.webp";
import bkDash from "../../../assets/img/bkDashAdmin.webp";
import PersonIcon from "@mui/icons-material/Person";
import { BASE_COLORS } from "../../../style/constants";
import { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { appStoreAtom } from "../../../store/Auth";
import { useAtom } from "jotai";
import { searchOrder } from "../../../store/searchOrder";
import { hideSearchAtom } from "../../../store/searchOrder/hideSearchAtom";

export const DashHeaderAdmin = () => {
  const [hideSearch] = useAtom(hideSearchAtom);
  const [, setSearchOrderAtom] = useAtom(searchOrder)
  const [, setAppStore] = useAtom(appStoreAtom);
  const navetgate = useNavigate();
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSearchOreder = () => {
    console.log("searchValue", searchValue);
    setSearchOrderAtom((prev)=>({...prev, document: searchValue}))
  }

  return (
    <header style={{ position: "relative", display: "flex" }}>
      <GridAtom
        alignItems="center"
        justifyContent="center"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          zIndex: 1,
          overflow: "hidden",
        }}
      >
        <img
          src={bkDash}
          style={{ objectFit: "cover", height: "100%", width: "105%" }}
          width={1920}
          height={330}
          alt="imagen del banner"
        />
      </GridAtom>
      <ContainerAtom style={{ zIndex: 2, marginBottom: 10, minHeight: 330 }}>
        <RowAtom className="HeaderRow" style={{ flexFlow: "wrap" }}>
          <ColumnAtom
            flex={3}
            alignItems="flex-start"
            justifyContent="center"
            gap={2}
          >
              <img
                style={{ objectFit: "contain" }}
                src={LogoServioptica}
                alt={"Logo Servioptica"}
                width={215}
                height={91}
              />
            <TextAtom
              type="small"
              style={{
                color: BASE_COLORS.blue,
                textAlign: "center",
                fontSize: 10,
              }}
            >
              UN LABORATORIO DEL GRUPO ESSILORLUXOTTICA
            </TextAtom>
          </ColumnAtom>
          <ColumnAtom
            flex={3}
            alignItems="flex-end"
            style={{ color: BASE_COLORS.blue, minWidth: 80 }}
          >
            <RowAtom
              alignItems="center"
              gap={2}
              style={{justifyContent: 'flex-end' }}
            >
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <GridAtom
                  p={1}
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: 120,
                    border: "1px solid var(--mainBtnColor)",
                  }}
                >
                  <PersonIcon style={{ color: "var(--mainBtnColor)" }} />
                </GridAtom>
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem
                  onClick={() => {
                    setAppStore({ auth: null, user: null });
                    localStorage.removeItem('appStoreAtom');
                    handleClose();
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </RowAtom>
          </ColumnAtom>
        </RowAtom>
        <SpaceAtom v={48} />
        {!hideSearch && <GridAtom
          style={{ width: "100%", marginBottom: -50 }}
          alignItems="center"
          gap={4}
        >
          <TitleAtom
            style={{
              color: BASE_COLORS.blue,
              fontSize: 20,
              textAlign: "center",
              textShadow: "0px 3px 6px #FFFFFF",
              fontWeight: 900,
            }}
          >
            Consulta de NIT
          </TitleAtom>
          <RowAtom
            alignItems="center"
            gap={2}
            style={{ width: "100%", maxWidth: 600 }}
          >
            <ColumnAtom flex={10}>
              <InputTextAtom
                field={{ id: "search_orders", placeholder: "Nº de Nit Optica" }}
                onChangeCallback={(value) => {
                  setSearchValue(value as string);
                }}
              />
            </ColumnAtom>
            <ColumnAtom style={{ flex: "none" }}>
              <ButtonAtom
                disabled={!searchValue}
                onClick={() => {
                  handleSearchOreder();
                }}
                style={{ minWidth: 173 }}
              >
                Buscar
              </ButtonAtom>
            </ColumnAtom>
          </RowAtom>
        </GridAtom>}
      </ContainerAtom>
    </header>
  );
};
