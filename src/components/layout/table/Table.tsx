import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TablePagination, Typography } from '@mui/material';

import styles from './Table.module.scss';

export interface TableProps {
  widths?: number[];
  headers?: any[];
  footerHeaders?: string[][];
  content?: any[];
  style?: Record<string, string>;
  className?: string;
  onNext?: () => void;
}

const TableData: React.FC<TableProps> = ({ headers = [], content = [] }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const paginatedContent = content.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const renderColumns = (columns: any[][], isHead = false) =>
    columns.map((row: any[], rowIndex: number) => (
      <TableRow className={styles.TableRow} key={rowIndex}>
        {row.map((cell: any, cellIndex: number) => {
          let textVal = cell;
          if (typeof cell === 'object' && cell?.value) {
            textVal = cell.value;
          }
          return isHead ? (
            <TableCell key={cellIndex} component="th">
              {textVal || '-'}
            </TableCell>
          ) : (
            <TableCell className={styles.TableCell} key={cellIndex}>
              {textVal || '-'}
            </TableCell>
          );
        })}
      </TableRow>
    ));

  return (
    <TableContainer className={styles.Table} component={Paper}>
      <Table aria-label="custom pagination table">
        <TableHead>{renderColumns(headers, true)}</TableHead>
        <TableBody>{renderColumns(paginatedContent)}</TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10, 15, 20]}
        component="div"
        count={content.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage={
          <Typography style={{ color: 'var(--color-text-second)' }}>
            Строк на странице:
          </Typography>
        }
        labelDisplayedRows={({ from, to, count }) => (
          <Typography
            style={{ color: 'white' }}
          >{`${from}–${to} из ${count !== -1 ? count : `более ${to}`}`}</Typography>
        )}
      />
    </TableContainer>
  );
};

export default TableData;
