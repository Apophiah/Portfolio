import React, { useState } from 'react';
import type { WorkoutLog } from '../data/store';
import { weeklySteps, weightData, runningPerformance } from '../data/store';

interface Props { workouts: WorkoutLog[]; }

const emojiMap: Record<string, string> = {
  Run: '🏃', Strength: '💪', Cycling: '🚴', Yoga: '🧘', Swimming: '🏊',
};

const badgeClass: Record<string, string> = {
  Run: 'run', Strength: 'strength', Cycling: 'cycling', Yoga: 'yoga', Swimming: 'swimming',
};

// SVG line chart
const MultiLine: React.FC<{ datasets: { label: string; color: string; values: number[] }[]; labels: string[] }> = ({ datasets, labels }) => {
  const W = 400, H = 120;
  const allVals = datasets.flatMap(d => d.values);
  const min = Math.min(...allVals) * 0.95;
  const max = Math.max(...allVals) * 1.05;
  const px = (i: number) => (i / (labels.length - 1)) * W;
  const py = (v: number) => H - ((v - min) / (max - min)) * H;

  return (
    <svg viewBox={`0 0 ${W} ${H + 20}`} style={{ width: '100%', height: 140 }}>
      {/* X labels */}
      {labels.map((l, i) => (
        <text key={l} x={px(i)} y={H + 16} textAnchor="middle" fontSize="10" fill="#64748b">{l}</text>
      ))}
      {datasets.map(ds => {
        const pts = ds.values.map((v, i) => ({ x: px(i), y: py(v) }));
        const path = pts.map((p, i) => (i === 0 ? `M${p.x},${p.y}` : `L${p.x},${p.y}`)).join(' ');
        return (
          <g key={ds.label}>
            <path d={path} fill="none" stroke={ds.color} strokeWidth="2.5" strokeLinejoin="round" />
            {pts.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r="3" fill={ds.color} />)}
          </g>
        );
      })}
    </svg>
  );
};

const Activity: React.FC<Props> = ({ workouts }) => {
  const [filterType, setFilterType] = useState<string>('All');
  const types = ['All', 'Run', 'Strength', 'Cycling', 'Yoga', 'Swimming'];

  const filtered = filterType === 'All' ? workouts : workouts.filter(w => w.type === filterType);
  const sorted = [...filtered].sort((a, b) => b.date.localeCompare(a.date));

  // Weekly calorie burn per type
  const calByType = workouts.reduce<Record<string, number>>((acc, w) => {
    acc[w.type] = (acc[w.type] ?? 0) + w.calories;
    return acc;
  }, {});

  return (
    <div>
      <div className="ft-page-header">
        <h1 className="ft-page-title">Activity</h1>
        <p className="ft-page-sub">Your movement trends & history</p>
      </div>

      {/* Charts */}
      <div className="ft-charts-row" style={{ gridTemplateColumns: '1fr 1fr' }}>
        <div className="ft-card">
          <p className="ft-card-title">Steps This Week</p>
          <MultiLine
            labels={weeklySteps.map(d => d.day)}
            datasets={[{ label: 'Steps', color: '#a3e635', values: weeklySteps.map(d => d.steps) }]}
          />
        </div>
        <div className="ft-card">
          <p className="ft-card-title">Weight & Body Fat</p>
          <MultiLine
            labels={weightData.map(d => d.day)}
            datasets={[
              { label: 'Weight (kg)', color: '#f59e0b', values: weightData.map(d => d.weight) },
              { label: 'Body Fat %',  color: '#ef4444', values: weightData.map(d => d.fat) },
            ]}
          />
          <div style={{ display:'flex', gap:'1rem', marginTop:'0.5rem' }}>
            <span style={{ fontSize:'0.72rem', color:'#f59e0b' }}>● Weight (kg)</span>
            <span style={{ fontSize:'0.72rem', color:'#ef4444' }}>● Body Fat %</span>
          </div>
        </div>
      </div>

      {/* Running performance */}
      <div className="ft-card" style={{ marginBottom:'1.5rem' }}>
        <p className="ft-card-title">Running Pace (min/km)</p>
        <MultiLine
          labels={runningPerformance.map(d => d.day)}
          datasets={[{ label: 'Pace', color: '#60a5fa', values: runningPerformance.map(d => d.pace) }]}
        />
      </div>

      {/* Calories by type */}
      <div className="ft-card" style={{ marginBottom:'1.5rem' }}>
        <p className="ft-card-title">Calories Burned by Type</p>
        <div style={{ display:'flex', gap:'1rem', flexWrap:'wrap', marginTop:'0.5rem' }}>
          {Object.entries(calByType).map(([type, kcal]) => (
            <div key={type} style={{ background:'#1e2535', borderRadius:10, padding:'0.75rem 1.25rem', minWidth:120 }}>
              <p style={{ fontSize:'0.75rem', color:'#64748b' }}>{emojiMap[type]} {type}</p>
              <p style={{ fontSize:'1.4rem', fontWeight:800, color:'#a3e635' }}>{kcal}</p>
              <p style={{ fontSize:'0.7rem', color:'#64748b' }}>kcal</p>
            </div>
          ))}
        </div>
      </div>

      {/* Filter + history */}
      <div className="ft-card">
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1rem', flexWrap:'wrap', gap:'0.5rem' }}>
          <p className="ft-card-title" style={{ margin:0 }}>Activity Log</p>
          <div style={{ display:'flex', gap:'0.4rem', flexWrap:'wrap' }}>
            {types.map(t => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                style={{
                  padding:'4px 12px', borderRadius:99, border:'1.5px solid',
                  borderColor: filterType === t ? '#a3e635' : '#1e2535',
                  background: filterType === t ? '#1e3a1e' : 'transparent',
                  color: filterType === t ? '#a3e635' : '#64748b',
                  fontSize:'0.78rem', fontWeight:700, cursor:'pointer'
                }}
              >{t}</button>
            ))}
          </div>
        </div>

        <div className="ft-workouts-list">
          {sorted.length === 0 && <p style={{ color:'#64748b', fontSize:'0.9rem' }}>No workouts found.</p>}
          {sorted.map(w => (
            <div key={w.id} className="ft-workout-item">
              <span className="ft-workout-emoji">{emojiMap[w.type]}</span>
              <div className="ft-workout-info">
                <div style={{ display:'flex', gap:'0.5rem', alignItems:'center' }}>
                  <p className="ft-workout-name">{w.type}</p>
                  <span className={`ft-badge ${badgeClass[w.type]}`}>{w.type}</span>
                </div>
                <p className="ft-workout-meta">
                  {w.date} · {w.duration} min {w.distance ? `· ${w.distance} km` : ''} {w.notes ? `· ${w.notes}` : ''}
                </p>
              </div>
              <span className="ft-workout-kcal">{w.calories} kcal</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Activity;
