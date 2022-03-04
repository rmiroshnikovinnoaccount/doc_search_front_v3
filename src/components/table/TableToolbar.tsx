import React, {FC} from 'react';
import Toolbar from '@mui/material/Toolbar';
import {IconButton, lighten, Tooltip, Typography} from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import GlobalFilter from './GlobalFilter';
import AddUserDialog from './AddUserDialog';

type TableToolbarProps = {
  numSelected: number,
  addUserHandler: () => void,
  deleteUserHandler: () => void,
  setGlobalFilter: () => void,
  preGlobalFilteredRows: any[],
  globalFilter: string,
}

const TableToolbar: FC<TableToolbarProps> = ({
                                               numSelected,
                                               addUserHandler,
                                               deleteUserHandler,
                                               preGlobalFilteredRows,
                                               setGlobalFilter,
                                               globalFilter,
                                             }) => {
  return (
      <Toolbar
          sx={theme => ({
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(1),
            color: numSelected > 0 ? theme.palette.secondary.main : undefined,
            backgroundColor: numSelected > 0 ? lighten(theme.palette.secondary.light, 0.85) : undefined,
          })}
      >
        <AddUserDialog addUserHandler={addUserHandler} />
        {numSelected > 0 ? (
            <Typography
                sx={{flex: '1 1 100%'}}
                color="inherit"
                variant="subtitle1"
            >
              {numSelected} selected
            </Typography>
        ) : (
            <Typography sx={{flex: '1 1 100%'}} variant="h6" id="tableTitle">
              Users
            </Typography>
        )}

        {numSelected > 0 ? (
            <Tooltip title="Delete">
              <IconButton aria-label="delete" onClick={deleteUserHandler}>
                <DeleteOutlineOutlinedIcon />
              </IconButton>
            </Tooltip>
        ) : (
            <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
            />
        )}
      </Toolbar>
  )
}

export default TableToolbar
