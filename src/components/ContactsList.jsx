const ContactsList = ({
  contacts,
  onDelete,
  onEdit,
  onToggleSelect,
  selectedContacts,
}) => {
  if (contacts.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-10">
        No contacts yet — click <span className="font-semibold">+</span> to add one!
      </p>
    );
  }

  const sortedContacts = [...contacts].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <div className="max-w-lg mx-auto mt-6">
      {sortedContacts.map((item) => (
        <div
          key={item.id}
          className="flex justify-between items-center bg-gray-50 border p-3 rounded-xl mb-2 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={selectedContacts.includes(item.id)}
              onChange={() => onToggleSelect(item.id)}
            />
            <div>
              <h3 className="font-semibold text-gray-800">
                {item.name} {item.lastName}
              </h3>
              <p className="text-sm text-gray-500">{item.email}</p>
              <p className="text-sm text-gray-500">{item.phone}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              className="text-blue-600 hover:underline"
              onClick={() => onEdit(item)}
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(item)}
              className="text-red-600 hover:underline"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactsList;
