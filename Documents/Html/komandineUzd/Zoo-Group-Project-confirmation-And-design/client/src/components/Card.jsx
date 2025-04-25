import { useState } from 'react';
import Update from './Update';
import Delete from './Delete';

const Card = ({ data, refreshData }) => {
  const [editingId, setEditingId] = useState(null);

  return (
    <div className="card-container">
      {data?.map((animal) => (
        <div key={animal.id} className="card">
          {editingId === animal.id ? (
            <Update
              initialData={animal}
              onUpdate={refreshData}
              onClose={() => setEditingId(null)}
            />
          ) : (
            <>
              <div className="row"><label>Name:</label><p>{animal.gyvūnoPav}</p></div>
              <div className="row"><label>Type:</label><p>{animal.rūšis}</p></div>
              <div className="row"><label>Weight:</label><p>{animal.svoris}</p></div>
              <div className="row"><label>Habitat:</label><p>{animal.aplinka}</p></div>
              <div className="row"><label>Lives in Lithuania:</label><p>{animal.gyvenaLietuvoje ? 'Yes' : 'No'}</p></div>

              <button onClick={() => setEditingId(animal.id)}>Edit</button>
              
              <Delete id={animal.id} onDelete={refreshData} gyvūnoPav={animal.gyvūnoPav} />
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Card;
