interface time {
  time: string;
}

const SmallTimeTag: React.FC<time> = ({ time }) => {
  return (
    <div
      className={`flex justify-center not-last:text-primary text-[10px] font-light px-[4px] py-[2px] rounded-[16px] ${
        time === "24h" ? " bg-(--primary-red)" : " bg-white"
      }`}
    >
      {time} <img className="pl-[4px]" src="src/assets/images/Time.png"></img>
    </div>
  );
};

export default SmallTimeTag;
