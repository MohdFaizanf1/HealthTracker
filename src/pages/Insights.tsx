import { useState } from 'react';
import { Download, RotateCcw, TrendingUp } from 'lucide-react';

interface WeeklyData {
  day: string;
  activities: number;
  calories: number;
}

const weeklyData: WeeklyData[] = [
  { day: 'Mon', activities: 3, calories: 850 },
  { day: 'Tue', activities: 4, calories: 1200 },
  { day: 'Wed', activities: 2, calories: 650 },
  { day: 'Thu', activities: 5, calories: 1400 },
  { day: 'Fri', activities: 3, calories: 900 },
  { day: 'Sat', activities: 4, calories: 1100 },
  { day: 'Sun', activities: 2, calories: 700 },
];

function Insights() {
  const [showResetModal, setShowResetModal] = useState(false);

  const maxActivities = Math.max(...weeklyData.map((d) => d.activities));
  const maxCalories = Math.max(...weeklyData.map((d) => d.calories));

  const totalActivities = weeklyData.reduce((sum, d) => sum + d.activities, 0);
  const totalCalories = weeklyData.reduce((sum, d) => sum + d.calories, 0);
  const avgActivities = (totalActivities / weeklyData.length).toFixed(1);
  const avgCalories = Math.round(totalCalories / weeklyData.length);

  const handleDownload = () => {
    const summary = `
FitTrack Pro - Weekly Summary
=============================

Weekly Statistics:
- Total Activities: ${totalActivities}
- Average Activities/Day: ${avgActivities}
- Total Calories Burned: ${totalCalories} kcal
- Average Calories/Day: ${avgCalories} kcal

Daily Breakdown:
${weeklyData.map((d) => `${d.day}: ${d.activities} activities, ${d.calories} kcal`).join('\n')}

Generated on: ${new Date().toLocaleString()}
    `.trim();

    const blob = new Blob([summary], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fittrack-summary-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    localStorage.clear();
    sessionStorage.clear();
    setShowResetModal(false);
    window.location.reload();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-3xl font-bold text-white">Insights & Summary</h2>
        <div className="flex space-x-3">
          <button
            onClick={handleDownload}
            className="flex items-center space-x-2 px-6 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/50"
          >
            <Download className="w-5 h-5" />
            <span>Download Summary</span>
          </button>
          <button
            onClick={() => setShowResetModal(true)}
            className="flex items-center space-x-2 px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all shadow-lg shadow-red-500/50"
          >
            <RotateCcw className="w-5 h-5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-slate-400 text-sm">Total Activities</p>
              <p className="text-2xl font-bold text-white">{totalActivities}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-emerald-500/20 rounded-lg">
              <TrendingUp className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <p className="text-slate-400 text-sm">Avg Activities/Day</p>
              <p className="text-2xl font-bold text-white">{avgActivities}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-orange-500/20 rounded-lg">
              <TrendingUp className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <p className="text-slate-400 text-sm">Total Calories</p>
              <p className="text-2xl font-bold text-white">{totalCalories}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-cyan-500/20 rounded-lg">
              <TrendingUp className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <p className="text-slate-400 text-sm">Avg Calories/Day</p>
              <p className="text-2xl font-bold text-white">{avgCalories}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50">
        <h3 className="text-2xl font-bold text-white mb-6">Weekly Activities</h3>
        <div className="space-y-4">
          {weeklyData.map((data) => (
            <div key={data.day} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-300 font-medium w-12">{data.day}</span>
                <span className="text-slate-400 text-sm">{data.activities} activities</span>
              </div>
              <div className="relative h-8 bg-slate-900/50 rounded-lg overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-blue-400 rounded-lg transition-all duration-1000 ease-out flex items-center justify-end pr-3"
                  style={{ width: `${(data.activities / maxActivities) * 100}%` }}
                >
                  <span className="text-white text-sm font-semibold">{data.activities}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50">
        <h3 className="text-2xl font-bold text-white mb-6">Weekly Calories Burned</h3>
        <div className="space-y-4">
          {weeklyData.map((data) => (
            <div key={data.day} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-300 font-medium w-12">{data.day}</span>
                <span className="text-slate-400 text-sm">{data.calories} kcal</span>
              </div>
              <div className="relative h-8 bg-slate-900/50 rounded-lg overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-orange-500 to-orange-400 rounded-lg transition-all duration-1000 ease-out flex items-center justify-end pr-3"
                  style={{ width: `${(data.calories / maxCalories) * 100}%` }}
                >
                  <span className="text-white text-sm font-semibold">{data.calories}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowResetModal(false)}
          />
          <div className="relative bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full border border-slate-700">
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-4">Reset Dashboard</h3>
              <p className="text-slate-300 mb-6">
                Are you sure you want to reset the dashboard? This will clear all session data and
                reload the page.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={handleReset}
                  className="flex-1 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all shadow-lg shadow-red-500/50"
                >
                  Reset
                </button>
                <button
                  onClick={() => setShowResetModal(false)}
                  className="flex-1 px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Insights;
