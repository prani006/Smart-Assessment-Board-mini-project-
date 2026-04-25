import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/config';
import { AuthContext } from '../context/AuthContext';
import { CheckCircle2, XCircle, Award, ArrowLeft, RotateCcw, Share2 } from 'lucide-react';
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
                const res = await api.get(`/results/student/${user._id}`);
                const found = res.data.find(r => r._id === id || r.id === parseInt(id));
                setResult(found);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        if (user) fetchResult();
    }, [id, user]);

    if (loading) return <div className="container" style={{ textAlign: 'center' }}><h2>Analyzing Results...</h2></div>;
    if (!result) return <div className="container" style={{ textAlign: 'center' }}><h2>Result not found.</h2></div>;

    return (
        <div className="container" style={{ maxWidth: '800px' }}>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass-card" style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Award size={64} color="var(--secondary)" style={{ marginBottom: '1.5rem' }} />
                <h1>Assessment Completed!</h1>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>{result.subject}</p>
                
                <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', marginBottom: '2rem' }}>
                    <div>
                        <h2 style={{ margin: 0, color: 'var(--primary)', webkitTextFillColor: 'initial' }}>{result.marks} / {result.totalQuestions}</h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Score</p>
                    </div>
                    <div style={{ width: '1px', background: 'var(--glass-border)' }} />
                    <div>
                        <h2 style={{ margin: 0, color: 'var(--accent)', webkitTextFillColor: 'initial' }}>{result.percentage}%</h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Percentage</p>
                    </div>
                </div>

                <div className="btn-group" style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <button className="btn btn-primary" onClick={() => navigate('/student-dashboard')}>
                        <Home size={18} /> Dashboard
                    </button>
                    <button className="btn btn-outline" onClick={() => navigate('/subject-selection')}>
                        <RefreshCw size={18} /> Try Another
                    </button>
                </div>
            </motion.div>

            <h2 style={{ marginBottom: '1.5rem' }}>Detailed Review</h2>
            <div className="grid" style={{ gap: '1rem' }}>
                {result.answers.map((ans, i) => (
                    <div key={i} className="glass-card" style={{ padding: '1.5rem', display: 'flex', gap: '1.5rem', alignItems: 'flex-start', borderLeft: `4px solid ${ans.isCorrect ? 'var(--success)' : 'var(--danger)'}` }}>
                        <div style={{ marginTop: '0.25rem' }}>
                            {ans.isCorrect ? <CheckCircle color="var(--success)" size={24} /> : <XCircle color="var(--danger)" size={24} />}
                        </div>
                        <div style={{ flex: 1 }}>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.5rem', fontWeight: '600', textTransform: 'uppercase' }}>Question {i + 1}</p>
                            
                            <div style={{ marginBottom: '1rem' }}>
                                <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>Your Answer:</p>
                                <div style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem', background: ans.isCorrect ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)', border: `1px solid ${ans.isCorrect ? 'var(--success)' : 'var(--danger)'}`, display: 'inline-block' }}>
                                    <span style={{ fontWeight: '600' }}>{ans.selectedOption || 'Not Answered'}</span>
                                </div>
                            </div>

                            {!ans.isCorrect && (
                                <div>
                                    <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>Correct Answer:</p>
                                    <div style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem', background: 'rgba(34, 211, 238, 0.1)', border: '1px solid var(--accent)', display: 'inline-block' }}>
                                        <span style={{ fontWeight: '600', color: 'var(--accent)' }}>{ans.correctAnswer}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Result;
