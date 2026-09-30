
const BgBoardHero = () => {
  return (
    <>
      <div className="absolute inset-0 -z-20 opacity-[0.035] dark:opacity-[0.08] bg-size-[32px_32px] bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)]" />
      <div className="absolute -right-32 top-8 -z-20 size-[30rem] rounded-full bg-primary/13 blur-[120px]" />
      <div className="absolute -left-40 bottom-0 -z-20 size-[28rem] rounded-full bg-accent/20 blur-[130px]" />
    </>
  );
};

export default BgBoardHero;
