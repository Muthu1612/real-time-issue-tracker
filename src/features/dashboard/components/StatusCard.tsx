interface StatusCardProps {
  label: string;
  count: number;
  color: 'red' | 'blue' | 'green';
}

const colorClasses: Record<StatusCardProps['color'], string> = {
  red: 'border-red-500/30 bg-red-500/10',
  blue: 'border-sapphire-500/30 bg-sapphire-500/10',
  green: 'border-green-500/30 bg-green-500/10',
};

const textColorClasses: Record<StatusCardProps['color'], string> = {
  red: 'text-red-400',
  blue: 'text-sapphire-400',
  green: 'text-green-400',
};

const gradientClasses: Record<StatusCardProps['color'], string> = {
  red: 'from-red-600 to-red-500',
  blue: 'from-sapphire-600 to-sapphire-500',
  green: 'from-green-600 to-green-500',
};

export default function StatusCard({ label, count, color }: StatusCardProps) {
  return (
    <div
      className={`group p-6 rounded-2xl border backdrop-blur-sm hover:scale-105 transition-all duration-300 ${colorClasses[color]}`}
    >
      <div className="flex flex-col items-start justify-between h-full space-y-4">
        <h2 className={`text-lg font-semibold ${textColorClasses[color]}`}>{label}</h2>
        <p className={`text-5xl font-bold bg-gradient-to-r ${gradientClasses[color]} bg-clip-text text-transparent`}>
          {count}
        </p>
      </div>
    </div>
  );
}
