const CabeceraPagina = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[60%_20%_20%] w-full pb-1 sm:pb-3 border-primaryGreen border-double border-b-4 ">
      {children}
    </div>
  );
};
export default CabeceraPagina;
