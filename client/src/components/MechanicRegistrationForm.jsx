import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const apiUrl = import.meta.env.VITE_API_URL;

export default function MechanicRegistrationForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    specialty: '',
    photo: '',
    workshop: '',
    city: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic client-side validation
    const { firstName, lastName, specialty, photo, workshop, city } = formData;
    if (!firstName || !lastName || !specialty || !photo || !workshop || !city) {
      setError('All fields are required');
      return;
    }

    try {
      const res = await fetch(`${apiUrl}/api/mechReg`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Something went wrong');

      alert('Mechanic registered!');
      setFormData({ firstName: '', lastName: '', specialty: '', photo: '', workshop: '', city: '' });
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Mechanic Registration</h3>
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      className="form-control"
                      placeholder="Johnny.."
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      className="form-control"
                      placeholder="Johnson.."
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="specialty" className="form-label">Specialty</label>
                  <input
                    id="specialty"
                    name="specialty"
                    type="text"
                    className="form-control"
                    placeholder="Engines.."
                    value={formData.specialty}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="photo" className="form-label">Photo URL</label>
                  <input
                    id="photo"
                    name="photo"
                    type="url"
                    className="form-control"
                    placeholder="https://..."
                    value={formData.photo}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="workshop" className="form-label">Workshop Name</label>
                  <input
                    id="workshop"
                    name="workshop"
                    type="text"
                    className="form-control"
                    placeholder="Workshop name.."
                    value={formData.workshop}
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
                    placeholder="City.."
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-success w-100">Register Mechanic</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}