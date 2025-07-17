import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageLeaders = () => {
  const [leaders, setLeaders] = useState([]);
  const [form, setForm] = useState({ role: "President", name: "" });
  const [photo, setPhoto] = useState(null);

  const fetchLeaders = async () => {
    const res = await axios.get("/api/leaders");
    setLeaders(res.data);
  };

  useEffect(() => {
    fetchLeaders();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("role", form.role);
    formData.append("name", form.name);
    formData.append("photo", photo);
    await axios.post("/api/leaders", formData);
    setForm({ role: "President", name: "" });
    setPhoto(null);
    fetchLeaders();
  };

  const handleDelete = async (role) => {
    await axios.delete(`/api/leaders/${role}`);
    fetchLeaders();
  };

  return (
    <div className="card p-4 my-4">
      <h5>Manage President & Vice President</h5>
      <form onSubmit={handleSubmit} className="row g-3 mb-4">
        <div className="col-md-4">
          <select
            className="form-select"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="President">President</option>
            <option value="Vice President">Vice President</option>
          </select>
        </div>
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>
        <div className="col-md-4">
          <input
            type="file"
            className="form-control"
            onChange={(e) => setPhoto(e.target.files[0])}
            required
          />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">Save</button>
        </div>
      </form>

      <div className="row leader">
        {leaders.map((leader) => (
          <div className="col-md-3" key={leader.role}>
            <div className="card p-2">
              <img src={`http://localhost:5000/uploads/${leader.photo}`} className="img-fluid rounded" alt={leader.name} />
              <h6 className="mt-2">{leader.role}: {leader.name}</h6>
              <button
                className="btn btn-sm btn-danger mt-2"
                onClick={() => handleDelete(leader.role)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageLeaders;
