import { CustomButtonProps } from "@/types/propTypes";

const CustomButton = ({ filled = false, className, children }: CustomButtonProps) => {


  return (
    <button
      className={` text-c-grey flex cursor-pointer items-center justify-center rounded-[5px] px-2.5 py-5 ${filled ? "bg-[#8338EC] text-white hover:bg-[#8869b4] active:bg-[#6e4ba0]" : "border border-[#8338EC] hover:bg-[#B588F4] hover:text-white active:bg-[#9157e4]"} ${className}`}
    >
      <span className="flex items-center justify-center gap-1">{children}</span>
    </button>
  );
};
export default CustomButton;
