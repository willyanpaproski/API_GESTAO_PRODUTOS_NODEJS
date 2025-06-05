import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography, CircularProgress } from '@mui/material';
import { useNotification } from "../../../context/NotificationContext";
import api from "../../../api";

const CategoriaCadastro = () => {
  const [formData, setFormData] = useState({
    nome: '',
    descricao: ''
  });

  const [errors] = useState({});
  const [loading, setLoading] = useState(false);
  const { addNotification } = useNotification();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await api.post('/categoria', {
        nome: formData.nome,
        descricao: formData.descricao
      });

      addNotification('Categoria cadastrada com sucesso!', 'success');
      navigate('/categorias');
    } catch (error) {
      if (error.status == 422)
      {
        error.response.data.forEach(err => {
          addNotification(err, 'error');    
        });
      } else {
        addNotification('Erro ao cadastrar categoria', 'error');
      }
    } finally {
      setLoading(false);
    }
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
        Cadastrar Nova Categoria
      </Typography>
      
      <TextField
        fullWidth
        label="Nome da Categoria"
        name="nome"
        value={formData.nome}
        onChange={handleChange}
        error={!!errors.nome}
        helperText={errors.nome}
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
        label="Descrição da Categoria"
        name="descricao"
        value={formData.descricao}
        onChange={handleChange}
        error={!!errors.descricao}
        helperText={errors.descricao}
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
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
        <Button
          variant="outlined"
          onClick={() => navigate('/categorias')}
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
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Cadastrar'}
        </Button>
      </Box>
    </Box>
  );
}

export default CategoriaCadastro;