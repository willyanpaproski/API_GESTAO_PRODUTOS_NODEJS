import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import HomeRedirect from './components/HomeRedirect';
import './App.css';
import { NotificationProvider } from './context/NotificationContext';
import DashboardLayout from './layouts/DashboardLayout';

//Paginas
import CategoriasListagemPage from './pages/CategoriasPage/listagem/CategoriasListagemPage';
import CategoriasCadastroPage from './pages/CategoriasPage/cadastro/CategoriasCadastroPage';
import CategoriasAtualizarPage from './pages/CategoriasPage/atualizar/CategoriasAtualizar';
import UsuariosListagemPage from './pages/UsuariosPage/listagem/UsuariosListagem';
import UsuarioCadastroPage from './pages/UsuariosPage/cadastro/UsuariosCadastro';
import UsuariosAtualizarPage from './pages/UsuariosPage/atualizar/UsuariosAtualizar';
import ProdutosListagemPage from './pages/ProdutosPage/listagem/ProdutosListagem';
import ProdutosPorCategoriaListagemPage from './pages/ProdutosPage/listagem/ProdutosPorCategoriaListagem';
import ProdutosCadastroPage from './pages/ProdutosPage/cadastro/ProdutosCadastrar';
import ProdutosAtualizarPage from './pages/ProdutosPage/atualizar/ProdutosAtualizar';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';

function App() {

  return (
    <AuthProvider>
      <NotificationProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomeRedirect />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <DashboardPage />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route 
              path='/categorias'
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <CategoriasListagemPage />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route 
              path='/categorias/cadastrar'
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <CategoriasCadastroPage />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route 
              path='/categorias/atualizar/:id'
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <CategoriasAtualizarPage />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route 
              path='/usuarios'
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <UsuariosListagemPage />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route 
              path='/usuarios/cadastrar'
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <UsuarioCadastroPage />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route 
              path='/usuarios/atualizar/:id'
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <UsuariosAtualizarPage />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route 
              path='/produtos'
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <ProdutosListagemPage />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route 
              path='/produtos/categoria/:id'
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <ProdutosPorCategoriaListagemPage />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route 
              path='/produtos/cadastrar'
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <ProdutosCadastroPage />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route 
              path='/produtos/atualizar/:id'
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <ProdutosAtualizarPage />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
