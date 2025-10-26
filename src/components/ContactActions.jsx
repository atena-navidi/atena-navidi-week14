const ContactActions = ({
  query,
  setQuery,
  selectedContacts,
  filteredContacts,
  onSelectAll,
  onDeselectAll,
  onDeleteSelected,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-2 mb-4">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 rounded-lg flex-1"
      />

      {selectedContacts.length > 0 && (
        <div className="flex gap-2">
          <button
            onClick={onDeleteSelected}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Delete ({selectedContacts.length})
          </button>
          <button
            onClick={onDeselectAll}
            className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
          >
            Deselect All
          </button>
        </div>
      )}

      {selectedContacts.length < filteredContacts.length &&
        filteredContacts.length > 0 && (
          <button
            onClick={onSelectAll}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Select All
          </button>
        )}
    </div>
  );
};

export default ContactActions;
