"use client";
import { useState } from "react";
import Image from "next/image";
import CustomButton from "@/components/atoms/Button/CustomButton";
import EmployeeModal from "@/components/molecules/EmployeeModal/EmployeeModal";
import { EmployeeData } from "@/types/types";
import { useRouter } from "next/navigation";
import CreateEmployee from "@/components/molecules/CreateEmployee/CreateEmployee";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = (employeeData: EmployeeData) => {
    console.log("Submitted Employee Data:", employeeData);
    setIsModalOpen(false);
  };


const handleLinkChange = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
  router.push('/CreateEmploye'); 
};

  return (
    <nav className="h-[100px]">
      <EmployeeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      />

      <div className="mx-auto flex h-full items-center justify-between px-[120px]">
        <div className="cursor-pointer">
          <Image
            src="/imgs/momentum.png"
            alt="Momentum Logo"
            width={210}
            height={38}
          />
        </div>

        <div className="flex items-center gap-10">
          <CustomButton onClick={() => setIsModalOpen(true)}>
            თანამშრომლის შექმნა
          </CustomButton>

          <CustomButton filled onClick={handleLinkChange} href={CreateEmployee}>
            <Image src="/svgs/plus.svg" alt="logo" width={20} height={20} />
            შექმენი ახალი დავალება
          </CustomButton>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
