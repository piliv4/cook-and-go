const Body = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-background  min-h-[calc(100vh-60px)]">
      <div className="mx-[36px] pt-6 ">{children}</div>
    </div>
  );
};
export default Body;
