import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/config';
import { AuthContext } from '../context/AuthContext';
import { User, Mail, Lock, UserPlus, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'student'
    });
    const [error, setError] = useState('');
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await api.post('/auth/register', formData);
            setUser(res.data);
            localStorage.setItem('user', JSON.stringify(res.data));
            navigate(res.data.role === 'student' ? '/student-dashboard' : '/teacher-dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="login-page" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card login-card" 
                style={{ width: '100%', maxWidth: '450px', padding: '2.5rem' }}
            >
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{ background: 'rgba(255,255,255,0.05)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', border: '1px solid var(--glass-border)' }}>
                        <UserPlus size={32} color="var(--primary)" />
                    </div>
                    <h1>Create Account</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Join the Smart Assessment Board</p>
                </div>

                {error && <p style={{ color: 'var(--danger)', textAlign: 'center', marginBottom: '1.5rem', fontSize: '0.9rem', padding: '0.75rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '0.5rem', border: '1px solid var(--danger)' }}>{error}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                        <label>Full Name</label>
                        <div style={{ position: 'relative' }}>
                            <User size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input type="text" name="name" placeholder="John Doe" value={formData.name} onChange={handleChange} required style={{ paddingLeft: '3rem' }} />
                        </div>
                    </div>

                    <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                        <label>Email Address</label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input type="email" name="email" placeholder="john@example.com" value={formData.email} onChange={handleChange} required style={{ paddingLeft: '3rem' }} />
                        </div>
                    </div>


                    <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                        <label>Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input type="password" name="password" placeholder="••••••••" value={formData.password} onChange={handleChange} required style={{ paddingLeft: '3rem' }} />
                        </div>
                    </div>


                    <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                        Create Account <ArrowRight size={18} />
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--text-muted)' }}>
                    Already have an account? <Link to="/" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '600' }}>Sign In</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Register;
