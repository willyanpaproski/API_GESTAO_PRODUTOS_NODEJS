import { useState } from "react";
import api from '../../api';
import { useNavigate } from 'react-router-dom';
import styles from './RegisterPage.module.css';
import { useAuth } from "../../context/AuthContext";
import { useNotification } from "../../context/NotificationContext";

export default function RegisterPage() {
    const [form, setForm] = useState({ userName: '', password: '' });
    const navigate = useNavigate();
    const { login } = useAuth();
    const { addNotification } = useNotification();

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/usuario', form)
            .then(async () => {
                const res = await api.post('/auth/login', form);
                login(res.data.token);
                navigate('/dashboard');
            })
            .catch((err) => {
                err.response.data.forEach(error => {
                    addNotification(error, 'error');
                });
            });
        } catch (error) {
            alert('Erro ao registrar: ' + error.response?.data?.[0] || 'Erro desconhecido');
        }
    }

    return(
        <div className={styles.container}>
            <form className={styles.card} onSubmit={handleSubmit}>
                <h2 className={styles.title}>Registro</h2>
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
                <button type="submit" className={styles.button}>Registrar</button><br />
                <a href="/login">Já é usuário? Realize login</a>
            </form>
        </div>
    );
}