import { Activity, Apple, BarChart3, Heart } from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

function Navigation({ currentPage, setCurrentPage }: NavigationProps) {
  const navItems = [
    { id: 'wellness', label: 'Wellness', icon: Heart },
    { id: 'activity', label: 'Activity Log', icon: Activity },
    { id: 'meals', label: 'Meal Planner', icon: Apple },
    { id: 'insights', label: 'Insights', icon: BarChart3 },
  ];

  return (
    <nav className="bg-slate-800/50 backdrop-blur-lg border-b border-slate-700/50 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-2">
            <Heart className="w-8 h-8 text-emerald-400" />
            <h1 className="text-2xl font-bold text-white">FitTrack Pro</h1>
          </div>

          <div className="flex space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                    currentPage === item.id
                      ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/50'
                      : 'text-slate-300 hover:bg-slate-700/50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="hidden sm:inline">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
