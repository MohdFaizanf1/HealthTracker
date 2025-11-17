import { useState } from 'react';
import { Plus, Trash2, Coffee, Utensils, Moon as MoonIcon } from 'lucide-react';
import Modal from '../components/Modal';

interface Meal {
  id: string;
  name: string;
  calories: number;
}

interface MealCategory {
  breakfast: Meal[];
  lunch: Meal[];
  dinner: Meal[];
}

const initialMeals: MealCategory = {
  breakfast: [
    { id: '1', name: 'Oatmeal with Berries', calories: 320 },
    { id: '2', name: 'Greek Yogurt', calories: 150 },
    { id: '3', name: 'Whole Grain Toast', calories: 140 },
  ],
  lunch: [
    { id: '4', name: 'Grilled Chicken Salad', calories: 420 },
    { id: '5', name: 'Quinoa Bowl', calories: 380 },
    { id: '6', name: 'Brown Rice', calories: 220 },
  ],
  dinner: [
    { id: '7', name: 'Salmon with Vegetables', calories: 520 },
    { id: '8', name: 'Sweet Potato', calories: 180 },
    { id: '9', name: 'Steamed Broccoli', calories: 80 },
  ],
};

function MealPlanner() {
  const [meals, setMeals] = useState<MealCategory>(initialMeals);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<keyof MealCategory>('breakfast');
  const [formData, setFormData] = useState({ name: '', calories: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const calculateTotalCalories = () => {
    const total =
      [...meals.breakfast, ...meals.lunch, ...meals.dinner].reduce(
        (sum, meal) => sum + meal.calories,
        0
      );
    return total;
  };

  const calculateCategoryCalories = (category: keyof MealCategory) => {
    return meals[category].reduce((sum, meal) => sum + meal.calories, 0);
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Meal name is required';
    }

    if (!formData.calories || parseInt(formData.calories) <= 0) {
      newErrors.calories = 'Calories must be greater than 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddMeal = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const newMeal: Meal = {
      id: Date.now().toString(),
      name: formData.name,
      calories: parseInt(formData.calories),
    };

    setMeals({
      ...meals,
      [selectedCategory]: [...meals[selectedCategory], newMeal],
    });

    setIsModalOpen(false);
    setFormData({ name: '', calories: '' });
    setErrors({});
  };

  const handleRemoveMeal = (category: keyof MealCategory, mealId: string) => {
    setMeals({
      ...meals,
      [category]: meals[category].filter((meal) => meal.id !== mealId),
    });
  };

  const openAddMealModal = (category: keyof MealCategory) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const getCategoryIcon = (category: keyof MealCategory) => {
    switch (category) {
      case 'breakfast':
        return <Coffee className="w-6 h-6" />;
      case 'lunch':
        return <Utensils className="w-6 h-6" />;
      case 'dinner':
        return <MoonIcon className="w-6 h-6" />;
    }
  };

  const getCategoryColor = (category: keyof MealCategory) => {
    switch (category) {
      case 'breakfast':
        return 'yellow';
      case 'lunch':
        return 'orange';
      case 'dinner':
        return 'blue';
    }
  };

  const renderMealCategory = (category: keyof MealCategory, title: string) => {
    const color = getCategoryColor(category);
    const colorClasses = {
      yellow: {
        bg: 'bg-yellow-500/20',
        text: 'text-yellow-400',
        button: 'bg-yellow-500 hover:bg-yellow-600 shadow-yellow-500/50',
        border: 'border-yellow-500/30',
      },
      orange: {
        bg: 'bg-orange-500/20',
        text: 'text-orange-400',
        button: 'bg-orange-500 hover:bg-orange-600 shadow-orange-500/50',
        border: 'border-orange-500/30',
      },
      blue: {
        bg: 'bg-blue-500/20',
        text: 'text-blue-400',
        button: 'bg-blue-500 hover:bg-blue-600 shadow-blue-500/50',
        border: 'border-blue-500/30',
      },
    };

    const colors = colorClasses[color];

    return (
      <div className={`bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-lg rounded-2xl p-6 border ${colors.border}`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className={`p-3 ${colors.bg} rounded-xl`}>
              {getCategoryIcon(category)}
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{title}</h3>
              <p className={`text-sm ${colors.text}`}>
                {calculateCategoryCalories(category)} kcal
              </p>
            </div>
          </div>
          <button
            onClick={() => openAddMealModal(category)}
            className={`p-2 ${colors.button} text-white rounded-lg transition-all shadow-lg`}
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-2">
          {meals[category].map((meal) => (
            <div
              key={meal.id}
              className="flex items-center justify-between bg-slate-900/50 rounded-lg p-4 hover:bg-slate-900/70 transition-all"
            >
              <div>
                <p className="text-white font-medium">{meal.name}</p>
                <p className={`text-sm ${colors.text}`}>{meal.calories} kcal</p>
              </div>
              <button
                onClick={() => handleRemoveMeal(category, meal.id)}
                className="text-slate-400 hover:text-red-400 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
          {meals[category].length === 0 && (
            <p className="text-slate-500 text-center py-4">No meals added yet</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-white">Meal Planner</h2>
      </div>

      <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 backdrop-blur-lg rounded-2xl p-8 border border-emerald-500/30">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">Daily Calorie Intake</h3>
            <p className="text-slate-400">Total calories from all meals</p>
          </div>
          <div className="text-right">
            <p className="text-5xl font-bold text-emerald-400">{calculateTotalCalories()}</p>
            <p className="text-slate-400">kcal</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="bg-slate-900/50 rounded-lg p-4">
            <p className="text-slate-400 text-sm mb-1">Breakfast</p>
            <p className="text-xl font-bold text-yellow-400">
              {calculateCategoryCalories('breakfast')} kcal
            </p>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-4">
            <p className="text-slate-400 text-sm mb-1">Lunch</p>
            <p className="text-xl font-bold text-orange-400">
              {calculateCategoryCalories('lunch')} kcal
            </p>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-4">
            <p className="text-slate-400 text-sm mb-1">Dinner</p>
            <p className="text-xl font-bold text-blue-400">
              {calculateCategoryCalories('dinner')} kcal
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {renderMealCategory('breakfast', 'Breakfast')}
        {renderMealCategory('lunch', 'Lunch')}
        {renderMealCategory('dinner', 'Dinner')}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Meal">
        <form onSubmit={handleAddMeal} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Meal Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors"
              placeholder="e.g., Grilled Chicken"
            />
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Calories (kcal)
            </label>
            <input
              type="number"
              value={formData.calories}
              onChange={(e) => setFormData({ ...formData, calories: e.target.value })}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors"
              placeholder="320"
            />
            {errors.calories && <p className="text-red-400 text-sm mt-1">{errors.calories}</p>}
          </div>

          <div className="bg-slate-900/50 rounded-lg p-4">
            <p className="text-slate-400 text-sm">
              Adding to:{' '}
              <span className="text-white font-semibold capitalize">{selectedCategory}</span>
            </p>
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/50"
          >
            Add Meal
          </button>
        </form>
      </Modal>
    </div>
  );
}

export default MealPlanner;
