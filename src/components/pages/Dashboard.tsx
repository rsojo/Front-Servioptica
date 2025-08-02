/* eslint-disable react-hooks/exhaustive-deps */
// src/components/Dashboard.tsx
import React, { useEffect, useRef, useState } from "react";
import {
  ColumnAtom,
  ContainerAtom,
  GridAtom,
  RowAtom,
  SpaceAtom,
} from "../atoms";
import { SliderDash } from "../organisms/sliderDash";
import { getPromotionsActives } from "../../api/Promotions";
import { CircularProgress } from "@mui/material";
import { useAtom } from "jotai";
import { appStoreAtom } from "../../store/Auth";
import { Navigate } from "react-router-dom";
import { TableMainAdmin } from "../organisms/tables/dashboardAdmin/main";

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(false);
  
  const [promotionsData, setPromotionsData] = useState<Array<{
    img: string;
    title: string;
    description: string;
  }> | null>(null);

  const hasFetchedPromotions = useRef(false);

  const fetchPromotionsData = async () => {
    try {
      if (!promotionsData && !loading) {
        setLoading(true);
        const response = await getPromotionsActives();
        const formatingData = response.data.map((item) => ({
          img: item.img,
          title: item.title,
          description: item.description,
          link: item.link,
        }));
        setPromotionsData(formatingData);
      }
    } catch (error) {
      console.error("Error fetching Promotions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!hasFetchedPromotions.current && !loading) {
      hasFetchedPromotions.current = true;
      fetchPromotionsData();
    }
  }, [loading]);
  
  const [appStore] = useAtom(appStoreAtom); 

  if (!appStore.auth?.access_token) {
    return <Navigate to="/login" replace />;
  }

  if (appStore.auth.admin) {
    return <Navigate to="/dashboard-admin" replace />;
  }

  // const location = useLocation();
  // const searchParams = new URLSearchParams(location.search);
  // const id = searchParams.get("id"); // Obtener el parámetro "id" si está presente
  return (
    <ContainerAtom
      style={{
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <SpaceAtom v={40} />
      <RowAtom
        gap={4}
        style={{
          minHeight: 400,
          flexFlow: "wrap",
          maxWidth: 1440,
          width: "100%",
        }}
        p={3}
      >
        <ColumnAtom flex={8} style={{ minWidth: 300 }}>
          <TableMainAdmin />
        </ColumnAtom>
        <ColumnAtom flex={4} style={{ minWidth: 300 }}>
          {loading && (
            <GridAtom
              p={5}
              style={{ minHeight: 320, width: "100%" }}
              justifyContent="center"
              alignItems="center"
            >
              <CircularProgress />
            </GridAtom>
          )}
          {promotionsData && <SliderDash data={promotionsData} />}
        </ColumnAtom>
      </RowAtom>
    </ContainerAtom>
  );
};

export default Dashboard;
