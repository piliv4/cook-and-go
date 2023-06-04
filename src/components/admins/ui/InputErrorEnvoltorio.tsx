import { BsFillExclamationCircleFill } from "react-icons/bs";

export default function InputErrorEnvoltorio({
  children,
  error,
}: {
  children: React.ReactNode;
  error: string;
}) {
  return (
    <div className="flex flex-row pl-1 gap-1 items-center border-[1px] border-primaryGreen bg-white rounded-md overflow-hidden">
      <div className="min-w-[16px]">
        {error && (
          <abbr title={error}>
            <BsFillExclamationCircleFill className="fill-red-500" />
          </abbr>
        )}
      </div>
      {children}
    </div>
  );
}
