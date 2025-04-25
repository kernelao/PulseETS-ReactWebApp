import React, { useState, useEffect, useRef, useContext } from "react";
import welcomeImage from "../../assets/images/welcome-image2.jpg";
import axios from './../../api/Axios';
import "./notes.css";
import { ThemeContext } from "../../context/ThemeContext"; 
import RecompensePopup from "../../components/recompenses/RecompensePopup";
import IMAGES from '/src/assets/badges_recompenses';
import { toast } from "react-toastify";
import { UserContext } from "../../context/UserContext";



const TYPEWRITER_TEXT = "Commencez à organiser vos idées dès maintenant !";

function IntroductionNote() {
  const animatedRef = useRef(null);
  

  useEffect(() => {
    let index = 0;
    let mounted = true;
    const type = () => {
      if (mounted && animatedRef.current && index <= TYPEWRITER_TEXT.length) {
        animatedRef.current.innerText = TYPEWRITER_TEXT.substring(0, index++);
        setTimeout(type, 50);
      }
    };
    type();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="welcome-page">
      <h1>Bienvenue dans votre espace de notes !</h1>
      <p ref={animatedRef} className="animated-text center-text"></p>
      <img src={welcomeImage} alt="Bienvenue" className="welcome-image" />
    </div>
  );
}

export default function NotesApp() {
  const bienvenueFolder = {
    name: "Bienvenue",
    notes: [{ id: 0, title: "Introduction", content: "" }]
  };

  const [folders, setFolders] = useState([]);
  const [selectedNote, setSelectedNote] = useState(bienvenueFolder.notes[0]);
  const [openFolders, setOpenFolders] = useState({ Bienvenue: true });
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [addingCategory, setAddingCategory] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [addingNoteTo, setAddingNoteTo] = useState(null);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [folderOptions, setFolderOptions] = useState(null);
  const [noteOptions, setNoteOptions] = useState(null);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editedNoteTitle, setEditedNoteTitle] = useState("");
  const [editingFolderName, setEditingFolderName] = useState(null);
  const [editedFolderName, setEditedFolderName] = useState("");
  const [popupRecompense, setPopupRecompense] = useState(null);
  const { userData, setUserData } = useContext(UserContext);


  const folderOptionsRef = useRef(null);
  const noteOptionsRef = useRef(null);
  const addCategoryRef = useRef(null);
  const addNoteRef = useRef(null);
  const { theme } = useContext(ThemeContext);
  const themeClass = theme.toLowerCase().replace(' ', '-');


  useEffect(() => {
    async function fetchNotes() {
      try {
        const res = await axios.get("/notes");
        const categorized = {};
        res.data.forEach(note => {
          const category = note.categorie || "Sans Catégorie";
          if (!categorized[category]) categorized[category] = [];
          categorized[category].push({
            id: note.id,
            title: note.titre,
            content: note.contenu || ""
          });
        });
        const foldersArray = Object.entries(categorized).map(([name, notes]) => ({ name, notes }));
        setFolders(foldersArray);
      } catch (err) {
        console.error("Erreur de chargement des notes:", err);
      }
    }
    fetchNotes();
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (folderOptionsRef.current && !folderOptionsRef.current.contains(e.target)) setFolderOptions(null);
      if (noteOptionsRef.current && !noteOptionsRef.current.contains(e.target)) setNoteOptions(null);
      if (addCategoryRef.current && !addCategoryRef.current.contains(e.target)) {
        setAddingCategory(false);
        setNewFolderName("");
      }
      if (addNoteRef.current && !addNoteRef.current.contains(e.target)) {
        setAddingNoteTo(null);
        setNewNoteTitle("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleNoteSelection(note) {
    setSelectedNote(note);
    setHistory([]);
    setHistoryIndex(-1);
  }

  function handleContentChange(e) {
    const newContent = e.target.value;
    if (typingTimeout) clearTimeout(typingTimeout);
    const newTimeout = setTimeout(() => {
      setHistory([...history.slice(0, historyIndex + 1), selectedNote.content]);
      setHistoryIndex(historyIndex + 1);
      axios.put(`/notes/${selectedNote.id}`, {
        contenu: newContent
      });
    }, 1000);
    setTypingTimeout(newTimeout);

    setFolders((prev) =>
      prev.map((folder) => ({
        ...folder,
        notes: folder.notes.map((n) =>
          n.id === selectedNote.id ? { ...n, content: newContent } : n
        )
      }))
    );
    setSelectedNote({ ...selectedNote, content: newContent });
  }

  function handleUndo() {
    if (historyIndex >= 0) {
      const previousContent = history[historyIndex];
      axios.put(`/notes/${selectedNote.id}`, { contenu: previousContent });
      setFolders((prev) =>
        prev.map((folder) => ({
          ...folder,
          notes: folder.notes.map((n) =>
            n.id === selectedNote.id ? { ...n, content: previousContent } : n
          )
        }))
      );
      setSelectedNote({ ...selectedNote, content: previousContent });
      setHistoryIndex(historyIndex - 1);
    }
  }

  function handleAddFolder() {
    const trimmed = newFolderName.trim();
    if (!trimmed || trimmed.toLowerCase() === "bienvenue") return;
    if (folders.some((f) => f.name.toLowerCase() === trimmed.toLowerCase())) return;
    setFolders([...folders, { name: trimmed, notes: [] }]);
    setAddingCategory(false);
    setNewFolderName("");
  }

  function handleAddNote(folderName) {
    const title = newNoteTitle.trim();
    if (!title) return;
    axios.post('/notes', {
      titre: title,
      contenu: "",
      categorie: folderName
    }).then((res) => {
      const newNote = {
        id: res.data.id,
        title: res.data.titre,
        content: res.data.contenu || ""
      };
      setFolders((prev) =>
        prev.map((fold) =>
          fold.name === folderName ? { ...fold, notes: [...fold.notes, newNote] } : fold
        )
      );
      setAddingNoteTo(null);
      setNewNoteTitle("");

      axios.get('/user/profile').then((res) => {
        const nouvelles = res.data.recompenses.filter(r =>
          !(userData?.recompenses ?? []).some(old => old.type === r.type && old.valeur === r.valeur)
        );
  
        nouvelles.forEach(({ type, valeur }) => {
          handleNouvelleRecompense(type, valeur);
        });
  
        setUserData(prev => ({ ...prev, recompenses: res.data.recompenses }));
      });
    });
    
  }

  const handleNouvelleRecompense = (type, valeur) => {
    toast.success(`🎉 Récompense débloquée : ${type} x${valeur} !`);
  
    if (valeur >= 50) {
      const imageMap = {
        'notesAjoutees-50': IMAGES.i50notesAdd,
        'sessionsCompletees-50': IMAGES.i50sessionsComplete,
        'sessionsCompletees-100': IMAGES.i100sessionsComplete,
        'tachesCompletees-50': IMAGES.i50tachesComplete,
        'tachesCompletees-100': IMAGES.i100tachesComplete,
      };
  
      const cle = `${type}-${valeur}`;
      setPopupRecompense({
        image: imageMap[cle],
        description: `Bravo ! Tu as atteint ${valeur} ${type === 'sessionsCompletees' ? 'sessions' : type.replace('Ajoutees', ' ajoutées')}.`,
      });
    }
  };
  
  

//delete
//notes
function handleDeleteNote(folderName, noteId) {
 // console.log("Sending DELETE for noteId:", noteId); 
  axios.delete(`/notes/${noteId}`)
    .then(() => {
      return axios.get("/notes");
    })
    .then((res) => {
      const categorized = {};
      res.data.forEach(note => {
        const category = note.categorie || "Sans Catégorie";
        if (!categorized[category]) categorized[category] = [];
        categorized[category].push({
          id: note.id,
          title: note.titre,
          content: note.contenu || ""
        });
      });
      const foldersArray = Object.entries(categorized).map(([name, notes]) => ({ name, notes }));
      setFolders(foldersArray);

      if (selectedNote?.id === noteId) {
        setSelectedNote(null);
      }
    })
    .catch((err) => {
      console.error("Erreur lors de la suppression de la note:", err);
    });
}



//categories
function handleDeleteCategory(folderName) {
  const notesToDelete = folders.find(f => f.name === folderName)?.notes || [];

  if (!window.confirm(`Supprimer la catégorie "${folderName}" et toutes ses notes ?`)) return;

  Promise.all(notesToDelete.map(note =>
    axios.delete(`/notes/${note.id}`)
  ))
    .then(() => {
      setFolders(prev => prev.filter(f => f.name !== folderName));

      if (selectedNote && notesToDelete.some(n => n.id === selectedNote.id)) {
        setSelectedNote(null);
      }
    })
    .catch((err) => {
      console.error("Erreur lors de la suppression de la catégorie:", err);
    });
}

function handleEditCategoryName(oldName, newName) {
  axios.get("/notes")
    .then((res) => {
      const notesInCategory = res.data.filter(note => note.categorie === oldName);

      return Promise.all(
        notesInCategory.map(note =>
          axios.put(`/notes/${note.id}`, {
            ...note,
            categorie: newName
          })
        )
      );
    })
    .then(() => {
      return axios.get("/notes");
    })
    .then((res) => {
      const categorized = {};
      res.data.forEach(note => {
        const category = note.categorie || "Sans Catégorie";
        if (!categorized[category]) categorized[category] = [];
        categorized[category].push({
          id: note.id,
          title: note.titre,
          content: note.contenu || ""
        });
      });
      const foldersArray = Object.entries(categorized).map(([name, notes]) => ({ name, notes }));
      setFolders(foldersArray);
    })
    .catch(err => {
      console.error("Erreur lors de la modification de la catégorie:", err);
    });
}


function handleEditNoteTitle(noteId, newTitle) {
  axios.put(`/notes/${noteId}`, { titre: newTitle })
    .then(() => axios.get("/notes"))
    .then((res) => {
      const categorized = {};
      res.data.forEach(note => {
        const category = note.categorie || "Sans Catégorie";
        if (!categorized[category]) categorized[category] = [];
        categorized[category].push({
          id: note.id,
          title: note.titre,
          content: note.contenu || ""
        });
      });
      const foldersArray = Object.entries(categorized).map(([name, notes]) => ({ name, notes }));
      setFolders(foldersArray);
    })
    .catch(err => {
      console.error("Erreur lors de la modification du titre:", err);
    });
}



  return (
<div className={`app ${themeClass}`}>
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Notes</h2>
          <button className="add-category-btn" onClick={() => setAddingCategory(true)}>
            +
          </button>
        </div>

        {addingCategory && (
          <div className="add-category-input" ref={addCategoryRef}>
            <input
              type="text"
              placeholder="Nom de la catégorie"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
            />
            <button onClick={handleAddFolder}>✔</button>
          </div>
        )}

        {/* Bienvenue folder  */}
        <div className="folder bienvenue-folder">
          <div className="folder-title" onClick={() => setOpenFolders((prev) => ({ ...prev, Bienvenue: !prev["Bienvenue"] }))}>
            <span>{openFolders["Bienvenue"] ? "▼" : "▶"} Bienvenue</span>
          </div>
          {openFolders["Bienvenue"] && (
            <div className="notes">
              <div
                key={bienvenueFolder.notes[0].id}
                className={"note-item " + (selectedNote?.id === 0 ? "active" : "")}
                onClick={() => handleNoteSelection(bienvenueFolder.notes[0])}

              >
                <span className="note-title">{bienvenueFolder.notes[0].title}</span>
              </div>
            </div>
          )}
        </div>

        {/* Other folders */}
        {folders.map((folder) => {
          const isOpen = !!openFolders[folder.name];
          return (
<React.Fragment key={folder.name}>
<div key={folder.name} className="folder">
              <div className="folder-title" onClick={() =>
                setOpenFolders((prev) => ({ ...prev, [folder.name]: !prev[folder.name] }))
              }>
                {editingFolderName === folder.name ? (
                  <input
                  value={editedFolderName}
                  onChange={(e) => setEditedFolderName(e.target.value)}
                  onBlur={() => {
                    handleEditCategoryName(folder.name, editedFolderName); 
                    setEditingFolderName(null);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleEditCategoryName(folder.name, editedFolderName);
                      setEditingFolderName(null);
                    }
                  }}
                  autoFocus
                />
              ) : (
                <span>{isOpen ? "▼" : "▶"} {folder.name}</span>
              )}

                <div className="folder-actions">
                  <button
                    className="folder-options-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFolderOptions(folderOptions === folder.name ? null : folder.name);
                    }}
                  >
                    ⋮
                  </button>
                  <button
                    className="add-note-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenFolders((prev) => ({ ...prev, [folder.name]: true }));
                      setAddingNoteTo(folder.name);
                    }}
                  >
                    +
                  </button>
                </div>
              </div>

              {folderOptions === folder.name && (
                <div className="folder-options-menu" ref={folderOptionsRef}>
                  <button onClick={() => {
                    setEditedFolderName(folder.name);
                    setEditingFolderName(folder.name);
                    setFolderOptions(null);
                  }}>Modifier</button>
                  
                  <button onClick={() => {
                handleDeleteCategory(folder.name);
                setFolderOptions(null);
                }}>Supprimer</button>

                </div>
              )}

              {isOpen && (
                <div className="notes">
                  {folder.notes.map((note) => (
                    <div
                      key={note.id}
                      className={"note-item " + (selectedNote?.id === note.id ? "active" : "")}
                      onClick={() => handleNoteSelection(note)}

                    >
                      {editingNoteId === note.id ? (
                        <input
                      value={editedNoteTitle}
                    onChange={(e) => setEditedNoteTitle(e.target.value)}
                    onBlur={() => {
                      handleEditNoteTitle(note.id, editedNoteTitle);
                      setEditingNoteId(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleEditNoteTitle(note.id, editedNoteTitle);
                        setEditingNoteId(null);
                      }
                    }}
                    autoFocus
                  />

                      ) : (
                        <span className="note-title">
                        {note.title}
                      </span>
                      )}

                      <button
                        className="note-options-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          setNoteOptions(noteOptions === note.id ? null : note.id);
                        }}
                      >
                        ⋮
                      </button>

                      {noteOptions === note.id && (
                        <div className="note-options-menu" ref={noteOptionsRef}>
                          <button onClick={() => {
                            setEditedNoteTitle(note.title);
                            setEditingNoteId(note.id);
                            setNoteOptions(null);
                          }}>Modifier</button>


            <button
            onClick={(e) => {
          e.stopPropagation(); 
        //  console.log("Clicked delete:", note.id); 

          handleDeleteNote(folder.name, note.id);
          }}
          >
          Supprimer
        </button>


                        </div>
                      )}
                    </div>
                  ))}

                  {addingNoteTo === folder.name && (
                    <div className="add-note-input" ref={addNoteRef}>
                      <input
                        type="text"
                        placeholder="Titre de la note"
                        value={newNoteTitle}
                        onChange={(e) => setNewNoteTitle(e.target.value)}
                      />
                      <button onClick={() => handleAddNote(folder.name)}>✔</button>
                    </div>
                  )}
                </div>
              )}
            </div>
            </React.Fragment>
          );
        })}
      </div>

      <div className="editor">
        {selectedNote ? (
          selectedNote.id === 0 ? <IntroductionNote /> : (
            <>
              <h1 className="note-title-input">{selectedNote.title}</h1>
              <hr className="separator" />
              <div className="text-area-container">
                <textarea value={selectedNote.content} onChange={handleContentChange} />
                <button className="undo-btn" onClick={handleUndo} disabled={historyIndex < 0}>
                  ↩ Undo
                </button>
              </div>
              
            </>
          )
        ) : (
          <p className="no-note">Sélectionne une note</p>
        )}
      </div>
      <RecompensePopup recompense={popupRecompense} onClose={() => setPopupRecompense(null)} />
    </div>
  );
}