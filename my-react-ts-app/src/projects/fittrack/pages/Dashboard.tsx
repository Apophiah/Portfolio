import React, { useEffect, useState } from 'react';
import type { WorkoutLog, Goal } from '../data/store';
import { weeklySteps, runningPerformance, weightData } from '../data/store';

interface Props { workouts: WorkoutLog[]; goals: Goal[]; }

const emojiMap: Record<string, string> = {
  Run: '🏃', Strength: '💪', Cycling: '🚴', Yoga: '🧘', Swimming: '🏊',
};

// ── Mini bar chart ───────────────────────────────────────────────────────────
const BarChart: React.FC<{ data: { day: string; steps: number }[] }> = ({ data }) => {
  const max = Math.max(...data.map(d => d.steps));
  const today = new Date().toLocaleDateString('en-US', { weekday: 'short' });
  return (
    <div className="ft-bar-chart">
      {data.map(d => (
        <div key={d.day} className="ft-bar-col">
          <div className="ft-bar" style={{ height: 80 }}>
            <div
              className={`ft-bar-fill ${d.day === today ? 'highlight' : ''}`}
              style={{ height: `${(d.steps / max) * 100}%` }}
            />
          </div>
          <span className="ft-bar-label">{d.day}</span>
        </div>
      ))}
    </div>
  );
};

// ── Mini SVG line chart ──────────────────────────────────────────────────────
const LineChart: React.FC<{ data: { day: string; pace: number }[]; color: string }> = ({ data, color }) => {
  const W = 260, H = 90;
  const vals = data.map(d => d.pace);
  const min = Math.min(...vals) - 0.3;
  const max = Math.max(...vals) + 0.3;
  const pts = vals.map((v, i) => ({
    x: (i / (vals.length - 1)) * W,
    y: H - ((v - min) / (max - min)) * H,
  }));
  const d = pts.map((p, i) => (i === 0 ? `M${p.x},${p.y}` : `L${p.x},${p.y}`)).join(' ');
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="ft-line-svg" preserveAspectRatio="none">
      <path d={d} fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
      {pts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="3.5" fill={color} />
      ))}
    </svg>
  );
};

// ── Circular progress ────────────────────────────────────────────────────────
const CircularProgress: React.FC<{ pct: number }> = ({ pct }) => {
  const r = 38, cx = 48, cy = 48;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <div className="ft-circle-wrap" style={{ position: 'relative', width: 96, height: 96 }}>
      <svg width="96" height="96" className="ft-circle-svg">
        <circle cx={cx} cy={cy} r={r} strokeWidth="8" className="ft-circle-track" />
        <circle cx={cx} cy={cy} r={r} strokeWidth="8" className="ft-circle-prog"
          strokeDasharray={circ} strokeDashoffset={offset} />
      </svg>
      <span className="ft-circle-label" style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)' }}>
        {pct}%
      </span>
    </div>
  );
};

