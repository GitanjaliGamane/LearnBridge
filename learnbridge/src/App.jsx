import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import StudentLogin from './pages/StudentLogin';
import TeacherLogin from './pages/TeacherLogin';
import AdminLogin from './pages/AdminLogin';
import StudentSignup from './pages/StudentSignup';
import TeacherSignup from './pages/TeacherSignup';
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ChatRoom from './pages/ChatRoom';
import EditProfile from './pages/EditProfile';
import UserManagement from './pages/admin/UserManagement';
import Analytics from './pages/admin/Analytics';
import FindTutors from './pages/student/FindTutors';
import BookSession from './pages/student/BookSession';
import MyBookings from './pages/student/MyBookings';
import TutorProfile from './pages/student/TutorProfile';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/student-login" element={<StudentLogin />} />
          <Route path="/teacher-login" element={<TeacherLogin />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/student-signup" element={<StudentSignup />} />
          <Route path="/teacher-signup" element={<TeacherSignup />} />

          {/* Protected Student Routes */}
          <Route
            path="/student-dashboard"
            element={
              <ProtectedRoute requiredRole="student">
                <StudentDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/chat-room"
            element={
              <ProtectedRoute requiredRole="student">
                <ChatRoom />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/edit-profile"
            element={
              <ProtectedRoute requiredRole="student">
                <EditProfile />
              </ProtectedRoute>
            }
          />
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/find-tutors" element={<FindTutors />} />
          <Route path="/book-session/:tutorId" element={<BookSession />} />
          <Route path="/tutor-profile/:tutorId" element={<TutorProfile />} />
          <Route
            path="/my-bookings"
            element={
              <ProtectedRoute requiredRole="student">
                <MyBookings />
              </ProtectedRoute>
            }
          />

          {/* Protected Teacher Routes */}
          <Route
            path="/teacher-dashboard"
            element={
              <ProtectedRoute requiredRole="teacher">
                <TeacherDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher/chat-room"
            element={
              <ProtectedRoute requiredRole="teacher">
                <ChatRoom />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher/edit-profile"
            element={
              <ProtectedRoute requiredRole="teacher">
                <EditProfile />
              </ProtectedRoute>
            }
          />

          {/* Protected Admin Routes */}
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute requiredRole="admin">
                <UserManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/analytics"
            element={
              <ProtectedRoute requiredRole="admin">
                <Analytics />
              </ProtectedRoute>
            }
          />

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
