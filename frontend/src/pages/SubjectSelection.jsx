import { useNavigate } from 'react-router-dom';
import { Brain, Code, Cpu, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const SubjectSelection = () => {
    const navigate = useNavigate();

    const subjects = [
        { id: 'Aptitude', icon: <Brain size={40} />, color: '#6366f1', desc: 'Quantitative, Logical & Verbal Reasoning' },
        { id: 'Programming', icon: <Code size={40} />, color: '#ec4899', desc: 'Basic Java Programming Assessment' },
        { id: 'IoT', icon: <Cpu size={40} />, color: '#22d3ee', desc: 'Internet of Things & Embedded Systems' }
    ];

    const handleSelect = (subject) => {
        if (subject === 'Aptitude') {
            navigate('/aptitude-categories');
        } else {
            navigate(`/exam?subject=${subject}`);
        }
    };

    return (
        <div className="container">
            <button onClick={() => navigate('/student-dashboard')} className="btn btn-outline" style={{ marginBottom: '2rem' }}>
                <ArrowLeft size={18} /> Back
            </button>
            <h1 style={{ textAlign: 'center', marginBottom: '3rem' }}>Select Assessment Subject</h1>

            <div className="grid grid-cols-3">
                {subjects.map((sub) => (
                    <motion.div 
                        key={sub.id}
                        whileHover={{ y: -10, scale: 1.05 }}
                        className="glass-card" 
                        style={{ textAlign: 'center', cursor: 'pointer', borderBottom: `4px solid ${sub.color}` }}
                        onClick={() => handleSelect(sub.id)}
                    >
                        <div style={{ color: sub.color, marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                            {sub.icon}
                        </div>
                        <h2>{sub.id}</h2>
                        <p style={{ color: 'var(--text-muted)' }}>{sub.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default SubjectSelection;
