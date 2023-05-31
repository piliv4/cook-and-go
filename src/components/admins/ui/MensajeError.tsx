const MensajeError = ({ texto }: { texto: string }) => {
  return <p className="text-red-600 min-h-[22px] font-thin">{texto}</p>;
};
export default MensajeError;
