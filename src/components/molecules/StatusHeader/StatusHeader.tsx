import { StatusHeaderProps } from "@/types/propTypes";

const StatusHeader = ({ status }: StatusHeaderProps) => {
  const bgColor = {
    1: "bg-red-400",
    2: "bg-blue-400",
    3: "bg-green-400",
    4: "bg-purple-400",
  };

  return (
    <div
      className={`flex flex-1 items-center justify-center rounded-[10px] py-[15px] ${bgColor[status.id as keyof typeof bgColor]} }`}
    >
      <span className="text-xl font-medium text-white">{status.name}</span>
    </div>
  );
};

export default StatusHeader;
