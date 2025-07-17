import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Managerecruitments = () => {
  const [clubData, setClubData] = useState(null);
  const [dsaData, setDsaData] = useState(null);

  const fetchRecruitmentData = async () => {
    const club = await axios.get('/api/recruitment/club');
    const dsa = await axios.get('/api/recruitment/dsa');
    setClubData(club.data);
    setDsaData(dsa.data);
  };

  useEffect(() => {
    fetchRecruitmentData();
  }, []);

  const handleToggleClub = async () => {
    await axios.post('/api/recruitment/club/update', {
      ...clubData,
      isActive: !clubData?.isActive,
    });
    fetchRecruitmentData();
  };

  const handleToggleDSA = async () => {
    await axios.post('/api/recruitment/dsa/update', {
      ...dsaData,
      isActive: !dsaData?.isActive,
    });
    fetchRecruitmentData();
  };

  const handleClubUpdate = async () => {
    try {
      await axios.post('/api/recruitment/club/update', clubData);
      alert('Club Recruitment data updated!');
      fetchRecruitmentData();
    } catch (error) {
      console.error(error);
      alert('Error updating club data.');
    }
  };

  const handleDsaUpdate = async () => {
    try {
      await axios.post('/api/recruitment/dsa/update', dsaData);
      alert('DSA Community data updated!');
      fetchRecruitmentData();
    } catch (error) {
      console.error(error);
      alert('Error updating DSA data.');
    }
  };

  return (
    <div className="container my-5">
      <h3 className="mb-4">Manage Membership Page</h3>

      {/* Club Recruitment Section */}
      <div className="card mb-4 p-4">
        <h5>Club Recruitment</h5>
        <button onClick={handleToggleClub} className="btn btn-sm btn-warning my-2">
          {clubData?.isActive ? "Deactivate" : "Activate"}
        </button>

        <input
          className="form-control my-2"
          type="text"
          placeholder="Domain Name"
          value={clubData?.registration?.domain || ''}
          onChange={(e) =>
            setClubData({
              ...clubData,
              registration: {
                ...clubData?.registration,
                domain: e.target.value,
              },
            })
          }
        />

        <input
          className="form-control my-2"
          type="text"
          placeholder="Google Form Link"
          value={clubData?.registration?.formLink || ''}
          onChange={(e) =>
            setClubData({
              ...clubData,
              registration: {
                ...clubData?.registration,
                formLink: e.target.value,
              },
            })
          }
        />

        <input
          className="form-control my-2"
          type="text"
          placeholder="WhatsApp Link"
          value={clubData?.registration?.whatsappLink || ''}
          onChange={(e) =>
            setClubData({
              ...clubData,
              registration: {
                ...clubData?.registration,
                whatsappLink: e.target.value,
              },
            })
          }
        />

        <input
          className="form-control my-2"
          type="text"
          placeholder="Task Upload Link"
          value={clubData?.registration?.taskLink || ''}
          onChange={(e) =>
            setClubData({
              ...clubData,
              registration: {
                ...clubData?.registration,
                taskLink: e.target.value,
              },
            })
          }
        />

        <input
          className="form-control my-2"
          type="text"
          placeholder="Interview Meet Link"
          value={clubData?.interviewLink || ''}
          onChange={(e) =>
            setClubData({
              ...clubData,
              interviewLink: e.target.value,
            })
          }
        />

        <button className="btn btn-sm btn-primary mt-2" onClick={handleClubUpdate}>
          Save Club Data
        </button>
      </div>

      {/* DSA Recruitment Section */}
      <div className="card p-4">
        <h5>DSA Community Recruitment</h5>
        <button onClick={handleToggleDSA} className="btn btn-sm btn-warning my-2">
          {dsaData?.isActive ? "Deactivate" : "Activate"}
        </button>

        <input
          className="form-control my-2"
          type="text"
          placeholder="Welcome Message"
          value={dsaData?.welcomeMessage || ''}
          onChange={(e) => setDsaData({ ...dsaData, welcomeMessage: e.target.value })}
        />

        <input
          className="form-control my-2"
          type="text"
          placeholder="Registration Form Link"
          value={dsaData?.formLink || ''}
          onChange={(e) => setDsaData({ ...dsaData, formLink: e.target.value })}
        />

        <input
          className="form-control my-2"
          type="text"
          placeholder="WhatsApp Group Link"
          value={dsaData?.whatsappLink || ''}
          onChange={(e) => setDsaData({ ...dsaData, whatsappLink: e.target.value })}
        />

        <button className="btn btn-primary mt-2" onClick={handleDsaUpdate}>
          Save DSA Data
        </button>
      </div>
    </div>
  );
};

export default Managerecruitments;
