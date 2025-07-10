import DropdownIcon from "../../../public/svgs/svgComponents/DropdownIcon";

const FilterDropdown = () => {
  return (
    <div className="flex w-[688px] items-center justify-between gap-[45px] rounded-[10px] border-[1px] border-[#DEE2E6] px-6 py-4">
      <div className="group hover:text-c-purple flex cursor-pointer gap-4">
        <span>დეპარტამენტი </span>
        <DropdownIcon />
      </div>
      <div className="group hover:text-c-purple flex cursor-pointer gap-4">
        <span>პრიორიტეტი</span>
        <DropdownIcon />
      </div>
      <div className="group hover:text-c-purple flex cursor-pointer gap-4">
        <span>თანამშრომელი </span>
        <DropdownIcon />
      </div>
    </div>
  );
};

export default FilterDropdown;
