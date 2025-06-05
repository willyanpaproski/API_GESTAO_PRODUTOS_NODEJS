import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../../context/NotificationContext";
import { Button } from "@mui/material";
import api from "../../../api";
import DataTable from "../../../components/DataTable/DataTable";

const CategoriasPage = () => {
  const { addNotification } = useNotification();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0
  });

  const columns = [
    { field: '_id', headerName: 'ID', width: 200 },
    { field: 'nome', headerName: 'Nome', width: 150 },
    { field: 'descricao', headerName: 'Descrição', width: 300 },
    {
      field: 'createdAt',
      headerName: 'Criado em',
      valueFormatter: (value) => new Date(value).toLocaleString('pt-br')
    },
    {
      field: 'updatedAt',
      headerName: 'Atualizado em',
      valueFormatter: (value) => new Date(value).toLocaleString('pt-br')
    }
  ];

  const fetchData = async (page = 1, limit = 10, sortField = '', sortOrder = '') => {
    setLoading(true);
    try {
      const response = await api.get(`/categoria?page=${page}&limit=${limit}&sortField=${sortField}&sortOrder=${sortOrder}`);
      setData(response.data.data);
      setPagination({
        page: response.data.page,
        limit: response.data.limit,
        total: response.data.total
      });
    } catch (error) {
      addNotification('Erro ao buscar categorias', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (categoriaId) => {
    try {
      await api.delete(`/categoria/${categoriaId}`);
      addNotification('Categoria deletada com sucesso', 'success');
      fetchData(pagination.page, pagination.limit);
    } catch (error) {
      addNotification('Erro ao deletar categoria', 'error');
    }
  };

  const handleEdit = (categoriaId) => {
    navigate(`/categorias/atualizar/${categoriaId}`);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePageChange = (newPage) => {
    fetchData(newPage, pagination.limit);
  };

  const handleLimitChange = (newLimit) => {
    fetchData(1, newLimit);
  };

  const handleSortChange = (sortField, sortOrder) => {
    fetchData(pagination.page, pagination.limit, sortField, sortOrder);
  };

  return (
    <div style={{ 
      padding: '20px',
      backgroundColor: '#2c3444',
      minHeight: '100vh',
      color: '#ffffff'
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '20px' 
      }}>
        <h1 style={{ margin: 0 }}>Categorias</h1>
        <Button
          variant="contained"
          onClick={() => navigate('/categorias/cadastrar')}
          sx={{
            backgroundColor: '#6366f1',
            '&:hover': {
              backgroundColor: '#4f46e5'
            }
          }}
        >
          Nova Categoria
        </Button>
      </div>
      
      <DataTable
        data={data}
        columns={columns}
        total={pagination.total}
        page={pagination.page}
        limit={pagination.limit}
        onPageChange={handlePageChange}
        onLimitChange={handleLimitChange}
        onSortChange={handleSortChange}
        onDelete={handleDelete}
        onEdit={handleEdit}
        loading={loading}
      />
    </div>
  );
};

export default CategoriasPage;