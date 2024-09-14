import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { firebaseAuth } from '../firbase-config';
import { getDatabase, ref, set, push, get, query, orderByChild, equalTo, update } from 'firebase/database';
import Loader from './Loader'; // Import the Loader component

export default function User() {
  const [user, setUser] = useState(undefined);
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState([]);
  const [noteToEdit, setNoteToEdit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [status, setStatus] = useState(''); // Add status state for feedback
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchNotes(currentUser.email);
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const fetchNotes = async (userEmail) => {
    setLoading(true);
    const db = getDatabase();
    const notesRef = ref(db, 'notes');
    const q = query(notesRef, orderByChild('author'), equalTo(userEmail));
    
    try {
      const snapshot = await get(q);
      if (snapshot.exists()) {
        const data = snapshot.val();
        const notesArray = Object.entries(data).map(([id, note]) => ({ id, ...note }));
        setNotes(notesArray);
      } else {
        setNotes([]);
      }
      setStatus('Notes fetched successfully');
    } catch (error) {
      setStatus("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const saveData = async () => {
    if (!user) return;

    const db = getDatabase();
    const newDocRef = push(ref(db, 'notes'));
    try {
      await set(newDocRef, {
        note: note,
        author: user.email
      });
      setStatus("Note added successfully");
      fetchNotes(user.email);
    } catch (error) {
      setStatus("Error: " + error.message);
    }
  };

  const updateNoteInDb = async (noteId, updatedNote) => {
    if (!user) return;

    const db = getDatabase();
    const noteRef = ref(db, `notes/${noteId}`);
    try {
      await update(noteRef, { note: updatedNote });
      setStatus("Note updated successfully");
      fetchNotes(user.email);
    } catch (error) {
      setStatus("Error: " + error.message);
    }
  };

  const handleAddNote = () => {
    if (note.trim()) {
      if (noteToEdit) {
        updateNoteInDb(noteToEdit.id, note);
        setNoteToEdit(null);
      } else {
        saveData();
      }
      setNote('');
    }
  };

  const handleDeleteNote = async (noteId) => {
    if (!user) return;

    setDeleting(true);
    const db = getDatabase();
    const noteRef = ref(db, `notes/${noteId}`);
    try {
      await set(noteRef, null);
      setStatus("Note deleted successfully");
      fetchNotes(user.email);
    } catch (error) {
      setStatus("Error: " + error.message);
    } finally {
      setDeleting(false);
    }
  };

  const handleEditNote = (noteId, currentNote) => {
    setNoteToEdit({ id: noteId, note: currentNote });
    setNote(currentNote);
  };

  return (
    <StyledDiv>
      <button className="sign-out" onClick={() => signOut(firebaseAuth)}>Sign Out</button>
      {(loading || deleting) && <Loader />}
      <div className="content">
        <div className="note-section">
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Enter your note"
          />
          <button onClick={handleAddNote}>
            {noteToEdit ? "Update Note" : "Add Note"}
          </button>
        </div>
        <div className="notes-list">
          {notes.map(({ id, note }, i) => (
            <div key={id} className="note-item">
              <span>{note}</span>
              <div className="note-actions">
                <button onClick={() => handleEditNote(id, note)}>Edit</button>
                <button onClick={() => handleDeleteNote(id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  .sign-out {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background-color: #f57c00;
    border: none;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 0.3rem;
    font-size: 1rem;
    cursor: pointer;
    transition: 0.3s ease-in-out;
    &:hover {
      background-color: #ffa000;
    }
  }

  .content {
    height: 80vh;
    width: 25rem;
    background-color: #2c384a;
    border-radius: 1rem;
    color: white;
    text-align: center;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    overflow-y: auto;

    .note-section {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1rem;
      
      input {
        flex: 1;
        padding: 0.5rem;
        border: none;
        border-radius: 0.3rem;
        margin-right: 0.5rem;
        box-sizing: border-box;
      }
      
      button {
        background-color: #f57c00;
        border: none;
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 0.3rem;
        font-size: 1rem;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        &:hover {
          background-color: #ffa000;
        }
      }
    }

    .notes-list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      overflow-y: auto;
      flex: 1;
      
      .note-item {
        background-color: #1e2a38;
        padding: 0.5rem;
        border-radius: 0.3rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        max-height: 10rem;
        overflow: auto;
        
        span {
          flex: 1;
          white-space: normal;
          word-wrap: break-word;
        }

        .note-actions {
          display: flex;
          gap: 0.5rem;
          justify-content: flex-end;

          button {
            background-color: #f57c00;
            border: none;
            color: white;
            padding: 0.3rem 0.5rem;
            border-radius: 0.3rem;
            font-size: 0.8rem;
            cursor: pointer;
            transition: 0.3s ease-in-out;
            &:hover {
              background-color: #ffa000;
            }
          }
        }
      }
    }
  }
`;
