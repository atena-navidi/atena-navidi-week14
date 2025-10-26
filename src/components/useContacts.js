import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { initialContacts } from "../data/initialContacts";

const initialContact = { name: "", lastName: "", email: "", phone: "" };


 const getInitialContacts = () => {
  const saved = localStorage.getItem("contacts");

  if (saved) {
    const parsed = JSON.parse(saved);

    
    if (Array.isArray(parsed) && parsed.length === 0) {
      return []; 
    }

    return parsed; 
  }

  
  localStorage.setItem("contacts", JSON.stringify(initialContacts));
  return initialContacts;
};

export const useContacts = () => {
  
  
  const [contacts, setContacts] = useState(getInitialContacts());
  const [contact, setContact] = useState(initialContact);
  const [query, setQuery] = useState("");
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [editingContactId, setEditingContactId] = useState(null);
  const [errors, setErrors] = useState({});
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);

  
  const updateContacts = (newContacts) => {
    setContacts(newContacts);
    localStorage.setItem("contacts", JSON.stringify(newContacts));
  };

  
  const toggleSelect = (id) => {
    setSelectedContacts((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  
  const selectAll = (contactsToSelect) => {
    setSelectedContacts(contactsToSelect.map((c) => c.id));
  };

  
  const deselectAll = () => {
    setSelectedContacts([]);
  };

  
  const changeHandler = (event) => {
    const { name, value } = event.target;
    setContact((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  
  const validateForm = () => {
    const newErrors = {};
    if (!contact.name.trim()) newErrors.name = "Name is required";
    if (!contact.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!contact.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(contact.email))
      newErrors.email = "Invalid email";
    if (!contact.phone.trim()) newErrors.phone = "Phone is required";
    else if (!/^09\d{9}$/.test(contact.phone))
      newErrors.phone = "Must start with 09 and be 11 digits";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  
  const closeFormHandler = () => {
    setIsFormOpen(false);
    setEditingContactId(null);
    setContact(initialContact);
    setErrors({});
  };

  
  const saveHandler = () => {
    if (!validateForm()) return;

    const isDuplicateEmail = contacts.some(
      (c) => c.email === contact.email && c.id !== editingContactId
    );
    const isDuplicatePhone = contacts.some(
      (c) => c.phone === contact.phone && c.id !== editingContactId
    );

    if (isDuplicateEmail) {
      setErrors({ email: "This email already exists" });
      return;
    }

    if (isDuplicatePhone) {
      setErrors({ phone: "This phone already exists" });
      return;
    }

    if (editingContactId) {
      const updatedList = contacts.map((item) =>
        item.id === editingContactId
          ? { ...contact, id: editingContactId }
          : item
      );
      updateContacts(updatedList);
    } else {
      const newContact = { ...contact, id: uuidv4() };
      updateContacts([...contacts, newContact]);
    }

    closeFormHandler();
  };

  
  const editHandler = (contactToEdit) => {
    setErrors({});
    setIsFormOpen(true);
    setEditingContactId(contactToEdit.id);
    setContact(contactToEdit);
  };


  const deleteHandler = (contact) => {
    setContactToDelete(contact);
  };

  
  const confirmDelete = () => {
    const updatedList = contacts.filter((c) =>
      Array.isArray(contactToDelete)
        ? !contactToDelete.includes(c.id)
        : c.id !== contactToDelete.id
    );
    updateContacts(updatedList);
    setSelectedContacts([]);
    setContactToDelete(null);
  };

   
  const filteredContacts = contacts.filter((c) =>
    `${c.name} ${c.lastName} ${c.email} ${c.phone}`
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  return {
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
    changeHandler, 
  };
};
