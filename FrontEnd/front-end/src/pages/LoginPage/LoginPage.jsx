import { useState } from "react";
import api from '../../api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './LoginPage.module.css';
import { useNotification } from "../../context/NotificationContext";

export default function LoginPage() {
    const [form, setForm] = useState({ userName: '', password: '' });
    const navigate = useNavigate();
    const { login } = useAuth();
    const { addNotification } = useNotification();

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/auth/login', form);
            login(res.data.token, res.data.userName);
            navigate('/dashboard');
        } catch (error) {
            if (error.status == 401) {
                addNotification('Credenciais inválidas!', 'error');
            }
            error.response.data.forEach(err => {
                addNotification(err, 'error');
            });
        }
    }

    return (
        <div className={styles.container}>
            <form className={styles.card} onSubmit={handleSubmit}>
                <h2 className={styles.title}>Login</h2>
                <div className={styles.inputGroup}>
                    <input
                        className={styles.input}
                        name="userName"
                        placeholder="Username"
                        onChange={handleChange}
                    />
                    <input
                        className={styles.input}
                        name="password"
                        type="password"
                        placeholder="Senha"
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className={styles.button}>Entrar</button><br />
                <a href="/register">Registrar-se</a>
            </form>
        </div>
    );
}