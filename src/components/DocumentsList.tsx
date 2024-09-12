import React, { useState, useEffect } from 'react';
import documentsData from '../data/documents.json';
import _ from 'lodash';
import AddDocumentForm from './AddDocumentForm';
import EditDocumentForm from './EditDocumentForm';
import DeleteDocument from './DeleteDocument';
import SearchDocument from './SearchDocument';

interface Document {
  Title: string;
  Content: string;
  Author: string;
  Date: string;
  Status: string;
}

const DocumentsList: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>([]);

  useEffect(() => {
    setDocuments(documentsData.Documents);
    setFilteredDocuments(documentsData.Documents);
  }, []);


  return (
    <div className='container'>
      <h1>Document List</h1>
      
        {/* Add */}
        <div style={{ paddingBottom: '30px' }}>
        <AddDocumentForm
          documents={documents}
          setDocuments={setDocuments}
          setFilteredDocuments={setFilteredDocuments}
        />
        </div>

        {/* Search Bar */}
        <SearchDocument
          documents={documents}
          setFilteredDocuments={setFilteredDocuments}
        />
        
        {/* List */}
        <ul>
        {filteredDocuments.map((doc, index) => (
          <li key={index}>
            <h3>{doc.Title}</h3>
            <p>{doc.Content}</p>
            <p><strong>Author:</strong> {doc.Author}</p>
            <p><strong>Date:</strong> {doc.Date}</p>
            <p><strong>Status:</strong> {doc.Status}</p>

            {/* Delete */}
            <DeleteDocument
              documentIndex={index}
              documents={documents}
              setDocuments={setDocuments}
              setFilteredDocuments={setFilteredDocuments}
            />

            {/* Edit */}
            <EditDocumentForm
              document={doc}
              documents={documents}
              setDocuments={setDocuments}
              setFilteredDocuments={setFilteredDocuments}
              documentIndex={index}
            />
          </li>
        ))}
      </ul>

    </div>
  );
};

export default DocumentsList;
