interface StatusCardProps {
  label: string;
  count: number;
  color: 'red' | 'yellow' | 'green';
}

const colorClasses: Record<StatusCardProps['color'], string> = {
  red: 'text-red-600 border-red-300 bg-red-50',
  yellow: 'text-yellow-600 border-yellow-300 bg-yellow-50',
  green: 'text-green-600 border-green-300 bg-green-50',
};

export default function StatusCard({ label, count, color }: StatusCardProps) {
  return (
    <div
      className={`p-6 rounded-lg border flex flex-col items-center justify-center ${colorClasses[color]}`}
    >
      <h2 className="text-lg font-semibold">{label}</h2>
      <p className="text-3xl font-bold mt-2">{count}</p>
    </div>
  );
}
