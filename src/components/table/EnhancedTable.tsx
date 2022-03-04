import React, {FC, ForwardedRef} from 'react';

import {useGlobalFilter, usePagination, useRowSelect, useSortBy, useTable} from 'react-table';
import {Box, Checkbox, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel} from '@mui/material';
import TableToolbar from './TableToolbar';

const IndeterminateCheckbox: ForwardedRef<any> = React.forwardRef(
    ({indeterminate, ...rest}, ref) => {
      const defaultRef = React.useRef();
      const resolvedRef = ref || defaultRef;

      React.useEffect(() => {
        //@ts-ignore
        resolvedRef.current.indeterminate = indeterminate;
      }, [resolvedRef, indeterminate]);

      return (
          <>
            <Checkbox ref={resolvedRef} {...rest} />
          </>
      );
    },
);

type EditableCellProps = {
  value: any,
  cell: {
    value: any,
  },
  row: {
    index: number,
  },
  column: {
    id: number
  },
  updateMyData: (index: number, id: number, value: any) => void,
}

const EditableCell: FC<EditableCellProps> = ({
                        value: initialValue,
                        row: {index},
                        column: {id},
                        updateMyData,
                      }) => {
  const [value, setValue] = React.useState(initialValue);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onBlur = () => {
    updateMyData(index, id, value);
  };

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
      <Box
          component='input'
          sx={{
            padding: 0,
            margin: 0,
            border: 0,
            background: 'transparent',
          }}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
      />
  );
};

// Set our editable cell renderer as the default Cell renderer
const defaultColumn = {
  Cell: EditableCell,
};

type EnhancedTableProps = {
  columns: any[],
  data: any[],
  updateMyData: () => void,
  setData: () => void,
  skipPageReset: boolean,
}

const EnhancedTable: FC<EnhancedTableProps> = ({
                                                 columns,
                                                 data,
                                                 setData,
                                                 updateMyData,
                                                 skipPageReset,
                                               }) => {
  const {
    getTableProps,
    headerGroups,
    prepareRow,
    page,
    gotoPage,
    setPageSize,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: {pageIndex, pageSize, selectedRowIds, globalFilter},
  } = useTable(
      {
        columns,
        data,
        defaultColumn,
        autoResetHiddenColumns: !skipPageReset,

      },
      useGlobalFilter,
      useSortBy,
      usePagination,
      useRowSelect,
      hooks => {
        hooks.allColumns.push(columns => [
          {
            id: 'selection',
            Header: ({getToggleAllRowsSelectedProps}) => (
                <div>
                  <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
                </div>
            ),
            Cell: ({row}) => (
                <div>
                  <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                </div>
            ),
          },
          ...columns,
        ]);
      },
  );

  const handleChangePage = (event, newPage) => {
    gotoPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setPageSize(Number(event.target.value));
  };

  const removeByIndexs = (array, indexs) =>
      array.filter((_, i) => !indexs.includes(i));

  const deleteUserHandler = event => {
    const newData = removeByIndexs(
        data,
        Object.keys(selectedRowIds).map(x => parseInt(x, 10)),
    );
    setData(newData);
  };

  const addUserHandler = user => {
    const newData = data.concat([user]);
    setData(newData);
  };

  // Render the UI for your table
  return (
      <TableContainer>
        <TableToolbar
            numSelected={Object.keys(selectedRowIds).length}
            deleteUserHandler={deleteUserHandler}
            addUserHandler={addUserHandler}
            preGlobalFilteredRows={preGlobalFilteredRows}
            setGlobalFilter={setGlobalFilter}
            globalFilter={globalFilter}
        />
        <MaUTable {...getTableProps()}>
          <TableHead>
            {headerGroups.map(headerGroup => (
                <TableRow {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                      <TableCell
                          {...(column.id === 'selection'
                              ? column.getHeaderProps()
                              : column.getHeaderProps(column.getSortByToggleProps()))}
                      >
                        {column.render('Header')}
                        {column.id !== 'selection' ? (
                            <TableSortLabel
                                active={column.isSorted}
                                // react-table has a unsorted state which is not treated here
                                direction={column.isSortedDesc ? 'desc' : 'asc'}
                            />
                        ) : null}
                      </TableCell>
                  ))}
                </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                  <TableRow {...row.getRowProps()}>
                    {row.cells.map(cell => {
                      return (
                          <TableCell {...cell.getCellProps()}>
                            {cell.render('Cell')}
                          </TableCell>
                      );
                    })}
                  </TableRow>
              );
            })}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TablePagination
                  rowsPerPageOptions={[
                    5,
                    10,
                    25,
                    {label: 'All', value: data.length},
                  ]}
                  colSpan={3}
                  count={data.length}
                  rowsPerPage={pageSize}
                  page={pageIndex}
                  SelectProps={{
                    inputProps: {'aria-label': 'rows per page'},
                    native: true,
                  }}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </MaUTable>
      </TableContainer>
  );
};

export default EnhancedTable;
