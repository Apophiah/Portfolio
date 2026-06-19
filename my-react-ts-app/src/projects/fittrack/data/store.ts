// ─── Types ───────────────────────────────────────────────────────────────────

export interface WorkoutLog {
  id: string;
  date: string; // YYYY-MM-DD
  type: 'Run' | 'Strength' | 'Cycling' | 'Yoga' | 'Swimming';
  duration: number; // minutes
  calories: number;
  distance?: number; // km
  notes?: string;
}

export interface Goal {
  id: string;
  label: string;
  target: number;
  current: number;
  unit: string;
  color: string;
}

export interface DailySummary {
  date: string;
  steps: number;
  calories: number;
  heartRate: number;
  distance: number; // km
  goalProgress: number; // %
}

// ─── Seed data ────────────────────────────────────────────────────────────────

export const initialWorkouts: WorkoutLog[] = [
  { id: 'w1', date: '2026-06-13', type: 'Run',      duration: 32, calories: 310, distance: 4.2,  notes: 'Morning run' },
  { id: 'w2', date: '2026-06-14', type: 'Strength', duration: 45, calories: 380, notes: 'Strength session' },
  { id: 'w3', date: '2026-06-15', type: 'Cycling',  duration: 50, calories: 420, distance: 18.5, notes: 'Evening ride' },
  { id: 'w4', date: '2026-06-16', type: 'Yoga',     duration: 40, calories: 180, notes: 'Morning yoga' },
  { id: 'w5', date: '2026-06-17', type: 'Run',      duration: 28, calories: 270, distance: 3.8 },
  { id: 'w6', date: '2026-06-18', type: 'Strength', duration: 55, calories: 450, notes: 'Push day' },
  { id: 'w7', date: '2026-06-19', type: 'Run',      duration: 38, calories: 350, distance: 5.1,  notes: 'Long run' },
];

export const initialGoals: Goal[] = [
  { id: 'g1', label: 'Run 5km',         target: 5,   current: 4.2, unit: 'km',       color: '#22c55e' },
  { id: 'g2', label: 'Strength',        target: 3,   current: 2,   unit: 'sessions', color: '#f59e0b' },
  { id: 'g3', label: 'Yoga',            target: 4,   current: 1,   unit: 'sessions', color: '#a855f7' },
  { id: 'g4', label: 'Burn 2000 kcal',  target: 2000,current: 1360,unit: 'kcal',     color: '#ef4444' },
];

export const weeklySteps: { day: string; steps: number }[] = [
  { day: 'Mon', steps: 8200 },
  { day: 'Tue', steps: 10500 },
  { day: 'Wed', steps: 7800 },
  { day: 'Thu', steps: 12100 },
  { day: 'Fri', steps: 9400 },
  { day: 'Sat', steps: 14250 },
  { day: 'Sun', steps: 6300 },
];

export const runningPerformance: { day: string; pace: number }[] = [
  { day: 'Mon', pace: 5.8 },
  { day: 'Tue', pace: 5.5 },
  { day: 'Wed', pace: 6.1 },
  { day: 'Thu', pace: 5.3 },
  { day: 'Fri', pace: 5.6 },
  { day: 'Sat', pace: 5.1 },
  { day: 'Sun', pace: 5.4 },
];

export const weightData: { day: string; weight: number; fat: number }[] = [
  { day: 'Mon', weight: 74.8, fat: 18.2 },
  { day: 'Tue', weight: 74.5, fat: 18.0 },
  { day: 'Wed', weight: 74.6, fat: 17.9 },
  { day: 'Thu', weight: 74.2, fat: 17.7 },
  { day: 'Fri', weight: 74.0, fat: 17.5 },
  { day: 'Sat', weight: 73.8, fat: 17.3 },
  { day: 'Sun', weight: 73.6, fat: 17.1 },
];
