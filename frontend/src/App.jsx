import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext, AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import SubjectSelection from './pages/SubjectSelection';
import AptitudeCategories from './pages/AptitudeCategories';
import Exam from './pages/Exam';
import Result from './pages/Result';
import StudentResults from './pages/StudentResults';
import Register from './pages/Register';

const PrivateRoute = ({ children, role }) => {
    const { user } = useContext(AuthContext);
    if (!user) return <Navigate to="/" />;
    if (role && user.role !== role) return <Navigate to="/" />;
    return children;
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="app-container">
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/student-dashboard" element={
                            <PrivateRoute role="student">
                                <StudentDashboard />
                            </PrivateRoute>
                        } />
                        <Route path="/teacher-dashboard" element={
                            <PrivateRoute role="teacher">
                                <TeacherDashboard />
                            </PrivateRoute>
                        } />
                        <Route path="/subject-selection" element={
                            <PrivateRoute role="student">
                                <SubjectSelection />
                            </PrivateRoute>
                        } />
                        <Route path="/aptitude-categories" element={
                            <PrivateRoute role="student">
                                <AptitudeCategories />
                            </PrivateRoute>
                        } />
                        <Route path="/exam" element={
                            <PrivateRoute role="student">
                                <Exam />
                            </PrivateRoute>
                        } />
                        <Route path="/result/:id" element={
                            <PrivateRoute role="student">
                                <Result />
                            </PrivateRoute>
                        } />
                        <Route path="/student-results" element={
                            <PrivateRoute role="student">
                                <StudentResults />
                            </PrivateRoute>
                        } />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
