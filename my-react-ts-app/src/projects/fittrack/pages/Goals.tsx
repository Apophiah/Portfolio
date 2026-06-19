import React, { useEffect, useState } from 'react';
import type { Goal } from '../data/store';

interface Props {
  goals: Goal[];
  setGoals: React.Dispatch<React.SetStateAction<Goal[]>>;
}

const COLORS = ['#22c55e', '#a3e635', '#f59e0b', '#ef4444', '#60a5fa', '#c084fc', '#22d3ee'];

const emptyForm = { label: '', target: '', current: '', unit: '', color: COLORS[0] };

const Goals: React.FC<Props> = ({ goals, setGoals }) => {
  const [animated, setAnimated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editGoal, setEditGoal] = useState<Goal | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => { const t = setTimeout(() => setAnimated(true), 100); return () => clearTimeout(t); }, []);

  const openAdd = () => { setEditGoal(null); setForm(emptyForm); setErrors({}); setShowModal(true); };
  const openEdit = (g: Goal) => {
    setEditGoal(g);
    setForm({ label: g.label, target: String(g.target), current: String(g.current), unit: g.unit, color: g.color });
    setErrors({});
    setShowModal(true);
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.label.trim()) e.label = 'Required';
    if (!form.target || isNaN(+form.target) || +form.target <= 0) e.target = 'Enter a positive number';
    if (!form.unit.trim()) e.unit = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (editGoal) {
      setGoals(prev => prev.map(g => g.id === editGoal.id
        ? { ...g, label: form.label, target: +form.target, current: +form.current || 0, unit: form.unit, color: form.color }
        : g));
    } else {
      setGoals(prev => [...prev, {
        id: `g${Date.now()}`,
        label: form.label, target: +form.target,
        current: +form.current || 0, unit: form.unit, color: form.color,
      }]);
    }
    setShowModal(false);
  };

  const handleDelete = (id: string) => setGoals(prev => prev.filter(g => g.id !== id));

  const updateProgress = (id: string, delta: number) => {
    setGoals(prev => prev.map(g => g.id === id
      ? { ...g, current: Math.max(0, Math.min(g.target, +(g.current + delta).toFixed(2))) }
      : g));
  };

  const completed = goals.filter(g => g.current >= g.target).length;

  return (
    <div>
      <div className="ft-page-header" style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:'1rem' }}>
        <div>
          <h1 className="ft-page-title">Goals</h1>
          <p className="ft-page-sub">{completed} of {goals.length} goals completed this month</p>
        </div>
        <button className="ft-btn" onClick={openAdd}>+ New Goal</button>
      </div>

      {/* Summary */}
      <div className="ft-stat-grid" style={{ marginBottom:'1.5rem' }}>
        <div className="ft-stat-card">
          <span className="ft-stat-icon">🎯</span>
          <span className="ft-stat-value">{goals.length}</span>
          <span className="ft-stat-label">Active Goals</span>
        </div>
        <div className="ft-stat-card">
          <span className="ft-stat-icon">✅</span>
          <span className="ft-stat-value">{completed}</span>
          <span className="ft-stat-label">Completed</span>
        </div>
        <div className="ft-stat-card">
          <span className="ft-stat-icon">🔄</span>
          <span className="ft-stat-value">{goals.length - completed}</span>
          <span className="ft-stat-label">In Progress</span>
        </div>
        <div className="ft-stat-card">
          <span className="ft-stat-icon">📈</span>
          <span className="ft-stat-value">
            {goals.length > 0 ? Math.round(goals.reduce((s, g) => s + Math.min(100, (g.current / g.target) * 100), 0) / goals.length) : 0}%
          </span>
          <span className="ft-stat-label">Avg Progress</span>
        </div>
      </div>

      {/* Goals grid */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:'1rem' }}>
        {goals.map(g => {
          const pct = Math.min(100, Math.round((g.current / g.target) * 100));
          const done = g.current >= g.target;
          return (
            <div key={g.id} className="ft-card" style={{ position:'relative', border: done ? `1.5px solid ${g.color}` : '' }}>
              {done && <span style={{ position:'absolute', top:12, right:12, fontSize:'1.1rem' }}>✅</span>}
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'0.75rem' }}>
                <p style={{ fontWeight:700, fontSize:'1rem', color:'#f1f5f9' }}>{g.label}</p>
              </div>

              <div className="ft-goal-track" style={{ marginBottom:'0.5rem' }}>
                <div className="ft-goal-fill" style={{ width: animated ? `${pct}%` : '0%', background: g.color }} />
              </div>

              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'1rem' }}>
                <span style={{ fontSize:'0.8rem', color:'#94a3b8' }}>{g.current} / {g.target} {g.unit}</span>
                <span style={{ fontSize:'0.85rem', fontWeight:800, color: g.color }}>{pct}%</span>
              </div>

              {/* Quick increment */}
              <div style={{ display:'flex', gap:'0.5rem', marginBottom:'1rem' }}>
                <button className="ft-btn outline" style={{ flex:1, padding:'5px', fontSize:'0.78rem' }}
                  onClick={() => updateProgress(g.id, -(g.target * 0.05))}>−5%</button>
                <button className="ft-btn" style={{ flex:1, padding:'5px', fontSize:'0.78rem' }}
                  onClick={() => updateProgress(g.id, g.target * 0.1)}>+10%</button>
                <button className="ft-btn" style={{ flex:1, padding:'5px', fontSize:'0.78rem', background:'#22c55e' }}
                  onClick={() => updateProgress(g.id, g.target * 0.25)}>+25%</button>
              </div>

              <div style={{ display:'flex', gap:'0.5rem' }}>
                <button className="ft-btn outline" style={{ flex:1, fontSize:'0.78rem', padding:'5px 8px' }} onClick={() => openEdit(g)}>Edit</button>
                <button className="ft-btn danger" style={{ flex:1, fontSize:'0.78rem', padding:'5px 8px' }} onClick={() => handleDelete(g.id)}>Delete</button>
              </div>
            </div>
          );
        })}
        {goals.length === 0 && (
          <div className="ft-card" style={{ textAlign:'center', padding:'3rem' }}>
            <p style={{ fontSize:'2rem', marginBottom:'0.5rem' }}>🎯</p>
            <p style={{ color:'#64748b' }}>No goals yet. Add your first one!</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="ft-modal-bg" onClick={() => setShowModal(false)}>
          <div className="ft-modal" onClick={e => e.stopPropagation()}>
            <div className="ft-modal-header">
              <h2 className="ft-modal-title">{editGoal ? 'Edit Goal' : 'New Goal'}</h2>
              <button className="ft-modal-close" onClick={() => setShowModal(false)}>×</button>
            </div>
            <form className="ft-form" onSubmit={handleSave}>
              <div className="ft-field">
                <label className="ft-label">Goal Label</label>
                <input className="ft-input" placeholder="e.g. Run 10km" value={form.label}
                  onChange={e => setForm({ ...form, label: e.target.value })}
                  style={{ borderColor: errors.label ? '#f87171' : '' }} />
                {errors.label && <span style={{ color:'#f87171', fontSize:'0.75rem' }}>{errors.label}</span>}
              </div>
              <div className="ft-form-row">
                <div className="ft-field">
                  <label className="ft-label">Target</label>
                  <input className="ft-input" type="number" min="0" placeholder="100" value={form.target}
                    onChange={e => setForm({ ...form, target: e.target.value })}
                    style={{ borderColor: errors.target ? '#f87171' : '' }} />
                  {errors.target && <span style={{ color:'#f87171', fontSize:'0.75rem' }}>{errors.target}</span>}
                </div>
                <div className="ft-field">
                  <label className="ft-label">Current Progress</label>
                  <input className="ft-input" type="number" min="0" placeholder="0" value={form.current}
                    onChange={e => setForm({ ...form, current: e.target.value })} />
                </div>
              </div>
              <div className="ft-field">
                <label className="ft-label">Unit</label>
                <input className="ft-input" placeholder="km, sessions, kcal…" value={form.unit}
                  onChange={e => setForm({ ...form, unit: e.target.value })}
                  style={{ borderColor: errors.unit ? '#f87171' : '' }} />
                {errors.unit && <span style={{ color:'#f87171', fontSize:'0.75rem' }}>{errors.unit}</span>}
              </div>
              <div className="ft-field">
                <label className="ft-label">Color</label>
                <div style={{ display:'flex', gap:'0.5rem', flexWrap:'wrap' }}>
                  {COLORS.map(c => (
                    <button key={c} type="button" onClick={() => setForm({ ...form, color: c })}
                      style={{ width:28, height:28, borderRadius:'50%', background:c, border: form.color === c ? '3px solid white' : '3px solid transparent', cursor:'pointer' }} />
                  ))}
                </div>
              </div>
              <div style={{ display:'flex', gap:'0.75rem', justifyContent:'flex-end' }}>
                <button type="button" className="ft-btn outline" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="ft-btn">{editGoal ? 'Save Changes' : 'Add Goal'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Goals;
