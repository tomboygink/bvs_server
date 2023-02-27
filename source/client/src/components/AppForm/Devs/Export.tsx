import * as React from 'react';
import {
  DataGridPremium,
  GridToolbarContainer,
  GridToolbarExport,
  GridCsvExportOptions,
  GridExcelExportOptions ,
  GridColumns,
  GridRowsProp,
  useGridApiContext,
} from '@mui/x-data-grid-premium';
import { ButtonProps, Button } from '@mui/material';

const rows: GridRowsProp = [
  {
    jobTitle: 'Head of Human Resources',
    recruitmentDate: new Date(2020, 8, 12),
    contract: 'full time',
    id: 0,
    arb: '4.987',
  }
];

const columns: GridColumns = [
  { 
    field:'jobTitle', 
    headerName: 'Устройства', 
    width: 200 },
  {
    field: 'recruitmentDate',
    headerName: 'Время устройства',
    type: 'date',
    width: 150,
  },
  {
    field: 'contract',
    headerName: 'Время сервера',
    type: 'singleSelect',
    valueOptions: ['full time', 'part time', 'intern'],
    width: 150,
  },
  {
    field: 'arb',
    headerName: 'АКБ',
    width: 150,
  },
];


export function CustomToolbar() {
  const apiRef = useGridApiContext();
  const handleExportExel = (options: GridExcelExportOptions) =>
  apiRef.current.exportDataAsExcel(options);
  const handleExportCSV = (options: GridCsvExportOptions) =>
  apiRef.current.exportDataAsCsv(options);
  return (
  <GridToolbarContainer>
   
      <Button
            sx={{
              background:
                "linear-gradient(to bottom, rgba(230, 230, 230, 0.1) 0%, rgba(0, 0, 0, 0.1) 100%)",
              borderRadius: "4px",
              border: "1px solid #a1919142",
              mr: "8px",
              color: "#111",
            }}
            onClick={() => handleExportExel({  })}
          >
            Excel
          </Button>

          <Button
            sx={{
              background:
                "linear-gradient(to bottom, rgba(230, 230, 230, 0.1) 0%, rgba(0, 0, 0, 0.1) 100%)",
              borderRadius: "4px",
              border: "1px solid #a1919142",
              mr: "8px",
              color: "#111",
            }}
            onClick={() => handleExportCSV({
              utf8WithBom: true
            })}
          >
            CSV
          </Button>


 </GridToolbarContainer>
  );
}

