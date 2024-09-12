import React from 'react';

interface DeleteDocumentProps {
  documentIndex: number;
  documents: any[];
  setDocuments: (updatedDocuments: any[]) => void;
  setFilteredDocuments: (updatedDocuments: any[]) => void;
}

const DeleteDocument: React.FC<DeleteDocumentProps> = ({
  documentIndex,
  documents,
  setDocuments,
  setFilteredDocuments,
}) => {
  const handleDelete = () => {
    const updatedDocuments = documents.filter((_, index) => index !== documentIndex);
    
    setDocuments(updatedDocuments);
    setFilteredDocuments(updatedDocuments);
  };

  return (
    <button onClick={handleDelete} style={{ marginLeft: '10px', color: 'red' }}>
      Delete
    </button>
  );
};

export default DeleteDocument;
