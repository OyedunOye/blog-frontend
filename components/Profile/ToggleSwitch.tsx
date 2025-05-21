const ToggleSwitch = ({
  defaultChecked,
  pointer,
  onClick,
}: {
  defaultChecked: boolean;
  pointer?: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={`block relative w-12 h-6 rounded-full p-1 ${
        defaultChecked ? "bg-indigo-600" : "bg-gray-400"
      } focus:outline-none ${pointer ? "cursor-pointer" : "cursor-default"}`}
    >
      <span
        className={`block w-4 h-4 rounded-full bg-white shadow-md transform transition-transform ${
          defaultChecked ? "translate-x-[150%]" : ""
        }`}
      />
    </button>
  );
};

export default ToggleSwitch;
