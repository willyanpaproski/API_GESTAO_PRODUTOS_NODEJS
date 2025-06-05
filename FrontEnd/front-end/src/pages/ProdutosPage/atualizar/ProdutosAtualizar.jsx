import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
  TextField, 
  Button, 
  Box, 
  Typography, 
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  OutlinedInput,
  Checkbox,
  ListItemText
} from '@mui/material';
import { useNotification } from "../../../context/NotificationContext";
import api from "../../../api";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const ProdutoEdicao = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    quantidade: 0,
    preco: 0,
    categorias: []
  });

  const [categoriasDisponiveis, setCategoriasDisponiveis] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const { addNotification } = useNotification();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriasResponse = await api.get('/categoria');
        setCategoriasDisponiveis(categoriasResponse.data.data);

        const produtoResponse = await api.get(`/produto/${id}`);
        const produtoData = produtoResponse.data;
        
        const preco = produtoData.preco?.$numberDecimal 
          ? parseFloat(produtoData.preco.$numberDecimal) 
          : produtoData.preco;
        
        setFormData({
          nome: produtoData.nome,
          descricao: produtoData.descricao,
          quantidade: produtoData.quantidade,
          preco: preco,
          categorias: produtoData.categorias || []
        });
      } catch (error) {
        addNotification('Erro ao carregar dados', 'error');
        navigate('/produtos');
      } finally {
        setFetching(false);
      }
    };

    fetchData();
  }, [id, addNotification, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCategoriasChange = (event) => {
    const { value } = event.target;
    setFormData(prev => ({
      ...prev,
      categorias: typeof value === 'string' ? value.split(',') : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const payload = {
        ...formData,
        quantidade: Number(formData.quantidade),
        preco: Number(formData.preco)
      };

      await api.put(`/produto/${id}`, payload);

      addNotification('Produto atualizado com sucesso!', 'success');
      navigate('/produtos');
    } catch (error) {
      if (error.response?.status === 422) {
        error.response.data.forEach(err => {
          addNotification(err, 'error');    
        });
      } else {
        addNotification('Erro ao atualizar produto', 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: '500px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#2c3444',
        borderRadius: '8px',
        color: 'white'
      }}
    >
      <Typography variant="h5" gutterBottom sx={{ marginBottom: '20px', color: 'white' }}>
        Editar Produto
      </Typography>
      
      <TextField
        fullWidth
        label="Nome do Produto"
        name="nome"
        value={formData.nome}
        onChange={handleChange}
        margin="normal"
        sx={{
          '& .MuiInputBase-input': { color: 'white' },
          '& .MuiInputLabel-root': { color: '#9ca3af' },
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: '#4b5563' },
            '&:hover fieldset': { borderColor: '#6b7280' }
          }
        }}
      />
      
      <TextField
        fullWidth
        label="Descrição do Produto"
        name="descricao"
        value={formData.descricao}
        onChange={handleChange}
        margin="normal"
        multiline
        rows={4}
        sx={{
          '& .MuiInputBase-input': { color: 'white' },
          '& .MuiInputLabel-root': { color: '#9ca3af' },
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: '#4b5563' },
            '&:hover fieldset': { borderColor: '#6b7280' }
          }
        }}
      />
      
      <TextField
        fullWidth
        label="Quantidade"
        name="quantidade"
        type="number"
        value={formData.quantidade}
        onChange={handleChange}
        margin="normal"
        inputProps={{ min: 0 }}
        sx={{
          '& .MuiInputBase-input': { color: 'white' },
          '& .MuiInputLabel-root': { color: '#9ca3af' },
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: '#4b5563' },
            '&:hover fieldset': { borderColor: '#6b7280' }
          }
        }}
      />
      
      <TextField
        fullWidth
        label="Preço"
        name="preco"
        type="number"
        value={formData.preco}
        onChange={handleChange}
        margin="normal"
        inputProps={{ step: "0.01", min: 0 }}
        sx={{
          '& .MuiInputBase-input': { color: 'white' },
          '& .MuiInputLabel-root': { color: '#9ca3af' },
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: '#4b5563' },
            '&:hover fieldset': { borderColor: '#6b7280' }
          }
        }}
      />
      
      <FormControl fullWidth margin="normal" sx={{
        '& .MuiInputLabel-root': { color: '#9ca3af' },
        '& .MuiOutlinedInput-root': {
          '& fieldset': { borderColor: '#4b5563' },
          '&:hover fieldset': { borderColor: '#6b7280' }
        }
      }}>
        <InputLabel id="categorias-label">Categorias</InputLabel>
        <Select
          labelId="categorias-label"
          id="categorias-select"
          multiple
          value={formData.categorias}
          onChange={handleCategoriasChange}
          input={<OutlinedInput label="Categorias" sx={{ color: 'white' }} />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => {
                const categoria = categoriasDisponiveis.find(cat => cat._id === value);
                return (
                  <Chip 
                    key={value} 
                    label={categoria?.nome || value} 
                    sx={{ 
                      backgroundColor: '#4b5563',
                      color: 'white'
                    }} 
                  />
                );
              })}
            </Box>
          )}
          MenuProps={{
            ...MenuProps,
            PaperProps: {
              ...MenuProps.PaperProps,
              sx: {
                backgroundColor: '#2c3444',
                color: 'white',
                '& .MuiMenuItem-root': {
                  '&:hover': {
                    backgroundColor: '#374151'
                  }
                }
              }
            }
          }}
        >
          {categoriasDisponiveis.map((categoria) => (
            <MenuItem 
              key={categoria._id} 
              value={categoria._id}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: '#374151'
                },
                '&.Mui-selected:hover': {
                  backgroundColor: '#4b5563'
                }
              }}
            >
              <Checkbox 
                checked={formData.categorias.includes(categoria._id)} 
                sx={{
                  color: '#9ca3af',
                  '&.Mui-checked': {
                    color: '#6366f1'
                  }
                }}
              />
              <ListItemText 
                primary={categoria.nome} 
                primaryTypographyProps={{ color: 'white' }} 
              />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
        <Button
          variant="outlined"
          onClick={() => navigate('/produtos')}
          sx={{ marginRight: '10px', color: '#9ca3af', borderColor: '#4b5563' }}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          sx={{ backgroundColor: '#6366f1', '&:hover': { backgroundColor: '#4f46e5' } }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Atualizar'}
        </Button>
      </Box>
    </Box>
  );
}

export default ProdutoEdicao;