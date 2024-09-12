import React, { useState } from 'react';

interface Document {
  Title: string;
  Content: string;
  Author: string;
  Date: string;
  Status: string;
}

interface AddDocumentFormProps {
  documents: Document[];
  setDocuments: (updatedDocuments: Document[]) => void;
  setFilteredDocuments: (updatedDocuments: Document[]) => void;
}

const AddDocumentForm: React.FC<AddDocumentFormProps> = ({ documents, setDocuments, setFilteredDocuments }) => {
  const [newDocument, setNewDocument] = useState<Document>({
    Title: '',
    Content: '',
    Author: '',
    Date: '',
    Status: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewDocument((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddDocument = () => {
    if (!newDocument.Title || !newDocument.Content || !newDocument.Author || !newDocument.Date || !newDocument.Status) {
      alert('Fill the missing fields!');
      return;
    }

    const isDuplicate = documents.some((doc) => doc.Title === newDocument.Title);
    if (isDuplicate) {
      alert('A document with this title already exists.');
      return;
    }

    const updatedDocuments = [...documents, newDocument];
    setDocuments(updatedDocuments);
    setFilteredDocuments(updatedDocuments); 

    setNewDocument({
      Title: '',
      Content: '',
      Author: '',
      Date: '',
      Status: '',
    });
  };

  return (
    <div>
      <h2>Add New Document</h2>
      <form>
        <input
          type="text"
          name="Title"
          placeholder="Title"
          value={newDocument.Title}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="Content"
          placeholder="Content"
          value={newDocument.Content}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="Author"
          placeholder="Author"
          value={newDocument.Author}
          onChange={handleInputChange}
          required
        />
        <input
          type="date"
          name="Date"
          value={newDocument.Date}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="Status"
          placeholder="Status (e.g., Live, Draft, Retracted)"
          value={newDocument.Status}
          onChange={handleInputChange}
          required
        />
        <button type="button" onClick={handleAddDocument}>
          Add Document
        </button>
      </form>
    </div>
  );
};

export default AddDocumentForm;
