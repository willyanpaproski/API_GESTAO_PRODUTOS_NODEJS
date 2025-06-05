import { Link, useLocation } from "react-router-dom";
import './Sidebar.css';
import { useAuth } from "../../context/AuthContext";

const Sidebar = ({ open, onClose }) => {
    const { pathname } = useLocation();
    const { userName, logout } = useAuth();

    const links = [
        { path: '/dashboard', label: 'Dashboard' },
        { path: '/categorias', label: 'Categorias' },
        { path: '/produtos', label: 'Produtos' },
        { path: '/usuarios', label: 'Usuários' }
    ];

    const handleLogout = () => {
        logout();
        window.location.href = '/login';
    }

    return (
        <div className={`sidebar-container ${open ? 'open' : ''}`}>
            {links.map((link) => (
                <Link
                    key={link.path}
                    to={link.path}
                    className={`sidebar-link ${pathname === link.path ? 'active' : ''}`}
                    onClick={onClose}
                >
                    {link.label}
                </Link>
            ))}
            <div style={{marginTop: '40px'}}>
                <p>{userName}</p>
                <button type="button" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
}

export default Sidebar;
