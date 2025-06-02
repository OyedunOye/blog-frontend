import Image from "next/image";
const Dashboard = () => {
  return (
    <div className="flex flex-col gap-y-4 md:items-center justify-center max-md:-mt-20 w-full h-full px-1">
      <Image
        alt="Group of friends smiling"
        src={"/dashboard.png"}
        height={500}
        width={500}
        className="object-cover"
      />
      <h4>Nothing to see here!!</h4>
      <p className="text-center font-semibold">
        PS: Happiness is making the most of what you have, and riches is making
        the most of what you&apos;ve got
      </p>
    </div>
  );
};

export default Dashboard;
