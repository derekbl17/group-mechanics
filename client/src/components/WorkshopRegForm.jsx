import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { registerWorkshop } from '../services/WorkshopService';

export default function WorkshopRegForm() {
  const [workshopData, setWorkshopData] = useState({ name: '', city: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setWorkshopData({ ...workshopData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, city } = workshopData;
    if (!name || !city) {
      setError('All fields are required');
      return;
    }

    try {
      await registerWorkshop(workshopData);
      setWorkshopData({ name: '', city: '' });
      setError('');
      alert('Workshop Registered!');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Register Workshop</h3>
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Workshop Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="form-control"
                    placeholder="Enter workshop name"
                    value={workshopData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="city" className="form-label">City</label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    className="form-control"
                    placeholder="Enter city"
                    value={workshopData.city}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
