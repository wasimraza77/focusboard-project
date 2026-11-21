import { CheckSquare, Clock, CheckCircle2 } from "lucide-react";
import { useTasks } from "../providers/TaskProvider";

export default function StatsCards() {
  const { stats } = useTasks();

  const cards = [
    {
      label: "Total tasks",
      value: stats.total,
      subtext: "Across all projects",
      icon: CheckSquare,
      colorClass: "purple",
    },
    {
      label: "In progress",
      value: stats.inProgress,
      subtext: "Currently active tasks",
      icon: Clock,
      colorClass: "blue",
    },
    {
      label: "Completed",
      value: stats.completed,
      subtext: "Done, keep it up!",
      icon: CheckCircle2,
      colorClass: "green",
    },
  ];

  return (
    <section className="overview-stats" aria-label="Task overview statistics">
      {cards.map((card) => (
        <div className="stat-box" key={card.label}>
          <div className={`stat-icon-wrapper ${card.colorClass}`} aria-hidden="true">
            <card.icon size={20} strokeWidth={2.2} />
          </div>
          <span className="stat-label">{card.label}</span>
          <span className="stat-number">{card.value}</span>
          <span className="stat-subtext">{card.subtext}</span>
        </div>
      ))}
    </section>
  );
}
