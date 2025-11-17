import { useEffect, useState } from 'react';
import { Droplets, Flame, Clock, Footprints } from 'lucide-react';
import CircularProgress from '../components/CircularProgress';

interface WellnessData {
  steps: number;
  stepsGoal: number;
  calories: number;
  caloriesGoal: number;
  water: number;
  waterGoal: number;
}

function DailyWellness() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [wellnessData] = useState<WellnessData>({
    steps: 8247,
    stepsGoal: 10000,
    calories: 1842,
    caloriesGoal: 2500,
    water: 6,
    waterGoal: 8,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center space-x-2 text-emerald-400">
          <Clock className="w-6 h-6" />
          <h2 className="text-4xl font-bold">{formatTime(currentTime)}</h2>
        </div>
        <p className="text-slate-400 text-lg">{formatDate(currentTime)}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <Footprints className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">Steps</h3>
            </div>
          </div>
          <CircularProgress
            value={wellnessData.steps}
            max={wellnessData.stepsGoal}
            color="blue"
            label="steps"
          />
        </div>

        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-orange-500/20 rounded-xl">
                <Flame className="w-6 h-6 text-orange-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">Calories</h3>
            </div>
          </div>
          <CircularProgress
            value={wellnessData.calories}
            max={wellnessData.caloriesGoal}
            color="orange"
            label="kcal"
          />
        </div>

        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-cyan-500/20 rounded-xl">
                <Droplets className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">Water</h3>
            </div>
          </div>
          <CircularProgress
            value={wellnessData.water}
            max={wellnessData.waterGoal}
            color="cyan"
            label="glasses"
          />
        </div>
      </div>

      <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 backdrop-blur-lg rounded-2xl p-8 border border-emerald-500/30 shadow-xl">
        <h3 className="text-2xl font-bold text-white mb-4">Daily Summary</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-800/50 rounded-xl p-4">
            <p className="text-slate-400 text-sm mb-1">Steps Progress</p>
            <p className="text-2xl font-bold text-white">
              {Math.round((wellnessData.steps / wellnessData.stepsGoal) * 100)}%
            </p>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-4">
            <p className="text-slate-400 text-sm mb-1">Calories Burned</p>
            <p className="text-2xl font-bold text-white">
              {Math.round((wellnessData.calories / wellnessData.caloriesGoal) * 100)}%
            </p>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-4">
            <p className="text-slate-400 text-sm mb-1">Hydration Goal</p>
            <p className="text-2xl font-bold text-white">
              {Math.round((wellnessData.water / wellnessData.waterGoal) * 100)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DailyWellness;
