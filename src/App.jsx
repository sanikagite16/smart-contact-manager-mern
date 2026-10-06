import { useEffect, useState } from "react";
const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

function App() {
  const [contacts, setContacts] = useState([]);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  // Get contacts from MongoDB
  const fetchContacts = async () => {
    try {
      const response = await fetch(`${API_URL}/api/contacts`);
      const data = await response.json();

      setContacts(data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  // Load contacts when page opens
  useEffect(() => {
    fetchContacts();
  }, []);

  // Add contact
  const addContact = async () => {
    if (!name.trim() || !phone.trim() || !email.trim()) {
      alert("Please fill all fields");
      return;
    }

    const newContact = {
      name,
      phone,
      email,
      category: "Personal",
      favorite: false,
      blocked: false,
      callCount: 0,
      lastCalled: "Never"
    };

    try {
      const response = await fetch(
        `${API_URL}/api/contacts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newContact)
        }
      );

      const savedContact = await response.json();

      setContacts([...contacts, savedContact]);

      setName("");
      setPhone("");
      setEmail("");

      alert("Contact added successfully!");
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  };

  // Delete contact
  const deleteContact = async (id) => {
    try {
      await fetch(
        `${API_URL}/api/contacts/${id}`,
        {
          method: "DELETE"
        }
      );

      setContacts(
        contacts.filter((contact) => contact._id !== id)
      );
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  return (
    <div className="app">

      <h1>Smart Contact Manager</h1>

      <div className="contact-form">

        <input
          type="text"
          placeholder="Contact Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button onClick={addContact}>
          Add Contact
        </button>

      </div>

      <div className="contacts">

        {contacts.map((contact) => (

          <div
            className="contact-card"
            key={contact._id}
          >

            <h3>{contact.name}</h3>

            <p>{contact.phone}</p>

            <p>{contact.email}</p>

            <button
              onClick={() => deleteContact(contact._id)}
            >
              Delete
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default App;