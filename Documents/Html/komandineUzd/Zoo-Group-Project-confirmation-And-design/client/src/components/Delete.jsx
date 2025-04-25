import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const Delete = ({id, onDelete, setId, selectedId, gyvūnoPav}) => {
    const [message, setMessage] = useState('');


//istrina irasa pagal id
    const handleDelete = () => {
      axios
        .delete(`http://localhost:5000/deleteAnimal/${id}`)
        .then((res) => {
          onDelete();
          if(id==selectedId)setId(null)
          setMessage(res.data.message);
        })
        .catch((error) => {
          setMessage(error.response ? error.response.data.message : 'Error deleting animal');
        });
    };
//popup confirmation
  function confirmPopUp(gyvūnoPav){
    Swal.fire({
      title: `Are you sure on deleting item ${gyvūnoPav}?`,
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
      customClass: {
        actions: 'my-actions',
        confirmButton: 'order-1',
        denyButton: 'order-2',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(`Deleted ${gyvūnoPav}!`, '', 'success')
        handleDelete();
      }
    })
  }
  
    return (
      <div>
        <button onClick={() => confirmPopUp(gyvūnoPav)}>Delete</button>
        <p>{message}</p>
      </div>
    );
  };

export default Delete
