import React from "react";
import Image from "next/image";
import CustomButton from "../Button/CustomButton";

const Navbar = () => {
  return (
    <nav className="h-[100px]">
      <div className="mx-auto flex h-full items-center justify-between px-[120px] font-">
        <div className="cursor-pointer">
          <Image
            src="/imgs/momentum.png"
            alt="Momentum Logo"
            width={210}
            height={38}
          />
        </div>

        <div className="flex items-center gap-10">
          <CustomButton>თანამშრომლის შექმნა</CustomButton>
          <CustomButton filled>
            <Image src="/svgs/plus.svg" alt="logo" width={20} height={20} />
            შექმენი ახალი დავალება
          </CustomButton>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
