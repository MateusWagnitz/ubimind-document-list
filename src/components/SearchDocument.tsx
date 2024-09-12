import React, { useState, useCallback } from 'react';
import _ from 'lodash';

interface Document {
  Title: string;
  Content: string;
  Author: string;
  Date: string;
  Status: string;
}

interface SearchDocumentProps {
  documents: Document[];
  setFilteredDocuments: (filtered: Document[]) => void;
}

const SearchDocument: React.FC<SearchDocumentProps> = ({ documents, setFilteredDocuments }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const debouncedSearch = useCallback(
    _.debounce((term: string) => {
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
    }, 300),
    [documents, setFilteredDocuments]
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    debouncedSearch(term);
  };

  return (
    <div style={{ paddingBottom: '20px' }}>
      <input
        type="text"
        placeholder="Search documents..."
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ padding: '10px', width: '300px' }}
      />
    </div>
  );
};

export default SearchDocument;
