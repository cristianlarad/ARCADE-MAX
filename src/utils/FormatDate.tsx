import { Calendar } from "lucide-react";

const FormattedDate = ({ dateString }: { dateString: string | Date }) => {
  const date = new Date(dateString);
  const formattedDate = new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date);

  return (
    <div className="flex items-center text-xs text-muted-foreground">
      <Calendar className="h-3 w-3 mr-1" />
      {formattedDate}
    </div>
  );
};

export default FormattedDate;
