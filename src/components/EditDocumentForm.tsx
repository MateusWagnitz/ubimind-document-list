import React, { useState, useEffect } from 'react';

interface Document {
  Title: string;
  Content: string;
  Author: string;
  Date: string;
  Status: string;
}

interface EditDocumentFormProps {
  document: Document;
  documents: Document[];
  setDocuments: (updatedDocuments: Document[]) => void;
  setFilteredDocuments: (updatedDocuments: Document[]) => void;
  documentIndex: number;
}

const EditDocumentForm: React.FC<EditDocumentFormProps> = ({
  document,
  documents,
  setDocuments,
  setFilteredDocuments,
  documentIndex
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingDocument, setEditingDocument] = useState<Document>(document);

  useEffect(() => {
    setEditingDocument(document);
  }, [document]);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditingDocument((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = () => {
    const updatedDocuments = [...documents];
    updatedDocuments[documentIndex] = editingDocument;
    setDocuments(updatedDocuments);
    setFilteredDocuments(updatedDocuments);
    setIsEditing(false);
  };

  return (
    <div style={{ marginTop: '30px' }}>
      <button onClick={handleEditClick}>
        {isEditing ? 'Cancel' : 'Edit'}
      </button>

      {isEditing && (
        <form>
          <input
            type="text"
            name="Title"
            placeholder="Title"
            value={editingDocument.Title}
            onChange={handleEditChange}
            required
          />
          <input
            type="text"
            name="Content"
            placeholder="Content"
            value={editingDocument.Content}
            onChange={handleEditChange}
            required
          />
          <input
            type="text"
            name="Author"
            placeholder="Author"
            value={editingDocument.Author}
            onChange={handleEditChange}
            required
          />
          <input
            type="date"
            name="Date"
            value={editingDocument.Date}
            onChange={handleEditChange}
            required
          />
          <input
            type="text"
            name="Status"
            placeholder="Status (e.g., Live, Draft, Retracted)"
            value={editingDocument.Status}
            onChange={handleEditChange}
            required
          />
          <button type="button" onClick={handleSaveEdit}>
            Save
          </button>
        </form>
      )}
    </div>
  );
};

export default EditDocumentForm;
