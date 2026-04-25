import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, Mail, ShieldCheck, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, loading } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await login(email, password);
        if (result.success) {
            navigate(result.role === 'teacher' ? '/teacher-dashboard' : '/student-dashboard');
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="login-page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card login-card" 
                style={{ width: '100%', maxWidth: '400px', padding: '2.5rem' }}
            >
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{ display: 'inline-flex', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '50%', marginBottom: '1rem', border: '1px solid var(--glass-border)' }}>
                        <ShieldCheck size={40} color="var(--primary)" />
                    </div>
                    <h2 style={{ marginBottom: '0.5rem' }}>Smart Assessment Board</h2>
                    <p style={{ color: 'var(--text-muted)' }}>Welcome back! Please sign in.</p>
                </div>

                {error && <div style={{ color: 'var(--danger)', marginBottom: '1.5rem', textAlign: 'center', fontSize: '0.9rem', padding: '0.75rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '0.5rem', border: '1px solid var(--danger)' }}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Email Address</label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input 
                                type="email" 
                                placeholder="Enter your email" 
                                style={{ paddingLeft: '3rem' }}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group" style={{ marginBottom: '2rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Password</label>
                        <div style={{ position: 'relative' }}>
                            <LogIn size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input 
                                type="password" 
                                placeholder="••••••••" 
                                style={{ paddingLeft: '3rem' }}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }} disabled={loading}>
                        {loading ? 'Authenticating...' : (
                            <>Sign In <ArrowRight size={18} /></>
                        )}
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    Don't have an account? <Link to="/register" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '600' }}>Create one</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Login;
