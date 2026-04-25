import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/config';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { ArrowLeft, TrendingUp, Calendar, BookOpen, ChevronRight } from 'lucide-react';

const StudentResults = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const res = await api.get(`/results/student/${user._id}`);
                // Sort by date descending
                setResults(res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        if (user) fetchResults();
    }, [user]);

    const getScoreColor = (percentage) => {
        if (percentage >= 80) return 'var(--success)';
        if (percentage >= 50) return 'var(--accent)';
        return 'var(--danger)';
    };

    if (loading) return <div className="container" style={{ textAlign: 'center' }}><h2>Loading history...</h2></div>;

    return (
        <div className="container" style={{ maxWidth: '900px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '3rem' }}>
                <button onClick={() => navigate('/student-dashboard')} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ArrowLeft size={18} /> Back to Dashboard
                </button>
                <div style={{ textAlign: 'right' }}>
                    <h1 style={{ marginBottom: '0.25rem' }}>Performance History</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Track your progress over time</p>
                </div>
            </div>

            {results.length === 0 ? (
                <div className="glass-card" style={{ textAlign: 'center', padding: '4rem' }}>
                    <TrendingUp size={48} style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }} />
                    <h2>No assessments taken yet</h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Start your first assessment to see your performance here.</p>
                    <button className="btn btn-primary" onClick={() => navigate('/subject-selection')}>Start Assessment</button>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {results.map((result, index) => (
                        <motion.div
                            key={result._id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-card"
                            style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'space-between',
                                cursor: 'pointer',
                                transition: 'transform 0.2s',
                                borderLeft: `4px solid ${getScoreColor(result.percentage)}`
                            }}
                            onClick={() => navigate(`/result/${result._id}`)}
                            whileHover={{ scale: 1.02, background: 'rgba(255, 255, 255, 0.08)' }}
                        >
                            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                                <div style={{ 
                                    width: '60px', 
                                    height: '60px', 
                                    borderRadius: '50%', 
                                    background: 'rgba(255,255,255,0.05)', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center',
                                    color: getScoreColor(result.percentage),
                                    fontSize: '1.2rem',
                                    fontWeight: '700',
                                    border: `2px solid ${getScoreColor(result.percentage)}44`
                                }}>
                                    {Math.round(result.percentage)}%
                                </div>
                                <div>
                                    <h3 style={{ marginBottom: '0.25rem' }}>{result.subject}</h3>
                                    <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                            <Calendar size={14} /> {new Date(result.createdAt).toLocaleDateString()}
                                        </span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                            <BookOpen size={14} /> {result.marks}/{result.totalQuestions} Marks
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <ChevronRight size={20} style={{ color: 'var(--text-muted)' }} />
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default StudentResults;
