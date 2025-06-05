import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../../context/NotificationContext";
import { Button } from "@mui/material";
import DataTable from "../../../components/DataTable/DataTable";
import api from "../../../api";

const ProdutosPage = () => {
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
    { field: 'quantidade', headerName: 'Quantidade', width: 100 },
    { 
      field: 'preco', 
      headerName: 'Preço', 
      width: 100,
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
      valueFormatter: (value) => new Date(value).toLocaleString('pt-br')
    },
    {
      field: 'updatedAt',
      headerName: 'Atualizado em',
      valueFormatter: (value) => new Date(value).toLocaleString('pt-br')
    }
  ];

  const fetchData = async (page = 1, limit = 10, sortField = 'createdAt', sortOrder = 'desc') => {
    setLoading(true);
    try {
      const response = await api.get(`/produto?page=${page}&limit=${limit}&sortField=${sortField}&sortOrder=${sortOrder}`);
      setData(response.data.data);
      setPagination({
        page: response.data.page,
        limit: response.data.limit,
        total: response.data.total
      });
    } catch (error) {
      addNotification('Erro ao buscar produtos', 'error');
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (produtoId) => {
    try {
      await api.delete(`/produto/${produtoId}`);
      addNotification('Produto deletado com sucesso', 'success');
      fetchData(pagination.page, pagination.limit);
    } catch (error) {
      addNotification('Erro ao deletar produto', 'error');
    }
  }

  const handleEdit = (produtoId) => {
    navigate(`/produtos/atualizar/${produtoId}`);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePageChange = (newPage) => {
    fetchData(newPage, pagination.limit);
  }

  const handleLimitChange = (newLimit) => {
    fetchData(1, newLimit);
  }

  const handleSortChange = (sortField, sortOrder) => {
    fetchData(pagination.page, pagination.limit, sortField, sortOrder);
  }

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
        <h1 style={{ margin: 0 }}>Produtos</h1>
        <Button
          variant="contained"
          onClick={() => navigate('/produtos/cadastrar')}
          sx={{
            backgroundColor: '#6366f1',
            '&:hover': {
              backgroundColor: '#4f46e5'
            }
          }}
        >
          Novo Produto
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
}

export default ProdutosPage;