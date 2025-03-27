import { useState, useEffect, useRef } from "react";
import welcomeImage from "../../assets/images/welcome-image2.jpg";
import "./notes.css";


//Page introduction
const WelcomePage = () => {
  const animatedRef = useRef(null);

  useEffect(() => {
    const text = "Commencez à organiser vos idées dès maintenant !";
    let index = 0;

    const type = () => {
      if (animatedRef.current && index <= text.length) {
        animatedRef.current.innerText = text.substring(0, index++); //affiche lettre  graduellement
        setTimeout(type, 50);
      }
    };

    type();
  }, []);

const Notes = () => {
  return <div>Notes</div>
}
  return (
    <div className="welcome-page">
      <h1>Bienvenue dans votre espace de notes !</h1>
      <p ref={animatedRef} className="animated-text"></p>
      <img
        src={welcomeImage} alt="Bienvenue" className="welcome-image"
      />
    </div>
  );
};

const NotesApp = () => {
  //Categorie Bienvenue set 
  const bienvenueFolder = {
    name: "Bienvenue",
    notes: [{id: 0,title: "Introduction",content:""}],
  };

  //Notes enregistres
  const loadNotes = () => {
    const savedNotes = localStorage.getItem("notesData");
    return savedNotes ? JSON.parse(savedNotes) : []; //Convertir en JS si note existe
  };

  const [folders, setFolders] = useState(loadNotes); 
  const [selectedNote, setSelectedNote] = useState(bienvenueFolder.notes[0]); //note que tu edit actuellement
  const [openFolders, setOpenFolders] = useState({ Bienvenue: true });
  const [history, setHistory] = useState([]); //pour UNDO
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [newFolderName, setNewFolderName] = useState("");
  const [addingCategory, setAddingCategory] = useState(false);
  const [addingNoteTo, setAddingNoteTo] = useState(null);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [folderOptions, setFolderOptions] = useState(null);
  const [editingFolderName, setEditingFolderName] = useState(null);
  const [editedFolderName, setEditedFolderName] = useState("");
  const [noteOptions, setNoteOptions] = useState(null);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editedNoteTitle, setEditedNoteTitle] = useState("");

  // Refs pour menu et input
  const folderOptionsRef = useRef(null);
  const noteOptionsRef = useRef(null);
  const addCategoryRef = useRef(null);
  const addNoteRef = useRef(null);

  //La sauvegarde des donnees pour folders
  useEffect(() => {
    localStorage.setItem("notesData", JSON.stringify(folders));}, [folders]);

  //  Clique exterieure (menu)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        folderOptionsRef.current &&
        !folderOptionsRef.current.contains(event.target)
      ) {
        setFolderOptions(null);
      }

      if (
        noteOptionsRef.current &&
        !noteOptionsRef.current.contains(event.target)
      ) {
        setNoteOptions(null);
      }

      if (
        addCategoryRef.current &&
        !addCategoryRef.current.contains(event.target)
      ) {
        setAddingCategory(false);
        setNewFolderName("");
      }

      if (
        addNoteRef.current &&
        !addNoteRef.current.contains(event.target)
      ) {
        setAddingNoteTo(null);
        setNewNoteTitle("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside); //si on clique dehors
    return () => {document.removeEventListener("mousedown", handleClickOutside);};
  }, []);

  const handleNoteSelection = (note) => {
    setSelectedNote(note);
    setHistory([]);
    setHistoryIndex(-1);
  };

  const handleContentChange = (e) => {
    const newContent = e.target.value;
    
    if (typingTimeout) clearTimeout(typingTimeout);

    const newTimeout = setTimeout(() => {
      setHistory([...history.slice(0, historyIndex + 1), selectedNote.content]); //garde contenu avant changement 
      setHistoryIndex(historyIndex + 1);
    }, 1000);

    setTypingTimeout(newTimeout);

    //mettre a jour contenu de la note
    setFolders((prevFolders) =>
      prevFolders.map((folder) => ({
        ...folder,
        notes: folder.notes.map((note) =>
          note.id === selectedNote.id ? { ...note, content: newContent } : note
        ),
      }))
    );

    setSelectedNote({ ...selectedNote, content: newContent });
  };

  const handleUndo = () => {
    if (historyIndex >= 0) {
      const previousContent = history[historyIndex];
      setFolders((prevFolders) =>
        prevFolders.map((folder) => ({
          ...folder,
          notes: folder.notes.map((note) =>
            note.id === selectedNote.id ? { ...note, content: previousContent } : note
          ),
        }))
      );
      setSelectedNote({ ...selectedNote, content: previousContent });
      setHistoryIndex(historyIndex - 1);
    }
  };

  const handleAddFolder = () => {
    if (
      newFolderName.trim() !== "" &&
      newFolderName !== "Bienvenue" &&
      !folders.find((f) => f.name === newFolderName)
    ) {
      setFolders([{ name: newFolderName, notes: [] }, ...folders]);
      setNewFolderName("");
      setAddingCategory(false);
    }
  };

  const handleAddNote = (folderName) => {
    if (newNoteTitle.trim() !== "") {
      const newNote = { id: Date.now(), title: newNoteTitle, content: "" };
      setFolders((prevFolders) =>
        prevFolders.map((folder) =>
          folder.name === folderName ? { ...folder, notes: [...folder.notes, newNote] } : folder
        )
      );
      setNewNoteTitle("");
      setAddingNoteTo(null);
    }
  };

  
  return (
    //Sidebar
    <div className="app">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Notes</h2>
          <button className="add-category-btn" onClick={() => setAddingCategory(true)}>
            +
          </button>
        </div>

    {/* Fichiers */}
  <div className="folder">
      <div className="folder-title">Bienvenue</div>
      <div className="notes">
      <div
      className={`note-item ${selectedNote?.id === bienvenueFolder.notes[0]?.id ? "active" : ""}`}
      onClick={() => handleNoteSelection(bienvenueFolder.notes[0])}
      >
      {bienvenueFolder.notes[0]?.title} 
    </div>
    </div>
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

    {/*Si dossier existant*/}
        {folders.map((folder) => (
          <div key={folder.name} className="folder">
        <div
        className="folder-title"
        onClick={() =>setOpenFolders({ ...openFolders, [folder.name]: !openFolders[folder.name] })}
        >

  {editingFolderName === folder.name ? (
    <input
      value={editedFolderName}
      onChange={(e) => setEditedFolderName(e.target.value)}
      onBlur={() => {
        setFolders(folders.map(f => f.name === folder.name ? { ...f, name: editedFolderName } : f));
        setEditingFolderName(null);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          setFolders(folders.map(f => f.name === folder.name ? { ...f, name: editedFolderName } : f));
          setEditingFolderName(null);
        }
      }}
      autoFocus
    />
  ) : (
    <>
      <span>{openFolders[folder.name] ? "▼" : "▶"} {folder.name}</span>
      <div className="folder-actions">
        <button
          className="folder-options-btn"
          onClick={(e) => {
            e.stopPropagation(); //Eviter de toggle le fichier
            setFolderOptions(folder.name); 
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
        >+</button>
      </div>
    </>
  )}
    </div>

            {folderOptions === folder.name && (
              <div className="folder-options-menu" ref={folderOptionsRef}>
                <button
                  onClick={() => {
                    setEditedFolderName(folder.name);
                    setEditingFolderName(folder.name);
                    setFolderOptions(null);
                  }}
                >
                  Modifier
                </button>
                <button
                  onClick={() => {
                    setFolders(folders.filter((f) => f.name !== folder.name));
                    setFolderOptions(null);
                  }}
                >
                  Supprimer
                </button>
              </div>
            )}

            {openFolders[folder.name] && (
              <div className="notes">
                {folder.notes.map((note) => (
           <div
              key={note.id}
              className={`note-item ${selectedNote?.id === note.id ? "active" : ""}`}
              onClick={() => handleNoteSelection(note)}
            >
  {editingNoteId === note.id ? (
    <input
      value={editedNoteTitle}
      onChange={(e) => setEditedNoteTitle(e.target.value)}
      onBlur={() => {
        setFolders((prevFolders) =>
          prevFolders.map((f) =>
            f.name === folder.name
              ? {
                  ...f,
                  notes: f.notes.map((n) =>
                    n.id === note.id ? { ...n, title: editedNoteTitle } : n
                  ),
                }
              : f
          )
        );
        setEditingNoteId(null);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          setFolders((prevFolders) =>
            prevFolders.map((f) =>
              f.name === folder.name? {...f,notes: f.notes.map((n) =>
                      n.id === note.id ? { ...n, title: editedNoteTitle } : n
                    ),}: f));
          setEditingNoteId(null);
        }}}
      autoFocus
    />
  ) : (<span>{note.title}</span>
  )}

  <button
    onClick={(e) => {
      e.stopPropagation(); 
      setNoteOptions(noteOptions === note.id ? null : note.id);
    }}
  >
    ⋮</button>

  {noteOptions === note.id && (
    <div
      className="folder-options-menu"
      ref={noteOptionsRef}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={() => {
          setEditedNoteTitle(note.title);
          setEditingNoteId(note.id);
          setNoteOptions(null);
        }}
      >Modifier</button>

      <button
        onClick={() => {
          setFolders((prevFolders) =>
            prevFolders.map((f) =>
              f.name === folder.name
                ? {...f,
                    notes: f.notes.filter((n) => n.id !== note.id),
                  }: f
            )
          );
          if (selectedNote.id === note.id) setSelectedNote(null);
          setNoteOptions(null);
        }}
      >Supprimer</button></div>
      )}
    </div>))}
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
        ))}
      </div>

      <div className="editor">
  {selectedNote ? (
    selectedNote.title === "Introduction" && selectedNote.id === 0 ? (
      <WelcomePage />
    ) : (
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
    <p className="no-note">Sélectionne une note</p> //Quand aucune note
  )}
</div>

    </div>

    
  );
};
export default NotesApp;
