import React, { useState } from 'react';
import type { WorkoutLog } from '../data/store';

interface Props {
  workouts: WorkoutLog[];
  setWorkouts: React.Dispatch<React.SetStateAction<WorkoutLog[]>>;
}

const emojiMap: Record<string, string> = {
  Run: '🏃', Strength: '💪', Cycling: '🚴', Yoga: '🧘', Swimming: '🏊',
};
const badgeClass: Record<string, string> = {
  Run: 'run', Strength: 'strength', Cycling: 'cycling', Yoga: 'yoga', Swimming: 'swimming',
};

const emptyForm = { type: 'Run' as WorkoutLog['type'], date: '', duration: '', calories: '', distance: '', notes: '' };

const Workouts: React.FC<Props> = ({ workouts, setWorkouts }) => {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.date) e.date = 'Required';
    if (!form.duration || isNaN(+form.duration) || +form.duration <= 0) e.duration = 'Enter valid minutes';
    if (!form.calories || isNaN(+form.calories) || +form.calories <= 0) e.calories = 'Enter valid kcal';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const newW: WorkoutLog = {
      id: `w${Date.now()}`,
      type: form.type,
      date: form.date,
      duration: +form.duration,
      calories: +form.calories,
      distance: form.distance ? +form.distance : undefined,
      notes: form.notes || undefined,
    };
    setWorkouts(prev => [...prev, newW]);
    setForm(emptyForm);
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    setWorkouts(prev => prev.filter(w => w.id !== id));
    setDeleteId(null);
  };

  const sorted = [...workouts].sort((a, b) => b.date.localeCompare(a.date));
  const totalDuration = workouts.reduce((s, w) => s + w.duration, 0);
  const totalCal = workouts.reduce((s, w) => s + w.calories, 0);

  return (
    <div>
      <div className="ft-page-header" style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:'1rem' }}>
        <div>
          <h1 className="ft-page-title">Workouts</h1>
          <p className="ft-page-sub">Log and manage your training sessions</p>
        </div>
        <button className="ft-btn" onClick={() => setShowModal(true)}>+ Log Workout</button>
      </div>

      {/* Summary */}
      <div className="ft-stat-grid" style={{ marginBottom:'1.5rem' }}>
        <div className="ft-stat-card">
          <span className="ft-stat-icon">📋</span>
          <span className="ft-stat-value">{workouts.length}</span>
          <span className="ft-stat-label">Total Sessions</span>
        </div>
        <div className="ft-stat-card">
          <span className="ft-stat-icon">⏱️</span>
          <span className="ft-stat-value">{totalDuration}</span>
          <span className="ft-stat-label">Total Minutes</span>
        </div>
        <div className="ft-stat-card">
          <span className="ft-stat-icon">🔥</span>
          <span className="ft-stat-value">{totalCal.toLocaleString()}</span>
          <span className="ft-stat-label">Total Calories</span>
        </div>
        <div className="ft-stat-card">
          <span className="ft-stat-icon">📅</span>
          <span className="ft-stat-value">{workouts.length > 0 ? sorted[0].date : '—'}</span>
          <span className="ft-stat-label">Last Workout</span>
        </div>
      </div>

      {/* List */}
      <div className="ft-card">
        <p className="ft-card-title">All Sessions ({sorted.length})</p>
        <div className="ft-workouts-list">
          {sorted.map(w => (
            <div key={w.id} className="ft-workout-item">
              <span className="ft-workout-emoji">{emojiMap[w.type]}</span>
              <div className="ft-workout-info">
                <div style={{ display:'flex', gap:'0.5rem', alignItems:'center' }}>
                  <p className="ft-workout-name">{w.type}</p>
                  <span className={`ft-badge ${badgeClass[w.type]}`}>{w.type}</span>
                </div>
                <p className="ft-workout-meta">
                  {w.date} · {w.duration} min · {w.calories} kcal
                  {w.distance ? ` · ${w.distance} km` : ''}
                  {w.notes ? ` · ${w.notes}` : ''}
                </p>
              </div>
              <button
                className="ft-btn danger"
                style={{ padding:'4px 12px', fontSize:'0.75rem' }}
                onClick={() => setDeleteId(w.id)}
              >Delete</button>
            </div>
          ))}
          {sorted.length === 0 && <p style={{ color:'#64748b' }}>No workouts yet. Log your first one!</p>}
        </div>
      </div>

      {/* Add modal */}
      {showModal && (
        <div className="ft-modal-bg" onClick={() => setShowModal(false)}>
          <div className="ft-modal" onClick={e => e.stopPropagation()}>
            <div className="ft-modal-header">
              <h2 className="ft-modal-title">Log Workout</h2>
              <button className="ft-modal-close" onClick={() => setShowModal(false)}>×</button>
            </div>
            <form className="ft-form" onSubmit={handleAdd}>
              <div className="ft-form-row">
                <div className="ft-field">
                  <label className="ft-label">Type</label>
                  <select className="ft-select" value={form.type} onChange={e => setForm({ ...form, type: e.target.value as WorkoutLog['type'] })}>
                    {['Run','Strength','Cycling','Yoga','Swimming'].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div className="ft-field">
                  <label className="ft-label">Date</label>
                  <input className={`ft-input ${errors.date ? 'error' : ''}`} type="date" value={form.date}
                    onChange={e => setForm({ ...form, date: e.target.value })} style={{ borderColor: errors.date ? '#f87171' : '' }} />
                  {errors.date && <span style={{ color:'#f87171', fontSize:'0.75rem' }}>{errors.date}</span>}
                </div>
              </div>
              <div className="ft-form-row">
                <div className="ft-field">
                  <label className="ft-label">Duration (min)</label>
                  <input className="ft-input" type="number" min="1" placeholder="45" value={form.duration}
                    onChange={e => setForm({ ...form, duration: e.target.value })} style={{ borderColor: errors.duration ? '#f87171' : '' }} />
                  {errors.duration && <span style={{ color:'#f87171', fontSize:'0.75rem' }}>{errors.duration}</span>}
                </div>
                <div className="ft-field">
                  <label className="ft-label">Calories (kcal)</label>
                  <input className="ft-input" type="number" min="1" placeholder="300" value={form.calories}
                    onChange={e => setForm({ ...form, calories: e.target.value })} style={{ borderColor: errors.calories ? '#f87171' : '' }} />
                  {errors.calories && <span style={{ color:'#f87171', fontSize:'0.75rem' }}>{errors.calories}</span>}
                </div>
              </div>
              <div className="ft-field">
                <label className="ft-label">Distance (km) — optional</label>
                <input className="ft-input" type="number" min="0" step="0.1" placeholder="5.0" value={form.distance}
                  onChange={e => setForm({ ...form, distance: e.target.value })} />
              </div>
              <div className="ft-field">
                <label className="ft-label">Notes — optional</label>
                <textarea className="ft-textarea" rows={2} placeholder="Morning run, felt great..." value={form.notes}
                  onChange={e => setForm({ ...form, notes: e.target.value })} />
              </div>
              <div style={{ display:'flex', gap:'0.75rem', justifyContent:'flex-end' }}>
                <button type="button" className="ft-btn outline" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="ft-btn">Save Workout</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirm delete */}
      {deleteId && (
        <div className="ft-modal-bg" onClick={() => setDeleteId(null)}>
          <div className="ft-modal" style={{ maxWidth:360 }} onClick={e => e.stopPropagation()}>
            <div className="ft-modal-header">
              <h2 className="ft-modal-title">Delete Workout?</h2>
              <button className="ft-modal-close" onClick={() => setDeleteId(null)}>×</button>
            </div>
            <p style={{ color:'#94a3b8', marginBottom:'1.5rem' }}>This action cannot be undone.</p>
            <div style={{ display:'flex', gap:'0.75rem', justifyContent:'flex-end' }}>
              <button className="ft-btn outline" onClick={() => setDeleteId(null)}>Cancel</button>
              <button className="ft-btn danger" onClick={() => handleDelete(deleteId)}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Workouts;
