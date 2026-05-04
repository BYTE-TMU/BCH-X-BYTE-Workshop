export default function ProgressBar({ percent, className = '' }) {
  return (
    <div className={`w-full bg-brand-border rounded-full h-2 overflow-hidden ${className}`}>
      <div
        className="h-full bg-brand-red rounded-full transition-all duration-500"
        style={{ width: `${percent}%` }}
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  )
}
