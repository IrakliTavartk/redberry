import Image from 'next/image'


export default function Home() {

  return (
    <div className="container">
      <h1 className="text-c-grey mt-[38px] ml-[118px] text-[34px] font-semibold">
        დავალების გვერდი
      </h1>

      <div className="flex h-[44px] w-[688px] mt-[100px] ml-[120px] border-gray-300 border-[1px] justify-between rounded-[10px] items-center ">
        <div className='flex ml-[15px] hover:text-purple-700' >
          <h1 className='mr-[5px]'>დეპარტამენტი </h1>
          <Image src="/svgs/icon.jpg" alt="" width={20} height={20} />
        </div>
        <div className='flex justify-center  hover:text-purple-700' >
          <h1 className='mr-[5px]'> პრიორიტეტი  </h1>
          <Image src="/svgs/icon.jpg" alt="" width={20} height={20} />
        </div>
        <div className='flex mr-[15px]  hover:text-purple-700'>
          <h1 className='mr-[5px] text-[16px]'>თანამშრომელი </h1>
          <Image src="/svgs/icon.jpg" alt="" width={20} height={20}  />
        </div>
      </div>
    </div>
  );
}
