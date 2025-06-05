import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Button,
  Card,
  CardContent
} from '@mui/material';
import { useNotification } from '../../../context/NotificationContext';
import DataTable from '../../../components/DataTable/DataTable';
import api from '../../../api';

const ProdutosPorCategoria = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [categoria, setCategoria] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0
  });
  const [sortConfig, setSortConfig] = useState({
    field: 'createdAt',
    order: 'desc'
  });
  const { addNotification } = useNotification();

  const columns = [
    { field: '_id', headerName: 'ID', width: 200 },
    { field: 'nome', headerName: 'Nome', width: 150, sortable: true },
    { field: 'descricao', headerName: 'Descrição', width: 300 },
    { field: 'quantidade', headerName: 'Quantidade', width: 100, sortable: true },
    { 
      field: 'preco', 
      headerName: 'Preço', 
      width: 100,
      sortable: true,
      valueFormatter: (value) => {
        if (value && value.$numberDecimal) {
          return `R$ ${parseFloat(value.$numberDecimal).toFixed(2)}`
        }
        return 'R$ 0,00';
      }
    },
    {
      field: 'createdAt',
      headerName: 'Criado em',
      sortable: true,
      valueFormatter: (value) => new Date(value).toLocaleString('pt-br')
    },
    {
      field: 'updatedAt',
      headerName: 'Atualizado em',
      sortable: true,
      valueFormatter: (value) => new Date(value).toLocaleString('pt-br')
    }
  ];

  const fetchData = async (page = 1, limit = 10, sortField = 'createdAt', sortOrder = 'desc') => {
    setLoading(true);
    try {
      const response = await api.get(
        `/produto/categoria/${id}?page=${page}&limit=${limit}&sortField=${sortField}&sortOrder=${sortOrder}`
      );
      
      setData(response.data.data);
      setPagination({
        page: response.data.page,
        limit: response.data.limit,
        total: response.data.total
      });

      if (!categoria) {
        const categoriaResponse = await api.get(`/categoria/${id}`);
        setCategoria(categoriaResponse.data);
      }
    } catch (error) {
      addNotification('Erro ao carregar produtos da categoria', 'error');
      console.error('Erro:', error);
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (produtoId) => {
    try {
      await api.delete(`/produto/${produtoId}`);
      addNotification('Produto deletado com sucesso', 'success');
      fetchData(pagination.page, pagination.limit, sortConfig.field, sortConfig.order);
    } catch (error) {
      addNotification('Erro ao deletar produto', 'error');
    }
  };

  const handleEdit = (produtoId) => {
    navigate(`/produtos/atualizar/${produtoId}`);
  };

  const handlePageChange = (newPage) => {
    fetchData(newPage, pagination.limit, sortConfig.field, sortConfig.order);
  };

  const handleLimitChange = (newLimit) => {
    fetchData(1, newLimit, sortConfig.field, sortConfig.order);
  };

  const handleSortChange = (sortField, sortOrder) => {
    setSortConfig({ field: sortField, order: sortOrder });
    fetchData(pagination.page, pagination.limit, sortField, sortOrder);
  };

  useEffect(() => {
    fetchData(pagination.page, pagination.limit, sortConfig.field, sortConfig.order);
  }, [id]);

  return (
    <div style={{ 
      padding: '20px',
      backgroundColor: '#2c3444',
      minHeight: '100vh',
      color: '#ffffff'
    }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '20px' 
      }}>
        <Typography variant="h4">
          Produtos da Categoria: {categoria?.nome || 'Carregando...'}
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/dashboard')}
          sx={{
            backgroundColor: '#6366f1',
            '&:hover': {
              backgroundColor: '#4f46e5'
            }
          }}
        >
          Voltar para Dashboard
        </Button>
      </Box>

      <Card sx={{ backgroundColor: '#374151' }}>
        <CardContent>
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
            initialSort={sortConfig}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ProdutosPorCategoria;