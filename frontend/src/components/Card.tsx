interface CardProps {
  title?: string;
  children: React.ReactNode;
}

export default function Card({ title, children }: CardProps) {
  return (
    <div className="border border-sapphire-800/30 rounded-2xl bg-gray-900/40 backdrop-blur-sm p-6 hover:border-sapphire-700/50 transition-all">
      {title && <h2 className="text-2xl font-bold text-white mb-6">{title}</h2>}
      {children}
    </div>
  );
}
