import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Checkbox, TablePagination, TableSortLabel, IconButton,
  Menu, MenuItem, TextField, InputAdornment, Button, Tooltip
} from '@mui/material';
import {
  FilterList, MoreVert, Search, Visibility, VisibilityOff, Delete, Edit
} from '@mui/icons-material';

const darkThemeStyles = {
  paper: {
    backgroundColor: '#2c3444',
    color: '#ffffff',
    width: '100%', 
    overflow: 'hidden'
  },
  tableContainer: {
    maxHeight: '600px',
    backgroundColor: '#2c3444'
  },
  table: {
    backgroundColor: '#2c3444',
    '& .MuiTableRow-root.Mui-selected': {
      backgroundColor: '#3f4b5e',
      '&:hover': {
        backgroundColor: '#4a576b'
      }
    }
  },
  tableHead: {
    backgroundColor: '#1f2937'
  },
  tableCell: {
    color: '#ffffff',
    borderBottom: '1px solid #374151',
    backgroundColor: 'inherit',
  },
  tableHeaderCell: {
    backgroundColor: '#1f2937',
    color: '#ffffff !important',
    borderBottom: '1px solid #374151',
    fontWeight: 'bold',
    fontSize: '0.875rem',
    '& .MuiTableSortLabel-root': {
      color: '#ffffff !important',
      '&:hover': {
        color: '#d1d5db !important'
      },
      '&.Mui-active': {
        color: '#ffffff !important'
      }
    },
    '& .MuiTableSortLabel-icon': {
      color: '#9ca3af !important'
    }
  },
  tableRow: {
    '&:hover': {
      backgroundColor: '#374151 !important'
    }
  },
  selectedRow: {
    backgroundColor: '#3f4b5e !important',
    '&:hover': {
      backgroundColor: '#4a576b !important'
    },
    '& td': {
      backgroundColor: 'inherit !important',
    }
  },
  pagination: {
    color: '#ffffff',
    borderTop: '1px solid #374151',
    backgroundColor: '#2c3444'
  },
  textField: {
    backgroundColor: '#1f2937',
    borderRadius: '4px',
    '& .MuiInputBase-input': {
      color: '#ffffff'
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#4b5563'
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#6b7280'
    }
  },
  menu: {
    backgroundColor: '#1f2937',
    color: '#ffffff'
  },
  menuItem: {
    '&:hover': {
      backgroundColor: '#374151'
    }
  },
  checkbox: {
    color: '#9ca3af',
    '&.Mui-checked': {
      color: '#6366f1'
    }
  },
  iconButton: {
    color: '#9ca3af'
  },
  deleteButton: {
    backgroundColor: '#ef4444',
    '&:hover': {
      backgroundColor: '#dc2626'
    }
  },
  editButton: {
    backgroundColor: '#6366f1',
    '&:hover': {
      backgroundColor: '#4f46e5'
    }
  }
};