const Dashboard: React.FC<Props> = ({ workouts, goals }) => {
  const [animated, setAnimated] = useState(false);
  useEffect(() => { const t = setTimeout(() => setAnimated(true), 100); return () => clearTimeout(t); }, []);

  const today = workouts[workouts.length - 1];
  const totalKcal = workouts.reduce((s, w) => s + w.calories, 0);
  const totalMin  = workouts.reduce((s, w) => s + w.duration, 0);
  const recentWorkouts = [...workouts].reverse().slice(0, 3);

  const stats = [
    { icon: '👟', value: '14,250', label: 'Steps Today',     change: '+12%', up: true },
    { icon: '🔥', value: `${today?.calories ?? 0}`, label: 'Calories Burned', change: '+5%', up: true },
    { icon: '❤️', value: '72 bpm', label: 'Avg Heart Rate',  change: '-3%', up: false },
    { icon: '🌊', value: '11.8', label: 'Distance (km)',      change: '+8%', up: true },
  ];

  return (
    <div>
      <div className="ft-page-header">
        <h1 className="ft-page-title">Daily Dashboard</h1>
        <p className="ft-page-sub">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>

      {/* Stat cards */}
      <div className="ft-stat-grid">
        {stats.map(s => (
          <div key={s.label} className="ft-stat-card">
            <span className="ft-stat-icon">{s.icon}</span>
            <span className="ft-stat-value">{s.value}</span>
            <span className="ft-stat-label">{s.label}</span>
            <span className={`ft-stat-change ${s.up ? 'up' : 'down'}`}>{s.change} vs last week</span>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="ft-charts-row">
        {/* Weekly steps */}
        <div className="ft-card">
          <p className="ft-card-title">Weekly Training Load</p>
          <BarChart data={weeklySteps} />
        </div>

        {/* Running pace */}
        <div className="ft-card">
          <p className="ft-card-title">Running Performance (min/km)</p>
          <LineChart data={runningPerformance} color="#a3e635" />
        </div>

        {/* Daily goal */}
        <div className="ft-card" style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'0.5rem' }}>
          <p className="ft-card-title">Goal Progress</p>
          <CircularProgress pct={animated ? 95 : 0} />
          <p style={{ fontSize:'0.78rem', color:'#64748b' }}>95% of daily goal</p>
        </div>
      </div>

      {/* Bottom: recent workouts + monthly goals */}
      <div className="ft-bottom-grid">
        <div className="ft-card">
          <p className="ft-card-title">Recent Workouts</p>
          <div className="ft-workouts-list">
            {recentWorkouts.map(w => (
              <div key={w.id} className="ft-workout-item">
                <span className="ft-workout-emoji">{emojiMap[w.type]}</span>
                <div className="ft-workout-info">
                  <p className="ft-workout-name">{w.type}</p>
                  <p className="ft-workout-meta">{w.duration} min · {w.date}</p>
                </div>
                <span className="ft-workout-kcal">{w.calories} kcal</span>
              </div>
            ))}
          </div>
        </div>

        <div className="ft-card">
          <p className="ft-card-title">Monthly Goals Progress</p>
          <div className="ft-goal-list">
            {goals.map(g => {
              const pct = Math.min(100, Math.round((g.current / g.target) * 100));
              return (
                <div key={g.id} className="ft-goal-item">
                  <div className="ft-goal-meta">
                    <span className="ft-goal-name">{g.label}</span>
                    <span className="ft-goal-pct" style={{ color: g.color }}>{pct}%</span>
                  </div>
                  <div className="ft-goal-track">
                    <div className="ft-goal-fill" style={{ width: animated ? `${pct}%` : '0%', background: g.color }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Summary chips */}
      <div style={{ display:'flex', gap:'1rem', marginTop:'1rem', flexWrap:'wrap' }}>
        <div className="ft-card" style={{ flex:1, minWidth:180, textAlign:'center' }}>
          <p className="ft-card-title">Total Workouts</p>
          <p style={{ fontSize:'2rem', fontWeight:900, color:'#a3e635' }}>{workouts.length}</p>
        </div>
        <div className="ft-card" style={{ flex:1, minWidth:180, textAlign:'center' }}>
          <p className="ft-card-title">Total Calories</p>
          <p style={{ fontSize:'2rem', fontWeight:900, color:'#f59e0b' }}>{totalKcal.toLocaleString()}</p>
        </div>
        <div className="ft-card" style={{ flex:1, minWidth:180, textAlign:'center' }}>
          <p className="ft-card-title">Total Minutes</p>
          <p style={{ fontSize:'2rem', fontWeight:900, color:'#60a5fa' }}>{totalMin}</p>
        </div>
        <div className="ft-card" style={{ flex:1, minWidth:180, textAlign:'center' }}>
          <p className="ft-card-title">Weight Trend</p>
          <p style={{ fontSize:'2rem', fontWeight:900, color:'#c084fc' }}>
            {weightData[weightData.length-1].weight} kg
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
