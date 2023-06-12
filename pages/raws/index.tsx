import Header from '@/components/Header';
import StickyTable from '@/components/Table/StickyTable';
import useDebounce from '@/hooks/useDebounce';
import { getRowData } from '@/services/row/row.services';
import { RowData } from '@/types/Row';
import { Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';

interface Column {
  id: 'ServiceName' | 'Location' | 'Cost' | 'ResourceGroup';
  label: string;
  minWidth?: number;
  align?: 'right';
  sortable?: boolean;
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: 'ServiceName', label: 'Service Name', minWidth: 170, sortable: true },
  { id: 'Location', label: 'Location', minWidth: 100 },
  { id: 'Cost', label: 'Cost', minWidth: 100 },
  { id: 'ResourceGroup', label: 'ResourceGroup', minWidth: 100 },
];

const Home = ({ rowData }: { rowData: RowData[] }) => {
  const [records, setRecords] = useState<RowData[]>(rowData);
  const [backupRecords, setBackupRecords] = useState<RowData[]>(rowData);
  const [sortMode, setSortMode] = useState<string>('asc');
  const [searchValue, setSearchValue] = useState<string>('');
  const debouncedValue = useDebounce<string>(searchValue, 1500);

  const handleSortByServiceName = (column: Column) => {
    let updatedRecords;
    if (sortMode === 'asc') {
      updatedRecords = records.sort((a, b) => b['ServiceName'].localeCompare(a['ServiceName']));
    } else {
      updatedRecords = records.sort((a, b) => a['ServiceName'].localeCompare(b['ServiceName']));
    }
    setRecords(updatedRecords);
    setSortMode(sortMode === 'asc' ? 'desc' : 'asc');
  };

  useEffect(() => {
    let updatedRecords = backupRecords.filter((r) => r.ServiceName.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()));
    setRecords(updatedRecords);
  }, [debouncedValue]);

  return (
    <>
      <Header />
      <Stack direction="row" spacing={2} justifyContent={'space-between'} alignItems={'center'} style={{ padding: '0 20px', marginBottom: '20px' }}>
        <Typography>Raws</Typography>
        <TextField
          id="outlined-search"
          label="Search by service name"
          type="search"
          placeholder="Search by service name"
          size="small"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </Stack>
      <StickyTable columns={columns} records={records} handleSorting={handleSortByServiceName} sortBy={'ServiceName'} sortMode={sortMode} />
    </>
  );
};

export async function getServerSideProps() {
  try {
    const rowData = await getRowData({});
    return {
      props: {
        rowData: rowData || [],
      },
    };
  } catch (error) {
    return {
      props: {
        rowData: [],
      },
    };
  }
}

export default Home;
