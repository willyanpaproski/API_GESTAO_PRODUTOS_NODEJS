import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import { useNotification } from '../../context/NotificationContext';
import { 
  Box, 
  Typography, 
  CircularProgress,
  Card,
  CardContent,
  Grid
} from '@mui/material';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DashboardPage = () => {
  const [topProductsData, setTopProductsData] = useState(null);
  const [categoriesData, setCategoriesData] = useState({
    labels: [],
    datasets: [],
    categoryIds: []
  });
  const [loading, setLoading] = useState({
    products: true,
    categories: true
  });
  const { addNotification } = useNotification();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsResponse = await api.get('/produto/maiorquantidade');
        const products = productsResponse.data.data;

        const productLabels = products.map(product => product.nome);
        const productQuantities = products.map(product => product.quantidade);

        setTopProductsData({
          labels: productLabels,
          datasets: [
            {
              label: 'Quantidade',
              data: productQuantities,
              backgroundColor: 'rgba(99, 102, 241, 0.7)',
              borderColor: 'rgba(99, 102, 241, 1)',
              borderWidth: 1,
            },
          ],
        });
        setLoading(prev => ({ ...prev, products: false }));

        const categoriesResponse = await api.get('/categoria/quantidadeProdutos');
        const categories = categoriesResponse.data;

        const categoryLabels = categories.map(cat => `${cat.nome} (${cat.quantidadeProdutos})`);
        const categoryCounts = categories.map(cat => cat.quantidadeProdutos);
        const categoryIds = categories.map(cat => cat._id);

        setCategoriesData({
          labels: categoryLabels,
          datasets: [
            {
              label: 'Quantidade de Produtos',
              data: categoryCounts,
              backgroundColor: categories.map((_, index) => 
                `hsl(${(index * 360) / categories.length}, 70%, 50%)`
              ),
              borderColor: categories.map((_, index) => 
                `hsl(${(index * 360) / categories.length}, 70%, 40%)`
              ),
              borderWidth: 1,
            },
          ],
          categoryIds: categoryIds
        });
        setLoading(prev => ({ ...prev, categories: false }));

      } catch (error) {
        addNotification('Erro ao carregar dados do dashboard', 'error');
        console.error('Erro ao buscar dados:', error);
        setLoading({ products: false, categories: false });
      }
    };

    fetchData();
  }, [addNotification]);

  const productsChartOptions = {
    indexAxis: 'x',
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Produtos com maior quantidade em estoque',
        color: '#e5e7eb',
        font: {
          size: 14
        }
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function(context) {
            return `Quantidade: ${context.raw}`;
          }
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#e5e7eb',
          font: {
            size: 12
          }
        },
        grid: {
          display: false
        }
      },
      y: {
        ticks: {
          color: '#e5e7eb',
          font: {
            size: 10
          },
          precision: 0
        },
        grid: {
          color: 'rgba(229, 231, 235, 0.1)'
        }
      }
    },
    maintainAspectRatio: false,
    animation: {
      duration: 1000
    }
  };

  const handleCategoryClick = (event, elements, chart) => {
    if (elements.length > 0) {
      const clickedElementIndex = elements[0].index;
      const categoryId = categoriesData.categoryIds[clickedElementIndex];
      if (categoryId) {
        navigate(`/produtos/categoria/${categoryId}`);
      }
    }
  };

  const categoriesChartOptions = {
    indexAxis: 'y',
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Produtos por Categoria',
        color: '#e5e7eb',
        font: {
          size: 14
        }
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function(context) {
            return `Quantidade: ${context.raw}`;
          },
          afterLabel: function(context) {
            return 'Clique para ver os produtos';
          }
        }
      }
    },
    onClick: handleCategoryClick,
    scales: {
      x: {
        ticks: {
          color: '#e5e7eb',
          font: {
            size: 12
          },
          precision: 0,
          stepSize: 1
        },
        grid: {
          color: 'rgba(229, 231, 235, 0.1)'
        }
      },
      y: {
        ticks: {
          color: '#e5e7eb',
          font: {
            size: 12
          }
        },
        grid: {
          display: false
        }
      }
    },
    maintainAspectRatio: false,
    animation: {
      duration: 1000
    }
  };

  return (
    <div style={{ 
      padding: '20px',
      backgroundColor: '#2c3444',
      minHeight: '100vh',
      color: '#ffffff'
    }}>
      <Typography variant="h4" gutterBottom sx={{ marginBottom: '20px', color: 'white' }}>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={6}>
          <Card sx={{ 
            backgroundColor: '#374151',
            color: 'white',
            height: '100%'
          }}>
            <CardContent>
              {loading.products ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
                  <CircularProgress />
                </Box>
              ) : topProductsData ? (
                <Box sx={{ height: '400px' }}>
                  <Bar 
                    data={topProductsData} 
                    options={productsChartOptions} 
                  />
                </Box>
              ) : (
                <Typography variant="body2">
                  Não foi possível carregar os dados dos produtos.
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={6}>
          <Card sx={{ 
            backgroundColor: '#374151',
            color: 'white',
            height: '100%'
          }}>
            <CardContent>
              {loading.categories ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
                  <CircularProgress />
                </Box>
              ) : categoriesData.labels.length > 0 ? (
                <Box sx={{ height: '400px' }}>
                  <Bar 
                    data={{
                      labels: categoriesData.labels,
                      datasets: categoriesData.datasets
                    }} 
                    options={categoriesChartOptions} 
                  />
                </Box>
              ) : (
                <Typography variant="body2">
                  Nenhuma categoria encontrada
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default DashboardPage;