export default function SimpleModal({ onClose }: any) {
  return (
    <div className="fixed inset-0 z-[50] overflow-auto bg-stone-900 bg-opacity-80 flex">
      <div className="relative p-8 bg-black w-full max-w-md m-auto flex-col flex rounded-lg">
        <span className="absolute top-0 right-0 p-4">
          <button onClick={onClose}>×</button>
        </span>
        <div className="">HELLO</div>
      </div>
    </div>
  );
}
