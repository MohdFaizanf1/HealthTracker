import { useState } from 'react';
import DailyWellness from './pages/DailyWellness';
import ActivityLog from './pages/ActivityLog';
import MealPlanner from './pages/MealPlanner';
import Insights from './pages/Insights';
import Navigation from './components/Navigation';

function App() {
  const [currentPage, setCurrentPage] = useState('wellness');

  const renderPage = () => {
    switch (currentPage) {
      case 'wellness':
        return <DailyWellness />;
      case 'activity':
        return <ActivityLog />;
      case 'meals':
        return <MealPlanner />;
      case 'insights':
        return <Insights />;
      default:
        return <DailyWellness />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="container mx-auto px-4 py-8">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
