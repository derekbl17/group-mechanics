import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const Update = ({ onUpdate, initialData, onClose }) => {
  const [animalData, setAnimalData] = useState(initialData);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:5000/updateAnimal/${initialData.id}`, animalData)
      .then((res) => {
        onUpdate();
        SuccessfullEdit(initialData.gyvūnoPav);
        onClose();
      })
      .catch((error) => {
        console.error('Error updating animal:', error);
      });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAnimalData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  function SuccessfullEdit(gyvūnoPav){
    Swal.fire(`Successfully edited ${gyvūnoPav}!`, '', 'success')

  }

  return (
    <form onSubmit={handleSubmit} className="update-form">
      <div className="row">
        <label>Name:</label>
        <input
          type="text"
          name="gyvūnoPav"
          value={animalData.gyvūnoPav}
          onChange={handleChange}
        />
      </div>
      <div className="row">
        <label>Type:</label>
        <input
          type="text"
          name="rūšis"
          value={animalData.rūšis}
          onChange={handleChange}
        />
      </div>
      <div className="row">
        <label>Weight:</label>
        <input
          type="number"
          name="svoris"
          value={animalData.svoris}
          onChange={handleChange}
        />
      </div>
      <div className="row">
        <label>Habitat:</label>
        <input
          type="text"
          name="aplinka"
          value={animalData.aplinka}
          onChange={handleChange}
        />
      </div>
      <div className="row">
        <label>Lives in Lithuania:</label>
        <input
          type="checkbox"
          name="gyvenaLietuvoje"
          checked={animalData.gyvenaLietuvoje}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Save</button>
      <button type="button" onClick={onClose} style={{ marginLeft: '10px' }}>
        Cancel
      </button>
    </form>
  );
};

export default Update;