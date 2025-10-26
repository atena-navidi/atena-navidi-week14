import FormModal from "./FormModal";
import ConfirmModal from "./ConfirmModal";
import ContactsList from "./ContactsList";
import ContactActions from "./ContactActions";
import { useContacts } from "./useContacts";

const inputs = [
  { type: "text", name: "name", placeholder: "Name" },
  { type: "text", name: "lastName", placeholder: "Last Name" },
  { type: "email", name: "email", placeholder: "Ali@gmail.com" },
  { type: "number", name: "phone", placeholder: "09xxxxxxxxx" },
];

const Contacts = () => {
  const {
    contact,
    errors,
    query,
    setQuery,
    filteredContacts,
    selectedContacts,
    isFormOpen,
    contactToDelete,
    editingContactId,
    toggleSelect,
    selectAll,
    deselectAll,
    deleteHandler,
    editHandler,
    confirmDelete,
    setIsFormOpen,
    setErrors,
    setContactToDelete,
    closeFormHandler,
    saveHandler,
  } = useContacts();

  return (
    <div>
      {isFormOpen && (
        <FormModal
          title={editingContactId ? "Edit Contact" : "Add Contact"}
          contact={contact}
          inputs={inputs}
          errors={errors}
          onChange={(_, e) => e.preventDefault()}
          onCancel={closeFormHandler}
          onSave={saveHandler}
        />
      )}

      {contactToDelete && (
        <ConfirmModal
          title="Delete Contact"
          message={
            Array.isArray(contactToDelete)
              ? `Delete ${contactToDelete.length} contacts?`
              : `Delete ${contactToDelete.name}?`
          }
          onConfirm={confirmDelete}
          onCancel={() => setContactToDelete(null)}
        />
      )}

      <div className="max-w-lg mx-auto">
        <ContactActions
          query={query}
          setQuery={setQuery}
          selectedContacts={selectedContacts}
          filteredContacts={filteredContacts}
          onSelectAll={() => selectAll(filteredContacts)}
          onDeselectAll={deselectAll}
          onDeleteSelected={() => setContactToDelete(selectedContacts)}
        />

        <ContactsList
          contacts={filteredContacts}
          onDelete={deleteHandler}
          onEdit={editHandler}
          onToggleSelect={toggleSelect}
          selectedContacts={selectedContacts}
        />
      </div>

      <button
        onClick={() => {
          setErrors({});
          setIsFormOpen(true);
        }}
        className="bg-blue-600 text-white rounded-full w-12 h-12 text-2xl flex items-center justify-center fixed bottom-8 right-8 shadow-lg hover:bg-blue-700"
      >
        +
      </button>
    </div>
  );
};

export default Contacts;
