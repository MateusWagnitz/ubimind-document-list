# Project Title

React Code Challenge

## Description

Create an react front end that will list out items in the Documents.json. Allow a user to add, edit, and delete items. 

Use React state to manage the data.

### Requirements

* Duplicate entries should not be allowed
* Ability to search document list by name
* Ability to add to document list
* Ability to edit a document item
* Ability to delete a document item

### Extra Credit

* Write tests for your components

This challenge is designed to be completed under 2 hours and is intended to see how you structure code and ensure you can follow specs. Our company values and respects the work/home separation so please don't spend a long time trying to solve the problem.


## Application Architecture

The application is divided into several key components, each responsible for handling specific functionality:

1. **SearchDocument**: Handles searching through documents, with a debounce that triggers after 3 characters or a 300ms delay. The search checks across all document fields (e.g., title, content, author, date, status).

2. **AddDocumentForm**: Manages the addition of new documents. The `handleAddDocument` function checks for duplicates before allowing a document to be added.

3. **EditDocumentForm**: Allows users to edit existing documents. It includes handlers for clicking the "Edit" button (`handleEditClick`), updating the input fields (`handleEditChange`), and saving the edits (`handleSaveEdit`).

4. **DeleteDocument**: Handles document deletion with the `handleDelete` function.

### Component Interaction

The flow of data is controlled by React state, passed as props between components. The following diagram illustrates the relationships between the components and how they interact with the initial data from `documents.json`:

![Component Diagram](./path-to-your-image.jpg) (./assets/Arch.jpg)

- The **SearchDocuments** component fetches the initial data from `documents.json` and passes it to the other components for rendering, searching, editing, and deleting documents.
- The **AddDocumentForm**, **EditDocumentForm**, and **DeleteDocument** components work together to maintain the list of documents, ensuring that updates, deletions, and additions are reflected dynamically.