import React, { useMemo, useState, useCallback } from "react";
import { Paper, Stack } from "@mui/material";
import CustomDataGrid from "./CustomDataGrid";

export default function App() {
  const [rowSelectionModel, setRowSelectionModel] = useState([]);

  const [paginationModel, setPaginationModel] = useState({
    page: 1,
    pageSize: 50,
  });

  const [sortingModel, setSortingModel] = useState({
    sortAttribute: null,
    sortingOrder: null,
  });

  const isPending = false;
  const isError = false;

  const data = {
    total: 500,
  };

  const rows = useMemo(() => {
    return Array.from({ length: 500 }, (_, index) => ({
      id: index + 1,
      storeName: `Store ${index + 1}`,
      companyName: `Company ${index + 1}`,
      merchantId: `MID-${index + 1}`,
      merchantStatus:
        index % 2 === 0 ? "ACTIVE" : "PENDING",
      iscAccountManager: `Manager ${index % 10}`,
      tenancyStartDate: "01/01/2024",
      tenancyEndDate: "01/01/2027",
      marginsNt: "10",
      marginsTrDeparture: "12",
      marginsTrArrivalHomeDelivery: "15",
      merchantClassification: "Tier 1",
      gstAbsorptionTravellerDeparture: "Yes",
      gstAbsorptionTravellerArrivalAndHomeDelivery: "No",
      gstAbsorptionNonTraveller: "Yes",
      sitewidePromoCodeEligibility: "Yes",
      fulfilmentDeparture: "Yes",
      fulfilmentArrival: "No",
      fulfilmentLandside: "Yes",
      departureOrderLeadTime: index,
      shipmentTypeAirport: "Collection",
      fulfilmentTravellerHomeDel: "Yes",
      fulfilmentNtHomeDel: "No",
      shipmentTypeSgDel: "Delivery",
      dropshipType: "Standard",
      minSpendForFreeDelivery: index * 10,
      deliveryFee: index,
      category: "Fashion",
    }));
  }, []);

  const customeSortComparator = (v1, v2) => {
    const num1 =
      isNaN(Number(v1)) || v1 === "-"
        ? -Infinity
        : Number(v1);

    const num2 =
      isNaN(Number(v2)) || v2 === "-"
        ? -Infinity
        : Number(v2);

    return num1 - num2;
  };

  const columns = useMemo(
    () => [
      {
        field: "storeName",
        headerName: "Store Name",
        minWidth: 220,
        flex: 1,
      },
      {
        field: "companyName",
        headerName: "Company Name",
        minWidth: 220,
        flex: 1,
      },
      {
        field: "category",
        headerName: "Category",
        minWidth: 170,
        flex: 1,
      },
      {
        field: "merchantId",
        headerName: "Merchant ID",
        minWidth: 170,
        flex: 1,
      },
      {
        field: "merchantStatus",
        headerName: "Status",
        minWidth: 170,
      },
      {
        field: "iscAccountManager",
        headerName: "Account Manager",
        minWidth: 170,
        flex: 1,
      },
      {
        field: "tenancyStartDate",
        headerName: "Contract Start Date",
        minWidth: 180,
      },
      {
        field: "tenancyEndDate",
        headerName: "Contract End Date",
        minWidth: 180,
      },
      {
        field: "departureOrderLeadTime",
        headerName: "Dep Order Lead Time (Hrs)",
        minWidth: 220,
        sortComparator: customeSortComparator,
      },
      {
        field: "minSpendForFreeDelivery",
        headerName: "Min Spend For Free Delivery",
        minWidth: 220,
        sortComparator: customeSortComparator,
      },
      {
        field: "deliveryFee",
        headerName: "Delivery Fee",
        minWidth: 170,
        sortComparator: customeSortComparator,
      },
    ],
    []
  );

  const handleSortModelChange = useCallback((sortModel) => {
    if (!sortModel?.length) return;

    setSortingModel({
      sortAttribute: sortModel[0].field,
      sortingOrder:
        sortModel[0].sort === "asc"
          ? "ascending"
          : "descending",
    });

    console.log("SORT MODEL", sortModel);
  }, []);

  return (
    <Stack sx={{ p: 2 }}>
      <Paper sx={{ p: 2 }}>
        <CustomDataGrid
          disableRowSelectionExcludeModel
          checkboxSelection
          rows={rows}
          loading={isPending}
          onRowSelectionModelChange={(newModal) => {
            const newRowSelectionModel = Array.from(
              newModal.ids
            );

            setRowSelectionModel(newRowSelectionModel);
          }}
          total={data.total}
          rowSelectionModel={{
            type: "include",
            ids: new Set(rowSelectionModel ?? []),
          }}
          sortingMode="server"
          onSortModelChange={handleSortModelChange}
          columnHeaderHeight={80}
          paginationModel={paginationModel}
          setPaginationModel={setPaginationModel}
          isError={isError}
          columns={columns}
          extraStyles={{
            "& .MuiDataGrid-columnHeaderTitle": {
              whiteSpace: "normal",
              lineHeight: "normal",
            },
          }}
        />
      </Paper>
    </Stack>
  );
}