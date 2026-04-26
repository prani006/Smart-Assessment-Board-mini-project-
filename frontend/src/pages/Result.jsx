import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/config';
import { AuthContext } from '../context/AuthContext';
import { CheckCircle2, XCircle, Award, ArrowLeft, RotateCcw, Home, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

const Result = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResult = async () => {
            try {
                const res = await api.get(`/results/${id}`);
                setResult(res.data);
                setLoading(false);
            } catch (error) {
                console.error('Fetch Result Error:', error);
                setLoading(false);
            }
        };
        if (id) fetchResult();
    }, [id]);

    if (loading) return <div className="container" style={{ textAlign: 'center', padding: '5rem' }}><h2>Analyzing Results...</h2></div>;
    if (!result) return (
        <div className="container" style={{ textAlign: 'center', padding: '5rem' }}>
            <h2>Result not found.</h2>
            <button className="btn btn-primary" onClick={() => navigate('/student-dashboard')} style={{ marginTop: '1rem' }}>Back to Dashboard</button>
        </div>
    );

    return (
        <div className="container" style={{ maxWidth: '900px', paddingBottom: '5rem' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card" style={{ textAlign: 'center', marginBottom: '3rem', padding: '3rem', background: 'rgba(255,255,255,0.03)' }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5rem', marginBottom: '2.5rem' }}>
                    <div style={{ textAlign: 'center' }}>
                        <h2 style={{ fontSize: '3rem', margin: 0, color: 'white', fontWeight: '700' }}>{result.marks}/{result.totalQuestions}</h2>
                        <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.8rem' }}>Score</p>
                    </div>
                    <div style={{ width: '2px', height: '80px', background: 'rgba(255,255,255,0.1)' }} />
                    <div style={{ textAlign: 'center' }}>
                        <h2 style={{ fontSize: '3rem', margin: 0, color: 'var(--accent)', fontWeight: '700' }}>{parseFloat(result.percentage).toFixed(2)}%</h2>
                        <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.8rem' }}>Percentage</p>
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
                    <button className="btn btn-primary" onClick={() => navigate('/student-dashboard')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.8rem 2rem', background: 'var(--primary)' }}>
                        <Home size={18} /> Dashboard
                    </button>
                    <button className="btn btn-outline" onClick={() => navigate('/subject-selection')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.8rem 2rem' }}>
                        <RotateCcw size={18} /> Try Another
                    </button>
                </div>
            </motion.div>

            <h2 style={{ marginBottom: '2rem', fontSize: '2rem', fontWeight: '700' }}>Detailed Review</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {result.answers && result.answers.map((ans, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="glass-card" 
                        style={{ display: 'flex', gap: '2rem', padding: '2rem', alignItems: 'flex-start', background: 'rgba(255,255,255,0.02)' }}
                    >
                        <div style={{ 
                            width: '44px', 
                            height: '44px', 
                            borderRadius: '50%', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            border: `2px solid ${ans.isCorrect ? '#10b981' : '#ef4444'}`,
                            color: ans.isCorrect ? '#10b981' : '#ef4444',
                            flexShrink: 0,
                            marginTop: '0.5rem'
                        }}>
                            {ans.isCorrect ? <CheckCircle2 size={24} /> : <XCircle size={24} />}
                        </div>

                        <div style={{ flex: 1 }}>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.5rem' }}>Question {i + 1}</p>
                            <h3 style={{ marginBottom: '1rem', color: 'white' }}>{ans.questionText || `Question about ${result.subject}`}</h3>
                            
                            <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>
                                <span style={{ fontWeight: '700', color: 'white' }}>Selected: </span>
                                <span style={{ color: ans.isCorrect ? '#10b981' : '#ef4444', fontWeight: '700' }}>
                                    {ans.selectedOption || 'Not Answered'}
                                </span>
                            </p>

                            <div style={{ 
                                background: 'rgba(255, 255, 255, 0.03)', 
                                border: '1px solid rgba(255, 255, 255, 0.05)', 
                                padding: '1.2rem', 
                                borderRadius: '0.8rem'
                            }}>
                                <p style={{ color: '#10b981', fontWeight: '700', fontSize: '0.9rem', marginBottom: '0.4rem' }}>Correct Answer:</p>
                                <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1rem' }}>{ans.correctAnswer}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Result;
