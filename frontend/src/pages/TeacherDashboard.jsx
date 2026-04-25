import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { LogOut, Search, Filter, User, BookOpen, BarChart3, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../api/config';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TeacherDashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const [results, setResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterSubject, setFilterSubject] = useState('All');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const res = await api.get('/results/all');
                setResults(res.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        fetchResults();
    }, [user]);

    const filteredResults = results.filter(r => {
        const studentName = r.student?.name || '';
        const regNumber = r.student?.registerNumber || '';
        
        const matchesSearch = studentName.toLowerCase().includes(searchTerm.toLowerCase());
                             
        const matchesSubject = filterSubject === 'All' || r.subject.includes(filterSubject);
        return matchesSearch && matchesSubject;
    });

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this result?')) {
            try {
                await api.delete(`/results/${id}`);
                setResults(results.filter(r => r._id !== id));
            } catch (error) {
                console.error('Delete failed:', error);
                const msg = error.response?.data?.message || 'Failed to delete result';
                alert(msg);
            }
        }
    };

    const chartData = {
        labels: ['0-20%', '21-40%', '41-60%', '61-80%', '81-100%'],
        datasets: [{
            label: 'Students Count',
            data: [
                results.filter(r => r.percentage <= 20).length,
                results.filter(r => r.percentage > 20 && r.percentage <= 40).length,
                results.filter(r => r.percentage > 40 && r.percentage <= 60).length,
                results.filter(r => r.percentage > 60 && r.percentage <= 80).length,
                results.filter(r => r.percentage > 80).length,
            ],
            backgroundColor: 'rgba(99, 102, 241, 0.6)',
            borderColor: 'var(--primary)',
            borderWidth: 1,
            borderRadius: 8
        }]
    };

    return (
        <div className="container">
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <h1>Teacher Dashboard</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Monitoring Student Performance</p>
                </motion.div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <div className="glass-card" style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <User size={18} color="var(--primary)" />
                        <span>{user?.name}</span>
                    </div>
                    <button onClick={logout} className="btn btn-outline" style={{ color: 'var(--danger)' }}>
                        <LogOut size={18} /> Logout
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-3" style={{ marginBottom: '3rem', gridTemplateColumns: '2fr 1fr' }}>
                <div className="glass-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h3>Performance Analytics</h3>
                        <BarChart3 size={20} color="var(--secondary)" />
                    </div>
                    <div style={{ height: '300px' }}>
                        <Bar 
                            data={chartData} 
                            options={{ 
                                responsive: true, 
                                maintainAspectRatio: false,
                                plugins: { legend: { display: false } },
                                scales: { 
                                    y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } },
                                    x: { ticks: { color: '#94a3b8' }, grid: { display: false } }
                                }
                            }} 
                        />
                    </div>
                </div>

                <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{results.length}</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Total Submissions</p>
                    <div style={{ margin: '2rem 0', height: '1px', background: 'var(--glass-border)' }} />
                    <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem', color: 'var(--success)', webkitTextFillColor: 'initial' }}>
                        {results.length > 0 ? (results.reduce((acc, curr) => acc + curr.percentage, 0) / results.length).toFixed(1) : 0}%
                    </h1>
                    <p style={{ color: 'var(--text-muted)' }}>Class Average</p>
                </div>
            </div>

            <div className="glass-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', gap: '1rem', flex: 1, minWidth: '300px' }}>
                        <div style={{ position: 'relative', flex: 1 }}>
                            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input 
                                type="text" 
                                placeholder="Search student name..." 
                                style={{ paddingLeft: '3rem', marginBottom: 0 }}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div style={{ position: 'relative' }}>
                            <Filter size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <select 
                                style={{ paddingLeft: '3rem', width: '200px', marginBottom: 0 }}
                                value={filterSubject}
                                onChange={(e) => setFilterSubject(e.target.value)}
                            >
                                <option value="All">All Subjects</option>
                                <option value="Aptitude">Aptitude</option>
                                <option value="Programming">Programming</option>
                                <option value="IoT">IoT</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
                                <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Student Name</th>
                                <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Subject</th>
                                <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Marks</th>
                                <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Percentage</th>
                                <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Status</th>
                                <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Date</th>
                                <th style={{ padding: '1rem', color: 'var(--text-muted)', textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredResults.length > 0 ? filteredResults.map((r, i) => (
                                <tr key={i} style={{ borderBottom: '1px solid var(--glass-border)', transition: 'background 0.3s' }}>
                                    <td style={{ padding: '1rem', fontWeight: '500', color: 'white' }}>{r.student?.name || 'N/A'}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <BookOpen size={14} color="var(--primary)" />
                                            {r.subject}
                                        </div>
                                    </td>
                                    <td style={{ padding: '1rem' }}>{r.marks} / {r.totalQuestions}</td>
                                    <td style={{ padding: '1rem', color: r.percentage >= 60 ? 'var(--success)' : 'var(--danger)', fontWeight: 'bold' }}>{r.percentage}%</td>
                                    <td style={{ padding: '1rem' }}>
                                        <span style={{ 
                                            padding: '0.25rem 0.75rem', 
                                            borderRadius: '1rem', 
                                            fontSize: '0.8rem', 
                                            background: 'rgba(16, 185, 129, 0.1)', 
                                            color: 'var(--success)',
                                            border: '1px solid rgba(16, 185, 129, 0.2)' 
                                        }}>{r.status}</span>
                                    </td>
                                    <td style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                        {new Date(r.createdAt).toLocaleDateString()}
                                    </td>
                                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                                        <button 
                                            onClick={() => handleDelete(r._id)} 
                                            className="btn-icon" 
                                            style={{ 
                                                background: 'rgba(239, 68, 68, 0.1)', 
                                                color: 'var(--danger)',
                                                border: '1px solid rgba(239, 68, 68, 0.2)',
                                                padding: '0.5rem',
                                                borderRadius: '0.5rem',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s'
                                            }}
                                            title="Delete Result"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="7" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>No results found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TeacherDashboard;
