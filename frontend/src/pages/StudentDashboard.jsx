import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Play, ClipboardList, LogOut, Award, Clock, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../api/config';

const StudentDashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [stats, setStats] = useState({ totalTests: 0, avgScore: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await api.get(`/results/student/${user._id}`);
                const total = res.data.length;
                const avg = total > 0 ? (res.data.reduce((acc, curr) => acc + curr.percentage, 0) / total).toFixed(1) : 0;
                setStats({ totalTests: total, avgScore: avg });
            } catch (error) {
                console.error(error);
            }
        };
        if (user) fetchStats();
    }, [user]);

    return (
        <div className="container">
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <h1>Welcome, {user?.name}!</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Roll No: {user?.registerNumber}</p>
                </motion.div>
                <button onClick={logout} className="btn btn-outline" style={{ color: 'var(--danger)' }}>
                    <LogOut size={18} /> Logout
                </button>
            </header>

            <div className="grid grid-cols-3" style={{ marginBottom: '3rem' }}>
                <motion.div whileHover={{ y: -5 }} className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
                    <div style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '1rem', borderRadius: '1rem', display: 'inline-block', marginBottom: '1rem' }}>
                        <ClipboardList color="var(--primary)" />
                    </div>
                    <h3 style={{ margin: 0 }}>{stats.totalTests}</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Tests Taken</p>
                </motion.div>
                <motion.div whileHover={{ y: -5 }} className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
                    <div style={{ background: 'rgba(236, 72, 153, 0.1)', padding: '1rem', borderRadius: '1rem', display: 'inline-block', marginBottom: '1rem' }}>
                        <Award color="var(--secondary)" />
                    </div>
                    <h3 style={{ margin: 0 }}>{stats.avgScore}%</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Average Score</p>
                </motion.div>
                <motion.div whileHover={{ y: -5 }} className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
                    <div style={{ background: 'rgba(34, 211, 238, 0.1)', padding: '1rem', borderRadius: '1rem', display: 'inline-block', marginBottom: '1rem' }}>
                        <Clock color="var(--accent)" />
                    </div>
                    <h3 style={{ margin: 0 }}>10m</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Time Per Test</p>
                </motion.div>
            </div>

            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="glass-card" 
                    style={{ flex: 1, minWidth: '300px', cursor: 'pointer', border: '1px solid var(--primary)' }}
                    onClick={() => navigate('/subject-selection')}
                >
                    <BookOpen size={32} color="var(--primary)" style={{ marginBottom: '1rem' }} />
                    <h2>Start Assessment</h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Challenge yourself with Aptitude, Programming, or IoT quizzes.</p>
                    <button className="btn btn-primary">Go to Subjects <Play size={16} /></button>
                </motion.div>

                <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="glass-card" 
                    style={{ flex: 1, minWidth: '300px', cursor: 'pointer' }}
                    onClick={() => navigate('/student-results')}
                >
                    <Award size={32} color="var(--secondary)" style={{ marginBottom: '1rem' }} />
                    <h2>View My Results</h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Check your performance history and detailed evaluation reports.</p>
                    <button className="btn btn-outline">Performance History</button>
                </motion.div>
            </div>
        </div>
    );
};

export default StudentDashboard;
