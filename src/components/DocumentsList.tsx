import React, { useState, useEffect, useCallback } from 'react';
import documentsData from '../data/documents.json';
import _ from 'lodash';
import AddDocumentForm from './AddDocumentForm';
import EditDocumentForm from './EditDocumentForm';
import DeleteDocument from './DeleteDocument';

interface Document {
  Title: string;
  Content: string;
  Author: string;
  Date: string;
  Status: string;
}

const debouncedSearch = _.debounce((term: string, searchDocuments: (term: string) => void) => {
    searchDocuments(term);
  }, 300);

const DocumentsList: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>([]);
  const [editingDocument, setEditingDocument] = useState<Document | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  useEffect(() => {
    setDocuments(documentsData.Documents);
    setFilteredDocuments(documentsData.Documents);
  }, []);

const searchDocuments = useCallback((term: string) => {
    if (term.length < 3) {
      setFilteredDocuments(documents);
      return;
    }

    const filtered = documents.filter((doc) =>
      Object.values(doc).some((value) =>
        value.toLowerCase().includes(term.toLowerCase())
      )
    );
    setFilteredDocuments(filtered);
  }, [documents]);

const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    debouncedSearch(term, searchDocuments);
 };

const handleAddDocument = (newDocument: Document) => {
    const updatedDocuments = [...documents, newDocument];
    setDocuments(updatedDocuments);
    setFilteredDocuments(updatedDocuments);
  };

const handleEditClick = (doc: Document, index: number) => {
    setEditingDocument({ ...doc });
    setEditIndex(index);
  };

const handleSaveEdit = () => {
    if (editIndex !== null && editingDocument) {
      const updatedDocuments = [...documents];
      updatedDocuments[editIndex] = editingDocument;
      setDocuments(updatedDocuments);
      setFilteredDocuments(updatedDocuments);
      setEditingDocument(null);
      setEditIndex(null);
    }
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editingDocument) {
      const { name, value } = e.target;
      setEditingDocument({ ...editingDocument, [name]: value });
    }
  };


  return (
    <div>
      <h1>Document List</h1>
      
        {/* Add */}
        <div style={{ paddingBottom: '30px' }}>
        <AddDocumentForm onAddDocument={handleAddDocument} existingDocuments={documents} />
        </div>

        {/* Search Bar */}
        <div style={{ paddingBottom: '20px' }}>
        <input
        type="text"
        placeholder="Search documents..."
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ padding: '15px', width: '300px' }}
        />
        </div>
        
        {/* List */}
        <ul>
        {filteredDocuments.map((doc, index) => (
          <li key={index}>
            <h3>{doc.Title}</h3>
            <p>{doc.Content}</p>
            <p><strong>Author:</strong> {doc.Author}</p>
            <p><strong>Date:</strong> {doc.Date}</p>
            <p><strong>Status:</strong> {doc.Status}</p>
            <button onClick={() => handleEditClick(doc, index)}>Edit</button>

            {/* Delete */}
            <DeleteDocument
              documentIndex={index}
              documents={documents}
              setDocuments={setDocuments}
              setFilteredDocuments={setFilteredDocuments}
            />

            {/* Edit */}
            {editIndex === index && editingDocument && (
              <EditDocumentForm
                document={editingDocument}
                onEditChange={handleEditChange}
                onSaveEdit={handleSaveEdit}
              />
            )}
          </li>
        ))}
      </ul>

    </div>
  );
};

export default DocumentsList;
