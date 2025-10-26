const ConfirmModal = ({ title, message, onConfirm, onCancel }) => {
  return (
    <div
      onClick={onCancel}
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-6 rounded-2xl shadow-lg w-80 text-center"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
        <p className="text-gray-600 mb-6">{message}</p>

        <div className="flex justify-center gap-3">
          <button
            onClick={onCancel}
            className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
