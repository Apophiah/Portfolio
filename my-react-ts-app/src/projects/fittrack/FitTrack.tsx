import React, { useState } from 'react';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import './fittrack.css';
import Dashboard from './pages/Dashboard';
import Activity from './pages/Activity';
import Goals from './pages/Goals';
import Workouts from './pages/Workouts';
import { initialWorkouts, initialGoals } from './data/store';
import type { WorkoutLog, Goal } from './data/store';

const FitTrack: React.FC = () => {
  const [workouts, setWorkouts] = useState<WorkoutLog[]>(initialWorkouts);
  const [goals, setGoals] = useState<Goal[]>(initialGoals);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { to: '/fittrack',          label: 'Dashboard', icon: '📊' },
    { to: '/fittrack/activity', label: 'Activity',  icon: '🏃' },
    { to: '/fittrack/workouts', label: 'Workouts',  icon: '💪' },
    { to: '/fittrack/goals',    label: 'Goals',     icon: '🎯' },
  ];

  return (
    <div className="ft-shell">
      {/* Sidebar */}
      <aside className={`ft-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="ft-logo">
          <span className="ft-logo-icon">💪</span>
          <span className="ft-logo-text">FitTrack</span>
        </div>

        <nav className="ft-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/fittrack'}
              className={({ isActive }) => `ft-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <span className="ft-nav-icon">{item.icon}</span>
              <span className="ft-nav-label">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="ft-sidebar-footer">
          <div className="ft-user">
            <div className="ft-avatar">A</div>
            <div className="ft-user-info">
              <span className="ft-user-name">KATUSHABE</span>
              <span className="ft-user-level">Pro Member</span>
            </div>
          </div>
          <button className="ft-back-btn" onClick={() => navigate('/')}>
            ← Portfolio
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && <div className="ft-overlay" onClick={() => setSidebarOpen(false)} />}

      {/* Main content */}
      <main className="ft-main">
        <div className="ft-topbar">
          <button className="ft-hamburger" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Menu">
            <span /><span /><span />
          </button>
          <span className="ft-topbar-title">FitTrack</span>
          <div className="ft-topbar-right">
            <span className="ft-notif">🔔</span>
            <div className="ft-avatar sm">A</div>
          </div>
        </div>

        <div className="ft-content">
          <Routes>
            <Route index element={<Dashboard workouts={workouts} goals={goals} />} />
            <Route path="activity" element={<Activity workouts={workouts} />} />
            <Route path="workouts" element={<Workouts workouts={workouts} setWorkouts={setWorkouts} />} />
            <Route path="goals" element={<Goals goals={goals} setGoals={setGoals} />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default FitTrack;
