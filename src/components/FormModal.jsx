//FormModal.jsx

const FormModal = ({ title, contact, inputs, errors, onChange, onCancel, onSave }) => {
  return (
    <div
      onClick={onCancel}
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-6 rounded-2xl shadow-lg w-96"
      >
        <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">
          {title}
        </h2>

        {inputs.map((input, index) => (
          <div key={index} className="mb-3">
            <input
              type={input.type}
              placeholder={input.placeholder}
              name={input.name}
              value={contact[input.name]}
              onChange={onChange}
              className={`border p-2 w-full rounded-lg ${
                errors[input.name] ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors[input.name] && (
              <p className="text-red-500 text-sm mt-1">{errors[input.name]}</p>
            )}
          </div>
        ))}

        <div className="flex justify-end gap-2">
          <button onClick={onCancel} className="bg-gray-200 px-4 py-2 rounded-lg">
            Cancel
          </button>
          <button onClick={onSave} className="bg-blue-600 text-white px-4 py-2 rounded-lg">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormModal;   



