import { useNotes } from "../../context/notes-context";
import { findNotesInArchive } from "../../utils/findNotesInArchive";
import { findNotesInBin } from "../../utils/findNotesInBin";

export const NotesCard = ({ id, title, text, isPinned }) => {
    const { notesDispatch, archive, bin } = useNotes();

    const isNotesInArchive = findNotesInArchive(archive, id)
    const isNotesInBin = findNotesInBin(bin, id)

    const onPinClick = (id) => {
        !isPinned ? notesDispatch(
            {
                type: 'PIN',
                payload: { id }
            }) : notesDispatch({
                type: 'UNPIN',
                payload: { id }
            })
    }

    const onArchiveClick = (id) => {
        !isNotesInArchive ? notesDispatch({
            type: 'ADD_TO_ARCHIVE',
            payload: { id }
        }) : notesDispatch({
            type: 'REMOVE_FROM_ARCHIVE',
            payload: { id }
        })
    }

    const onBinClick = (id) => {
        !isNotesInBin ? notesDispatch({
            type: 'ADD_TO_BIN',
            payload: { id }
        }) : notesDispatch({
            type: 'REMOVE_FROM_BIN',
            payload: { id }
        })
    }

    return (
        <div className='w-56 border border-neutral-800 p-2 rounded-md' key={id}>
            <div className='flex justify-between'>
                <p>{title}</p>
                {
                    !isNotesInArchive && !isNotesInBin ? <button onClick={() => onPinClick(id)}>
                        <span className={isPinned ? 'material-icons' : 'material-icons-outlined'}>
                            push_pin
                        </span>
                    </button> : <></>
                }
            </div>
            <div className='flex flex-col'>
                <p>{text}</p>
                <div className='ml-auto'>
                    {
                        !isNotesInBin ? <button onClick={() => onArchiveClick(id)}>
                            <span className={isNotesInArchive ? 'material-icons' : 'material-icons-outlined'}>
                                archive
                            </span>
                        </button> : <></>
                    }
                    <button onClick={() => onBinClick(id)}>
                        <span class={isNotesInBin ? 'material-icons' : 'material-icons-outlined'}>delete</span>
                    </button>
                </div>
            </div>
        </div>
    )
}