const ContactSearch = ({ query, onChange }) => (
  <input
    type="text"
    placeholder="Search..."
    value={query}
    onChange={(e) => onChange(e.target.value)}
    className="border p-2 rounded-lg w-full mb-4"
  />
);

export default ContactSearch;
