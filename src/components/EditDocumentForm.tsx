import React from 'react';

interface Document {
  Title: string;
  Content: string;
  Author: string;
  Date: string;
  Status: string;
}

interface EditDocumentFormProps {
  document: Document;
  onEditChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSaveEdit: () => void;
}

const EditDocumentForm: React.FC<EditDocumentFormProps> = ({ document, onEditChange, onSaveEdit }) => {
  return (
    <div style={{ marginTop: '30px' }}>
      <h2>Edit Document</h2>
      <form>
        <input
          type="text"
          name="Title"
          placeholder="Title"
          value={document.Title}
          onChange={onEditChange}
          required
        />
        <input
          type="text"
          name="Content"
          placeholder="Content"
          value={document.Content}
          onChange={onEditChange}
          required
        />
        <input
          type="text"
          name="Author"
          placeholder="Author"
          value={document.Author}
          onChange={onEditChange}
          required
        />
        <input
          type="date"
          name="Date"
          value={document.Date}
          onChange={onEditChange}
          required
        />
        <input
          type="text"
          name="Status"
          placeholder="Status (e.g., Live, Draft, Retracted)"
          value={document.Status}
          onChange={onEditChange}
          required
        />
        <button type="button" onClick={onSaveEdit}>Save</button>
      </form>
    </div>
  );
};

export default EditDocumentForm;
