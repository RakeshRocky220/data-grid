import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Skeleton,
  Typography,
} from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";

const styles = {
  selectWrapper: {
    " .MuiSelect-select.MuiInputBase-input.MuiOutlinedInput-input ": {
      fontSize: "14px",
      padding: "14px 28px 14px 4px",
    },
  },
  selectStyles: {
    " .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
  },
};

const calculateRange = (page, pageSize, total) => {
  const startIndex = (page - 1) * pageSize + 1;
  let endIndex = startIndex + pageSize - 1;
  if (endIndex > total) endIndex = total;
  if (total === 0) return "0-0";
  return `${startIndex}-${endIndex}`;
};

const CustomPagination = ({
  paginationModel,
  setPaginationModel,
  lastEvaluatedKey,
  loading,
  rows,
  total = 0
   
}) => {
  const [page, setPage] = useState(paginationModel?.page ?? 1);
  const { pageSize } = paginationModel;
  const previousKeyRef = useRef([null]);
  useEffect(() => {
    if (
      (Object.hasOwn(paginationModel, "lastEvaluatedKey") &&
        paginationModel?.lastEvaluatedKey === null) ||
      Object.hasOwn(paginationModel, "page")
    ) {
      setPage(paginationModel?.page ?? 1);
    }
  }, [paginationModel?.lastEvaluatedKey, paginationModel?.page]);

  const handleChange = (e) => {
    previousKeyRef.current = [null];
    setPage(1);
    setPaginationModel((prev) => {
      
      if (Object.hasOwn(paginationModel, "lastEvaluatedKey")) {
        return {
          ...prev,
          pageSize: e.target.value,
          lastEvaluatedKey: null,
        };
      }
      return {
        ...prev,
        page: 1,
        pageSize: e.target.value,
      };
    });
  };

  const handleBackword = () => {
    setPage((prev) => prev - 1);
    setPaginationModel((prev) => {
      if (Object.hasOwn(paginationModel, "lastEvaluatedKey")) {
        return {
          ...prev,
          lastEvaluatedKey: previousKeyRef.current?.[page - 2],
        };
      }
      return {
        ...prev,
        page: prev.page - 1,
      };
    });
    previousKeyRef.current.pop();
  };

  const handleForword = () => {
    setPage((prev) => prev + 1);
    previousKeyRef.current?.push(lastEvaluatedKey);
    setPaginationModel((prev) => {
      if (Object.hasOwn(paginationModel, "lastEvaluatedKey")) {
        return { ...prev, lastEvaluatedKey };
      }

      return {
        ...prev,
        page: prev.page + 1,
      };
    });
  };

  const handleForwardDisabled = () => {
    if (Object.hasOwn(paginationModel, "lastEvaluatedKey")) {
      return lastEvaluatedKey === null || loading
    }
    if(total) {
      return loading || (paginationModel?.page * paginationModel?.pageSize) >= total
    }
    return loading || rows?.length < paginationModel?.pageSize
  }
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "end"
      }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "10px"
        }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "5px"
          }}>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: "400"
            }}>
            Rows per page:
          </Typography>

          <Box data-testid="select-rows">
            <FormControl sx={styles.selectWrapper}>
              <Select
                value={pageSize}
                onChange={handleChange}
                sx={styles.selectStyles}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={100}>100</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        <Typography sx={{
          fontSize: "14px"
        }}>
          {loading ? <Skeleton variant="text" sx={{fontSize: "14px"}} width={100}  /> : `${calculateRange(page, pageSize,total)} of ${![0, null, undefined].includes(total) ? total : "NA"} `}

        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px"
          }}>
          <IconButton
            disabled={page === 1 || loading}
            onClick={handleBackword}
            data-testid="backward-icon"
          >
            <KeyboardArrowLeft />
          </IconButton>
          <Typography sx={{
            fontSize: "14px"
          }}>Page {page}</Typography>
          <IconButton
            disabled={handleForwardDisabled()}
            onClick={handleForword}
            data-testid="forward-icon"
          >
            <KeyboardArrowRight />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default CustomPagination;