const DataTable = ({
  data,
  columns,
  total,
  page,
  limit,
  onPageChange,
  onLimitChange,
  onSortChange,
  onColumnVisibilityChange,
  onDelete,
  onEdit,
  loading
}) => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');
  const [visibleColumns, setVisibleColumns] = useState(
    columns.reduce((acc, col) => ({ ...acc, [col.field]: true }), {})
  );
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    if (searchText) {
      const filtered = data.filter(item =>
        columns.some(col => 
          visibleColumns[col.field] && 
          String(item[col.field]).toLowerCase().includes(searchText.toLowerCase())
        )
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [searchText, data, columns, visibleColumns]);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
    if (onSortChange) {
      onSortChange(property, isAsc ? 'desc' : 'asc');
    }
  };

  const handleColumnMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleColumnMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleColumnVisibility = (field) => {
    const newVisibility = { ...visibleColumns, [field]: !visibleColumns[field] };
    setVisibleColumns(newVisibility);
    if (onColumnVisibilityChange) {
      onColumnVisibilityChange(newVisibility);
    }
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleRowClick = (rowId) => {
    setSelectedRow(selectedRow === rowId ? null : rowId);
  };

  const handleDelete = () => {
    if (selectedRow && onDelete) {
      onDelete(selectedRow);
      setSelectedRow(null);
    }
  };

  const handleEdit = () => {
    if (selectedRow && onEdit) {
      onEdit(selectedRow);
      setSelectedRow(null);
    }
  };

  return (
    <Paper sx={darkThemeStyles.paper}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px' }}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Pesquisar..."
            value={searchText}
            onChange={handleSearchChange}
            sx={darkThemeStyles.textField}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" sx={{ color: '#9ca3af' }}>
                  <Search />
                </InputAdornment>
              ),
            }}
          />
          {selectedRow && (
            <>
              <Tooltip title="Editar registro selecionado">
                <Button
                  variant="contained"
                  startIcon={<Edit />}
                  onClick={handleEdit}
                  sx={darkThemeStyles.editButton}
                >
                  Editar
                </Button>
              </Tooltip>
              <Tooltip title="Deletar registro selecionado">
                <Button
                  variant="contained"
                  startIcon={<Delete />}
                  onClick={handleDelete}
                  sx={darkThemeStyles.deleteButton}
                >
                  Deletar
                </Button>
              </Tooltip>
            </>
          )}
        </div>
        <div>
          <Tooltip title="Filtrar colunas">
            <IconButton onClick={handleColumnMenuOpen} sx={darkThemeStyles.iconButton}>
              <FilterList />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleColumnMenuClose}
            PaperProps={{ sx: darkThemeStyles.menu }}
          >
            <MenuItem disabled sx={darkThemeStyles.menuItem}>
              <span style={{ color: '#9ca3af' }}>Colunas Visíveis</span>
            </MenuItem>
            {columns.map((column) => (
              <MenuItem key={column.field} sx={darkThemeStyles.menuItem}>
                <Checkbox
                  checked={visibleColumns[column.field]}
                  onChange={() => toggleColumnVisibility(column.field)}
                  sx={darkThemeStyles.checkbox}
                />
                <span style={{ color: '#ffffff' }}>{column.headerName}</span>
                <IconButton size="small" sx={{ ml: 1, ...darkThemeStyles.iconButton }}>
                  {visibleColumns[column.field] ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </MenuItem>
            ))}
          </Menu>
        </div>
      </div>

      <TableContainer sx={darkThemeStyles.tableContainer}>
        <Table stickyHeader aria-label="sticky table" sx={darkThemeStyles.table}>
          <TableHead sx={darkThemeStyles.tableHead}>
            <TableRow>
              {columns.map((column) => (
                visibleColumns[column.field] && (
                  <TableCell
                    key={column.field}
                    sortDirection={orderBy === column.field ? order : false}
                    sx={darkThemeStyles.tableHeaderCell}
                  >
                    <TableSortLabel
                      active={orderBy === column.field}
                      direction={orderBy === column.field ? order : 'asc'}
                      onClick={() => handleRequestSort(column.field)}
                    >
                      {column.headerName}
                    </TableSortLabel>
                  </TableCell>
                )
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row) => (
              <TableRow 
                hover 
                key={row._id} 
                onClick={() => handleRowClick(row._id)}
                selected={selectedRow === row._id}
                sx={{
                  ...darkThemeStyles.tableRow,
                  ...(selectedRow === row._id && darkThemeStyles.selectedRow),
                  cursor: 'pointer'
                }}
              >
                {columns.map((column) => (
                  visibleColumns[column.field] && (
                    <TableCell 
                      key={`${row._id}-${column.field}`}
                      sx={darkThemeStyles.tableCell}
                    >
                      {column.valueFormatter 
                        ? column.valueFormatter(row[column.field])
                        : row[column.field]}
                    </TableCell>
                  )
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={total}
        rowsPerPage={limit}
        page={page - 1}
        onPageChange={(e, newPage) => onPageChange(newPage + 1)}
        onRowsPerPageChange={(e) => onLimitChange(parseInt(e.target.value, 10))}
        labelRowsPerPage="Itens por página:"
        sx={darkThemeStyles.pagination}
      />
    </Paper>
  );
};

export default DataTable;