interface CircularProgressProps {
  value: number;
  max: number;
  color: 'blue' | 'orange' | 'cyan';
  label: string;
}

function CircularProgress({ value, max, color, label }: CircularProgressProps) {
  const percentage = Math.min((value / max) * 100, 100);
  const circumference = 2 * Math.PI * 70;
  const offset = circumference - (percentage / 100) * circumference;

  const colorClasses = {
    blue: 'stroke-blue-400',
    orange: 'stroke-orange-400',
    cyan: 'stroke-cyan-400',
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-48 h-48">
        <svg className="transform -rotate-90 w-48 h-48">
          <circle
            cx="96"
            cy="96"
            r="70"
            stroke="currentColor"
            strokeWidth="12"
            fill="transparent"
            className="text-slate-700"
          />
          <circle
            cx="96"
            cy="96"
            r="70"
            stroke="currentColor"
            strokeWidth="12"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className={`${colorClasses[color]} transition-all duration-1000 ease-out`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold text-white">{value.toLocaleString()}</span>
          <span className="text-sm text-slate-400">/ {max.toLocaleString()}</span>
          <span className="text-xs text-slate-500 mt-1">{label}</span>
        </div>
      </div>
      <div className="w-full bg-slate-700 rounded-full h-2 mt-4 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-out ${
            color === 'blue'
              ? 'bg-blue-400'
              : color === 'orange'
              ? 'bg-orange-400'
              : 'bg-cyan-400'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="text-slate-400 text-sm mt-2">{Math.round(percentage)}% Complete</p>
    </div>
  );
}

export default CircularProgress;
