import React, {FC} from 'react';
import {Box, InputBase} from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

type GlobalFilterProps = {
  preGlobalFilteredRows: any[],
  globalFilter: string,
  setGlobalFilter: (value: string | undefined) => void,
}

const GlobalFilter: FC<GlobalFilterProps> = ({
                                               preGlobalFilteredRows,
                                               globalFilter,
                                               setGlobalFilter,
                                             }) => {
  const count = preGlobalFilteredRows.length;

  return (
      <Box
          sx={theme => ({
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: theme.palette.common.white,
            '&:hover': {
              backgroundColor: theme.palette.common.white,
            },
            marginRight: theme.spacing(2),
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
              marginLeft: theme.spacing(3),
              width: 'auto',
            },
          })}
      >
        <Box
            sx={theme => ({
              width: theme.spacing(7),
              height: '100%',
              position: 'absolute',
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            })}
        >
          <SearchOutlinedIcon/>
        </Box>
        <InputBase
            value={globalFilter || ''}
            onChange={e => {
              setGlobalFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
            }}
            placeholder={`${count} records...`}
            sx={theme => ({
              '.MuiInputBase-input': {
                padding: theme.spacing(1, 1, 1, 7),
                transition: theme.transitions.create('width'),
                width: '100%',
                [theme.breakpoints.up('md')]: {
                  width: 200,
                },
              },
              '.MuiInputBase-root': {
                color: 'inherit',
              },
            })}
            inputProps={{'aria-label': 'search'}}
        />
      </Box>
  );
};

export default GlobalFilter;
