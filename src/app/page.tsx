import FilterDropdown from "@/components/FilterDropdown/FilterDropdown";

export default function Home() {
  return (
    <div>
      <div className="container px-[120px] flex flex-col gap-20">

        <h1 className="text-c-grey mt-[38px] text-[34px] font-semibold">
          დავალების გვერდი
        </h1>

        <FilterDropdown />
      </div>
    </div>
  );
}
