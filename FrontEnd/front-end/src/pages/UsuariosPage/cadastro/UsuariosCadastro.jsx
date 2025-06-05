import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography, CircularProgress } from '@mui/material';
import { useNotification } from "../../../context/NotificationContext";
import api from "../../../api";

const UsuarioCadastro = () => {
  const [formData, setFormData] = useState({
    userName: '',
    password: ''
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
      await api.post('/usuario', {
        userName: formData.userName,
        password: formData.password
      });

      addNotification('Usuário cadastrado com sucesso!', 'success');
      navigate('/usuarios');
    } catch (error) {
      if (error.status == 422)
      {
        error.response.data.forEach(err => {
          addNotification(err, 'error');    
        });
      } else {
        addNotification('Erro ao cadastrar usuário', 'error');
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
        Cadastrar Novo Usuário
      </Typography>
      
      <TextField
        fullWidth
        label="Nome de Usuário"
        name="userName"
        value={formData.userName}
        onChange={handleChange}
        error={!!errors.userName}
        helperText={errors.userName}
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
        type="password"
        label="Senha"
        name="password"
        value={formData.password}
        onChange={handleChange}
        error={!!errors.password}
        helperText={errors.password}
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
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
        <Button
          variant="outlined"
          onClick={() => navigate('/usuarios')}
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

export default UsuarioCadastro;