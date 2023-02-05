export function Card({ title, count, img }) {
  return (
    <div className="bg-card shadow-md dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-5 md:h-60 rounded-2xl md:w-780  ">
      <div>
        <h1 className="uppercase font-semibold text-lg p-2">{title}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center mt-5 px-4">
          <div className="flex justify-center">
            <h1 className="text-slate-500 font-semibold text-7xl">{count}</h1>
          </div>
          <div className="flex justify-center">
            <img src={img} className="w-32" alt="delegations" />
          </div>
        </div>
      </div>
    </div>
  );
}
