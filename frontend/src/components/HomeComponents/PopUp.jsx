import {motion} from 'framer-motion'

import './PopUp.css'

const PopUp = ({ pendingDelete, onUndo }) => {
      if (!pendingDelete) return null; 
 return (
      <div className="UndoDelete__popup">
            <p>Evento "{pendingDelete.title}" cancellato 
                <button onClick={onUndo}> Annulla </button> </p>
          </div>
  );

}

export default PopUp;