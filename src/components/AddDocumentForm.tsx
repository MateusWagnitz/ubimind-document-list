import React, { useState } from 'react';

interface Document {
  Title: string;
  Content: string;
  Author: string;
  Date: string;
  Status: string;
}

interface AddDocumentFormProps {
  onAddDocument: (newDocument: Document) => void;
  existingDocuments: Document[];
}

const AddDocumentForm: React.FC<AddDocumentFormProps> = ({ onAddDocument, existingDocuments }) => {
  const [newDocument, setNewDocument] = useState<Document>({
    Title: '',
    Content: '',
    Author: '',
    Date: '',
    Status: 'Draft',
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

    const isDuplicate = existingDocuments.some((doc) => doc.Title === newDocument.Title);
    if (isDuplicate) {
      alert('A document with this title already exists.');
      return;
    }

    onAddDocument(newDocument);

    setNewDocument({
      Title: '',
      Content: '',
      Author: '',
      Date: '',
      Status: 'Draft',
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
