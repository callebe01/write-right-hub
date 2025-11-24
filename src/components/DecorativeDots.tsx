const DecorativeDots = () => {
  return (
    <>
      {/* Animated decorative dots scattered around - matching Figma positions */}
      {/* Yellow dots */}
      <div className="absolute top-[92px] left-[99px] w-[13px] h-[13px] rounded-full bg-spark-dot-yellow animate-pulse" />
      <div className="absolute top-[378px] left-[99px] w-[13px] h-[13px] rounded-full bg-spark-dot-yellow animate-pulse delay-100" />
      <div className="absolute top-[663px] right-[126px] w-[13px] h-[13px] rounded-full bg-spark-dot-yellow animate-pulse delay-200" />
      <div className="absolute top-[552px] left-[99px] w-[13px] h-[13px] rounded-full bg-spark-dot-yellow animate-pulse delay-150" />
      <div className="absolute bottom-[99px] left-[1250px] w-[13px] h-[13px] rounded-full bg-spark-dot-yellow animate-pulse delay-300" />
      <div className="absolute bottom-[119px] left-[880px] w-[13px] h-[13px] rounded-full bg-spark-dot-yellow animate-pulse delay-75" />
      <div className="absolute bottom-[86px] left-[707px] w-[13px] h-[13px] rounded-full bg-spark-dot-yellow animate-pulse delay-200" />
      <div className="absolute bottom-[145px] left-[476px] w-[13px] h-[13px] rounded-full bg-spark-dot-yellow animate-pulse delay-100" />
      <div className="absolute bottom-[160px] left-[163px] w-[13px] h-[13px] rounded-full bg-spark-dot-yellow animate-pulse delay-300" />

      {/* Cyan dots */}
      <div className="absolute top-[128px] left-[57px] w-[13px] h-[13px] rounded-full bg-spark-dot-cyan animate-pulse delay-100" />
      <div className="absolute bottom-[188px] left-[683px] w-[13px] h-[13px] rounded-full bg-spark-dot-cyan animate-pulse delay-200" />
      <div className="absolute top-[607px] left-[157px] w-[13px] h-[13px] rounded-full bg-spark-dot-cyan animate-pulse delay-150" />
      <div className="absolute bottom-[219px] right-[219px] w-[13px] h-[13px] rounded-full bg-spark-dot-cyan animate-pulse delay-300" />
      <div className="absolute bottom-[132px] left-[1010px] w-[13px] h-[13px] rounded-full bg-spark-dot-cyan animate-pulse delay-75" />
      <div className="absolute bottom-[132px] left-[350px] w-[13px] h-[13px] rounded-full bg-spark-dot-cyan animate-pulse delay-200" />
      <div className="absolute bottom-[295px] left-[63px] w-[13px] h-[13px] rounded-full bg-spark-dot-cyan animate-pulse delay-100" />
      <div className="absolute bottom-[132px] left-[591px] w-[13px] h-[13px] rounded-full bg-spark-dot-cyan animate-pulse delay-300" />
      <div className="absolute top-[539px] right-[156px] w-[13px] h-[13px] rounded-full bg-spark-dot-cyan animate-pulse delay-150" />
    </>
  );
};

export default DecorativeDots;
