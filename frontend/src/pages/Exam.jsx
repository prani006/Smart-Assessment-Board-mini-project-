import { useState, useEffect, useContext } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '../api/config';
import { AuthContext } from '../context/AuthContext';
import { Clock, ChevronRight, ChevronLeft, Send, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Exam = () => {
    const [searchParams] = useSearchParams();
    const subject = searchParams.get('subject');
    const category = searchParams.get('category');
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const res = await api.get(`/questions?subject=${subject}${category ? `&category=${category}` : ''}`);
                setQuestions(res.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        fetchQuestions();
    }, [subject, category, user]);

    useEffect(() => {
        if (timeLeft === 0) {
            handleSubmit();
            return;
        }
        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleOptionSelect = (option) => {
        setSelectedAnswers({ ...selectedAnswers, [questions[currentIndex]._id]: option });
    };

    const handleSubmit = async () => {
        if (submitting) return;
        setSubmitting(true);
        try {
            const answers = questions.map(q => ({
                questionId: q._id,
                selectedOption: selectedAnswers[q._id] || ''
            }));
            const res = await api.post('/results/submit', {
                studentId: user.id || user._id,
                subject: category ? `${subject} - ${category}` : subject,
                answers
            });
            navigate(`/result/${res.data._id}`);
        } catch (error) {
            console.error(error);
            setSubmitting(false);
        }
    };

    if (loading) return <div className="container" style={{ textAlign: 'center' }}><h2>Loading Questions...</h2></div>;
    if (questions.length === 0) return <div className="container" style={{ textAlign: 'center' }}><h2>No questions found for this category.</h2></div>;

    const currentQuestion = questions[currentIndex];
    const progress = ((currentIndex + 1) / questions.length) * 100;

    return (
        <div className="container" style={{ maxWidth: '900px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h2 style={{ margin: 0 }}>{subject} Assessment</h2>
                    {category && <p style={{ color: 'var(--text-muted)' }}>{category}</p>}
                </div>
                <div className="glass-card" style={{ padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', borderColor: timeLeft < 60 ? 'var(--danger)' : 'var(--glass-border)' }}>
                    <Clock color={timeLeft < 60 ? 'var(--danger)' : 'var(--accent)'} />
                    <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: timeLeft < 60 ? 'var(--danger)' : 'var(--text-main)' }}>{formatTime(timeLeft)}</span>
                </div>
            </div>

            <div style={{ height: '6px', background: 'var(--glass)', borderRadius: '3px', marginBottom: '2rem', overflow: 'hidden' }}>
                <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} style={{ height: '100%', background: 'linear-gradient(to right, var(--primary), var(--secondary))' }} />
            </div>

            <AnimatePresence mode="wait">
                <motion.div 
                    key={currentIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="glass-card" 
                    style={{ minHeight: '400px' }}
                >
                    <div style={{ marginBottom: '2rem' }}>
                        <span style={{ color: 'var(--primary)', fontWeight: '600' }}>Question {currentIndex + 1} of {questions.length}</span>
                        <h2 style={{ marginTop: '1rem', background: 'none', webkitTextFillColor: 'initial', color: 'white' }}>{currentQuestion.questionText}</h2>
                    </div>

                    <div className="grid" style={{ gap: '1rem' }}>
                        {currentQuestion.options.map((opt, i) => (
                            <motion.div 
                                whileHover={{ scale: 1.01 }}
                                key={i} 
                                className="glass-card" 
                                style={{ 
                                    padding: '1rem 1.5rem', 
                                    cursor: 'pointer', 
                                    borderColor: selectedAnswers[currentQuestion._id] === opt ? 'var(--primary)' : 'var(--glass-border)',
                                    background: selectedAnswers[currentQuestion._id] === opt ? 'rgba(99, 102, 241, 0.1)' : 'var(--bg-card)'
                                }}
                                onClick={() => handleOptionSelect(opt)}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{ 
                                        width: '24px', 
                                        height: '24px', 
                                        borderRadius: '50%', 
                                        border: '2px solid', 
                                        borderColor: selectedAnswers[currentQuestion._id] === opt ? 'var(--primary)' : 'var(--text-muted)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        {selectedAnswers[currentQuestion._id] === opt && <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--primary)' }} />}
                                    </div>
                                    {opt}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </AnimatePresence>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                <button 
                    className="btn btn-outline" 
                    onClick={() => setCurrentIndex(prev => prev - 1)} 
                    disabled={currentIndex === 0}
                >
                    <ChevronLeft size={18} /> Previous
                </button>
                
                {currentIndex === questions.length - 1 ? (
                    <button className="btn btn-primary" onClick={handleSubmit} disabled={submitting}>
                        {submitting ? 'Submitting...' : 'Finish Exam'} <Send size={18} />
                    </button>
                ) : (
                    <button className="btn btn-primary" onClick={() => setCurrentIndex(prev => prev + 1)}>
                        Next <ChevronRight size={18} />
                    </button>
                )}
            </div>

            {timeLeft < 30 && (
                <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--danger)', justifyContent: 'center' }}>
                    <AlertTriangle size={18} />
                    <span>Time is almost up! The exam will auto-submit.</span>
                </div>
            )}
        </div>
    );
};

export default Exam;
