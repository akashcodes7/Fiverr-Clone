import { useQuery } from "@tanstack/react-query";
import React from "react";
import getCurrentUser from "../utils/getCurrentUser";
import axios from "axios";
import './profile.css';

function Profile() {
  const currentUser = getCurrentUser();
  const { isLoading, error, data } = useQuery({
    queryKey: ["myGigs"],
    queryFn: () => axios.get(`http://localhost:8800/api/users/${currentUser._id}`).then((res) => res.data),
    onError: (error) => {
      console.log(error, "error")
    }
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  console.log(data, "data")

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <div className="d-flex flex-column align-items-center text-center">
                <img
                  src={"/img/mman.png"}
                  alt={data.username}
                  className="rounded-circle"
                  width="150"
                />
                <div className="mt-3">
                  <h4>{data.username}</h4>
                  <p className="text-secondary mb-1">{data.email}</p>
                  <p className="text-muted font-size-sm">{data.country}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-9">
          <div className="card mb-3">
            <div className="card-body">
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Full Name</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                  {data.firstName} {data.lastName}
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Email</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                  {data.email}
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Phone</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                  {data.phone}
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Country</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                  {data.country}
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">About</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                  {data.about}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}
export default Profile;
