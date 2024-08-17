import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ContactService } from "../../../../core/services/ContactService";
import Spinner from "../../Spinner/Spinner";

const ViewContact = () => {
  let { contactId } = useParams();

  let [state, setState] = useState({
    loading: false,
    contact: {},
    errorMessage: "",
    group: {},
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState({ ...state, loading: true });
        const response = await ContactService.getContact(contactId);
        const groupResponse = await ContactService.getGroup(response.data);
        setState({
          ...state,
          loading: false,
          contact: response.data,
          group: groupResponse.data,
        });
      } catch (error) {
        setState({
          ...state,
          loading: false,
          errorMessage: error.errorMessage,
        });
      }
    };
    fetchData();
  }, [contactId]);

  let { loading, contact, errorMessage, group } = state;

  return (
    <React.Fragment>
      <section>
        <div className="container mt-3">
          <div className="row">
            <div className="col">
              <p className="h3 fw-bold text-warning">View Contact</p>
              <p className="fst-italic">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
          </div>
        </div>
      </section>
      {loading ? (
        <Spinner />
      ) : (
        <React.Fragment>
          {Object.keys(contact).length > 0 && Object.keys(group).length > 0 && (
            <section>
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-sm-4">
                    <img
                      src={contact.photo}
                      alt=""
                      className="contact-img-big"
                    />
                  </div>
                  <div className="col-sm-6">
                    <ul className="list-group list-group-item-danger">
                      <li className="list-group-item">
                        Name: <span className="fw-bold">{contact.name}</span>
                      </li>
                      <li className="list-group-item">
                        Email: <span className="fw-bold">{contact.email}</span>
                      </li>
                      <li className="list-group-item">
                        Mobile:{" "}
                        <span className="fw-bold">{contact.mobile}</span>
                      </li>
                      <li className="list-group-item">
                        Company:{" "}
                        <span className="fw-bold">{contact.company}</span>
                      </li>
                      <li className="list-group-item">
                        Title: <span className="fw-bold">{contact.title}</span>
                      </li>
                      <li className="list-group-item">
                        Group Name:{" "}
                        <span className="fw-bold">{group.name}</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col">
                    <Link to={"/contacts/list"} className="btn btn-dark ms-2">
                      <i className="fa fa-arrow-alt-circle-left"></i>Back
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ViewContact;
