import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Membership.css";

const Membership = () => {
  const [clubData, setClubData] = useState(null);
  const [dsaData, setDsaData] = useState(null);

  const fetchData = async () => {
    try {
      const club = await axios.get("/api/recruitment/club");
      const dsa = await axios.get("/api/recruitment/dsa");
      setClubData(club.data);
      setDsaData(dsa.data);
    } catch (error) {
      console.error("Error fetching recruitment data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatUrl = (url) => {
    if (!url) return "#";
    return url.startsWith("http") ? url : `https://${url}`;
  };

  return (
    <div className="membership-section py-5">
      <div className="container">
        <h2 className="text-center text-white mb-4">Join the NIC Family!</h2>

        {/* Club Recruitment */}
        {clubData?.isActive && (
          <div className="recruitment-section text-white">
            <h4 className="mb-3">Club Recruitment</h4>
            <div className="row g-4">
              {/* Register */}
              <div className="col-md-4 d-flex">
                <div className="card recruit-card w-100 h-100 d-flex flex-column">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">Register</h5>
                    <p>Join the {clubData?.registration?.domain} team!</p>
                    <div className="mt-auto">
                      <a
                        href={formatUrl(clubData?.registration?.formLink)}
                        className="btn btn-light w-100 mb-2"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Fill Registration Form
                      </a>
                      <a
                        href={formatUrl(clubData?.registration?.whatsappLink)}
                        className="btn btn-outline-light w-100"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Join WhatsApp Group
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Upload Task */}
              <div className="col-md-4 d-flex">
                <div className="card recruit-card w-100 h-100 d-flex flex-column">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">Upload Task</h5>
                    <p>Submit your completed task using the given link.</p>
                    <div className="mt-auto">
                      <a
                        href={formatUrl(clubData?.registration?.taskLink)}
                        className="btn btn-light w-100"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Go to Task Upload
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interview */}
              <div className="col-md-4 d-flex">
                <div className="card recruit-card w-100 h-100 d-flex flex-column">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">Interview</h5>
                    <p>Final step! Join the scheduled interview.</p>
                    <div className="mt-auto">
                      <a
                        href={formatUrl(clubData?.interviewLink)}
                        className="btn btn-light w-100"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Join Interview Meet
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* DSA Recruitment */}
        {dsaData?.isActive && (
          <div className="recruitment-section mt-5 text-white">
            <h4 className="mb-3">DSA Community Recruitment</h4>
            <div className="row justify-content-center">
              <div className="col-md-6 col-sm-10">
                <div className="card recruit-card">
                  <div className="card-body">
                    <h5 className="card-title">Welcome!</h5>
                    <p>{dsaData?.welcomeMessage}</p>
                    <a
                      href={formatUrl(dsaData?.formLink)}
                      className="btn btn-light"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Fill Registration Form
                    </a>
                    <a
                      href={formatUrl(dsaData?.whatsappLink)}
                      className="btn btn-outline-light mt-2"
                      target="_blank"
                      style={{ marginLeft: "1.5rem" }}
                      rel="noreferrer"
                    >
                      Join WhatsApp Group
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Membership;
