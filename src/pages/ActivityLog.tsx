import { useState } from 'react';
import { Plus, Sunrise, Sun, Moon, Clock, Flame } from 'lucide-react';
import Modal from '../components/Modal';

interface Activity {
  id: string;
  name: string;
  duration: number;
  calories: number;
  time: string;
  period: 'morning' | 'afternoon' | 'evening';
}

const initialActivities: Activity[] = [
  {
    id: '1',
    name: 'Morning Run',
    duration: 30,
    calories: 350,
    time: '06:30 AM',
    period: 'morning',
  },
  {
    id: '2',
    name: 'Yoga Session',
    duration: 45,
    calories: 180,
    time: '07:30 AM',
    period: 'morning',
  },
  {
    id: '3',
    name: 'Cycling',
    duration: 60,
    calories: 520,
    time: '01:00 PM',
    period: 'afternoon',
  },
  {
    id: '4',
    name: 'Weight Training',
    duration: 50,
    calories: 420,
    time: '06:00 PM',
    period: 'evening',
  },
  {
    id: '5',
    name: 'Evening Walk',
    duration: 25,
    calories: 120,
    time: '08:00 PM',
    period: 'evening',
  },
];

function ActivityLog() {
  const [activities, setActivities] = useState<Activity[]>(initialActivities);
  const [filter, setFilter] = useState<'all' | 'morning' | 'afternoon' | 'evening'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    duration: '',
    calories: '',
    time: '',
    period: 'morning' as Activity['period'],
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const filteredActivities =
    filter === 'all'
      ? activities
      : activities.filter((activity) => activity.period === filter);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Activity name is required';
    }

    if (!formData.duration || parseInt(formData.duration) <= 0) {
      newErrors.duration = 'Duration must be greater than 0';
    }

    if (!formData.calories || parseInt(formData.calories) <= 0) {
      newErrors.calories = 'Calories must be greater than 0';
    }

    if (!formData.time.trim()) {
      newErrors.time = 'Time is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const newActivity: Activity = {
      id: Date.now().toString(),
      name: formData.name,
      duration: parseInt(formData.duration),
      calories: parseInt(formData.calories),
      time: formData.time,
      period: formData.period,
    };

    setActivities([...activities, newActivity]);
    setIsModalOpen(false);
    setShowSuccess(true);
    setFormData({
      name: '',
      duration: '',
      calories: '',
      time: '',
      period: 'morning',
    });
    setErrors({});

    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  const totalCalories = filteredActivities.reduce((sum, activity) => sum + activity.calories, 0);
  const totalDuration = filteredActivities.reduce((sum, activity) => sum + activity.duration, 0);

  const getPeriodIcon = (period: string) => {
    switch (period) {
      case 'morning':
        return <Sunrise className="w-5 h-5 text-yellow-400" />;
      case 'afternoon':
        return <Sun className="w-5 h-5 text-orange-400" />;
      case 'evening':
        return <Moon className="w-5 h-5 text-blue-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-3xl font-bold text-white">Activity Log</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 px-6 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/50"
        >
          <Plus className="w-5 h-5" />
          <span>Add Activity</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-orange-500/20 rounded-lg">
              <Flame className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <p className="text-slate-400 text-sm">Total Calories</p>
              <p className="text-2xl font-bold text-white">{totalCalories} kcal</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <Clock className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-slate-400 text-sm">Total Duration</p>
              <p className="text-2xl font-bold text-white">{totalDuration} mins</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex space-x-2 overflow-x-auto pb-2">
        {(['all', 'morning', 'afternoon', 'evening'] as const).map((period) => (
          <button
            key={period}
            onClick={() => setFilter(period)}
            className={`px-6 py-2 rounded-lg whitespace-nowrap transition-all ${
              filter === period
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/50'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {period.charAt(0).toUpperCase() + period.slice(1)}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filteredActivities.map((activity) => (
          <div
            key={activity.id}
            className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50 hover:border-emerald-500/50 transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {getPeriodIcon(activity.period)}
                <div>
                  <h3 className="text-lg font-semibold text-white">{activity.name}</h3>
                  <p className="text-slate-400 text-sm">{activity.time}</p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="text-right">
                  <p className="text-slate-400 text-xs">Duration</p>
                  <p className="text-white font-semibold">{activity.duration} mins</p>
                </div>
                <div className="text-right">
                  <p className="text-slate-400 text-xs">Calories</p>
                  <p className="text-orange-400 font-semibold">{activity.calories} kcal</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Activity">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Activity Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors"
              placeholder="e.g., Morning Run"
            />
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Duration (minutes)
            </label>
            <input
              type="number"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors"
              placeholder="30"
            />
            {errors.duration && <p className="text-red-400 text-sm mt-1">{errors.duration}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Calories Burned
            </label>
            <input
              type="number"
              value={formData.calories}
              onChange={(e) => setFormData({ ...formData, calories: e.target.value })}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors"
              placeholder="350"
            />
            {errors.calories && <p className="text-red-400 text-sm mt-1">{errors.calories}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Time</label>
            <input
              type="text"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors"
              placeholder="06:30 AM"
            />
            {errors.time && <p className="text-red-400 text-sm mt-1">{errors.time}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Period</label>
            <select
              value={formData.period}
              onChange={(e) =>
                setFormData({ ...formData, period: e.target.value as Activity['period'] })
              }
              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors"
            >
              <option value="morning">Morning</option>
              <option value="afternoon">Afternoon</option>
              <option value="evening">Evening</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/50"
          >
            Add Activity
          </button>
        </form>
      </Modal>

      {showSuccess && (
        <div className="fixed bottom-8 right-8 bg-emerald-500 text-white px-6 py-4 rounded-xl shadow-2xl animate-in slide-in-from-bottom">
          <p className="font-semibold">Activity Added Successfully!</p>
        </div>
      )}
    </div>
  );
}

export default ActivityLog;
