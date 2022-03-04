import React, {FC} from 'react';
import {Box, IconButton} from '@mui/material';
import LastPageOutlinedIcon from '@mui/icons-material/LastPageOutlined';
import FirstPageOutlinedIcon from '@mui/icons-material/FirstPageOutlined';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';

type TablePaginationActionsProps = {
  count: number,
  onChangePage: (event: React.MouseEvent, page: number) => void,
  page: number,
  rowsPerPage: number,
}
const TablePaginationActions: FC<TablePaginationActionsProps> = ({
                                                                   count,
                                                                   page,
                                                                   rowsPerPage,
                                                                   onChangePage,
                                                                 }) => {
  const handleFirstPageButtonClick = (event: React.MouseEvent) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
      <Box
          sx={{
            flexShrink: 0,
            marginLeft: 2.5,
          }}
      >
        <IconButton
            onClick={handleFirstPageButtonClick}
            disabled={page === 0}
            aria-label="first page"
        >
          <FirstPageOutlinedIcon/>
        </IconButton>
        <IconButton
            onClick={handleBackButtonClick}
            disabled={page === 0}
            aria-label="previous page"
        >
          <KeyboardArrowLeftOutlinedIcon/>
        </IconButton>
        <IconButton
            onClick={handleNextButtonClick}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="next page"
        >
          <KeyboardArrowRightOutlinedIcon/>
        </IconButton>
        <IconButton
            onClick={handleLastPageButtonClick}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="last page"
        >
          <LastPageOutlinedIcon/>
        </IconButton>
      </Box>
  );
};

export default TablePaginationActions;
