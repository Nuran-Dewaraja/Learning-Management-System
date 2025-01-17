import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import AdminPanel from './pages/AdminPanel';
import LoginForm from './pages/LoginForm';
import ProtectedRoute from './ProtectedRoute';
import StudentPanel from './pages/StudentPanel';
import UserForm from './pages/UserForm';
import EditUser from './pages/EditUser';
import Layout from './Layout';
import IctForm from './pages/ict/IctForm';
import IctPanel from './pages/ict/IctPanel';
import EditIctForm from './pages/ict/EditIctForm';
import StudentIctPanel from './pages/ict/StudentIctPanel';
import HotelForm from './pages/hotel/HotelForm';
import HotelPanel from './pages/hotel/HotelPanel';
import EditHotelForm from './pages/hotel/EditHotelForm';
import StudentHotelPanel from './pages/hotel/StudentHotelPanel';
import AutoForm from './pages/auto/AutoForm';
import AutoPanel from './pages/auto/AutoPanel';
import EditAutoForm from './pages/auto/EditAutoForm';
import StudentAutoPanel from './pages/auto/StudentAutoPanel';
import SEForm from './pages/se/SEForm';
import SEPanel from './pages/se/SEPanel';
import EditSEForm from './pages/se/EditSEForm';
import StudentSEPanel from './pages/se/StudentSEPanel';
import ETForm from './pages/et/ETForm';
import ETPanel from './pages/et/ETPanel';
import EditETForm from './pages/et/EditETForm';
import StudentETPanel from './pages/et/StudentETPanel';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute roleRequired="admin">
              <Layout>
              <StudentPanel />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-user"
          element={
            <ProtectedRoute roleRequired="admin">
              <Layout>
              <EditUser />
              </Layout>
              </ProtectedRoute>
          }
        />

        <Route
          path="/add-user"
          element={
            <ProtectedRoute roleRequired="admin">
              <Layout>
              <UserForm />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/student"
          element={
            <ProtectedRoute roleRequired="student">
              <Layout>
              <StudentPanel />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/ict"
          element={
            <ProtectedRoute roleRequired="student">
              <Layout>
              <StudentIctPanel />
              </Layout>
            </ProtectedRoute>
          }
        />


        <Route
          path="/ict-lecturer"
          element={
            <ProtectedRoute roleRequired="lecturer">
              <Layout>
              <IctForm />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/ict-list"
          element={
            <ProtectedRoute roleRequired="lecturer">
              <Layout>
              <IctPanel />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-ict"
          element={
            <ProtectedRoute roleRequired="lecturer">
              <Layout>
              <EditIctForm />
              </Layout>
            </ProtectedRoute>
          }
        />


        <Route
          path="/hotel-lecturer"
          element={
            <ProtectedRoute roleRequired="lecturer">
              <Layout>
              <HotelForm />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/hotel-list"
          element={
            <ProtectedRoute roleRequired="lecturer">
              <Layout>
                <HotelPanel />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-hotel"
          element={
            <ProtectedRoute roleRequired="lecturer">
              <Layout>
                <EditHotelForm />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/hotel"
          element={
            <ProtectedRoute roleRequired="student">
              <Layout>
                <StudentHotelPanel />
              </Layout>
            </ProtectedRoute>
          }
        />


        <Route
          path="/auto-lecturer"
          element={
            <ProtectedRoute roleRequired="lecturer">
              <Layout>
              <AutoForm />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/auto-list"
          element={
            <ProtectedRoute roleRequired="lecturer">
              <Layout>
                <AutoPanel />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-auto"
          element={
            <ProtectedRoute roleRequired="lecturer">
              <Layout>
                <EditAutoForm />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/auto"
          element={
            <ProtectedRoute roleRequired="student">
              <Layout>
                <StudentAutoPanel />
              </Layout>
            </ProtectedRoute>
          }
        />


        <Route
          path="/se-lecturer"
          element={
            <ProtectedRoute roleRequired="lecturer">
              <Layout>
              <SEForm />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/se-list"
          element={
            <ProtectedRoute roleRequired="lecturer">
              <Layout>
                <SEPanel />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-se"
          element={
            <ProtectedRoute roleRequired="lecturer">
              <Layout>
                <EditSEForm />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/se"
          element={
            <ProtectedRoute roleRequired="student">
              <Layout>
                <StudentSEPanel />
              </Layout>
            </ProtectedRoute>
          }
        />


                <Route
          path="/et-lecturer"
          element={
            <ProtectedRoute roleRequired="lecturer">
              <Layout>
              <ETForm />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/et-list"
          element={
            <ProtectedRoute roleRequired="lecturer">
              <Layout>
                <ETPanel />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-et"
          element={
            <ProtectedRoute roleRequired="lecturer">
              <Layout>
                <EditETForm />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/et"
          element={
            <ProtectedRoute roleRequired="student">
              <Layout>
                <StudentETPanel />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route path="/" element={<LoginForm />} />
      </Routes>
    </Router>
  );
};

export default App;
