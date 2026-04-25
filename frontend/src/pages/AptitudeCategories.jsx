import { useNavigate } from 'react-router-dom';
import { Calculator, Zap, MessageSquare, Layout, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const AptitudeCategories = () => {
    const navigate = useNavigate();

    const categories = [
        { id: 'Quantitative', icon: <Calculator size={32} />, color: '#f59e0b' },
        { id: 'Logical Reasoning', icon: <Zap size={32} />, color: '#10b981' },
        { id: 'Verbal Ability', icon: <MessageSquare size={32} />, color: '#8b5cf6' },
        { id: 'Full Aptitude Test', icon: <Layout size={32} />, color: '#ef4444' }
    ];

    return (
        <div className="container">
            <button onClick={() => navigate('/subject-selection')} className="btn btn-outline" style={{ marginBottom: '2rem' }}>
                <ArrowLeft size={18} /> Back
            </button>
            <h1 style={{ textAlign: 'center', marginBottom: '3rem' }}>Aptitude Subcategories</h1>

            <div className="grid grid-cols-2" style={{ maxWidth: '800px', margin: '0 auto' }}>
                {categories.map((cat) => (
                    <motion.div 
                        key={cat.id}
                        whileHover={{ scale: 1.05 }}
                        className="glass-card" 
                        style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', cursor: 'pointer' }}
                        onClick={() => navigate(`/exam?subject=Aptitude&category=${cat.id}`)}
                    >
                        <div style={{ color: cat.color, background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '1rem' }}>
                            {cat.icon}
                        </div>
                        <h3>{cat.id}</h3>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default AptitudeCategories;
