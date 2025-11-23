const DecorativeDots = () => {
  return (
    <>
      {/* Animated decorative dots scattered around */}
      <div className="absolute top-32 left-20 w-4 h-4 rounded-full bg-spark-yellow animate-pulse" />
      <div className="absolute top-48 right-32 w-3 h-3 rounded-full bg-spark-cyan animate-pulse delay-100" />
      <div className="absolute top-96 left-40 w-3 h-3 rounded-full bg-spark-lime animate-pulse delay-200" />
      <div className="absolute bottom-64 right-48 w-4 h-4 rounded-full bg-spark-yellow animate-pulse delay-300" />
      <div className="absolute bottom-96 left-64 w-3 h-3 rounded-full bg-spark-cyan animate-pulse delay-150" />
      <div className="absolute top-1/3 right-20 w-3 h-3 rounded-full bg-spark-lime animate-pulse delay-75" />
      <div className="absolute bottom-48 right-96 w-4 h-4 rounded-full bg-spark-yellow animate-pulse delay-200" />
      <div className="absolute top-2/3 left-32 w-3 h-3 rounded-full bg-spark-cyan animate-pulse delay-100" />
      <div className="absolute bottom-1/3 right-64 w-3 h-3 rounded-full bg-spark-lime animate-pulse delay-300" />
    </>
  );
};

export default DecorativeDots;
