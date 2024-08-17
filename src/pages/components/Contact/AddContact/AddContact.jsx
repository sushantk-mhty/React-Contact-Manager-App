import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ContactService } from "../../../../core/services/ContactService";

const AddContact = () => {
  let navigate = useNavigate();
  let [state, setState] = useState({
    loading: false,
    contact: {
      name: "",
      photo: "",
      mobile: "",
      email: "",
      company: "",
      title: "",
      groupId: "",
    },
    groups: [],
    errorMessage: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState({ ...state, loading: true });
        const response = await ContactService.getGroups();
        setState({
          ...state,
          loading: false,
          groups: response.data,
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
  }, []);

  let updateInput = (event) => {
    setState({
      ...state,
      contact: {
        ...state.contact,
        [event.target.name]: event.target.value,
      },
    });
  };

  let submitForm = async (event) => {
    event.preventDefault();
    try {
      const response = await ContactService.createContact(state.contact);
      if (response) {
        navigate("/contacts/list", { replace: true });
      }
    } catch (error) {
      setState({
        ...state,
        loading: false,
        errorMessage: error.errorMessage,
      });
      navigate("/contacts/add", { replace: false });
    }
  };

  let { loading, contact, groups, errorMessage } = state;

  return (
    <React.Fragment>
      <div className="container mt-3">
        <div className="row">
          <div className="col">
            <p className="h3 fw-bold text-danger">Add Contact</p>
            <p className="fst-italic">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
      </div>

      {/* Create Contact Form */}
      <div className="container">
        <div className="row">
          <div className="col-sm-4">
            <form onSubmit={submitForm}>
              <div className="mb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  name="name"
                  required={true}
                  value={contact.name}
                  onChange={updateInput}
                />
              </div>
              <div className="mb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Photo Url"
                  name="photo"
                  required={true}
                  value={contact.photo}
                  onChange={updateInput}
                />
              </div>
              <div className="mb-2">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  name="email"
                  required={true}
                  value={contact.email}
                  onChange={updateInput}
                />
              </div>
              <div className="mb-2">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Mobile"
                  name="mobile"
                  required={true}
                  value={contact.mobile}
                  onChange={updateInput}
                />
              </div>
              <div className="mb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Company"
                  name="company"
                  required={true}
                  value={contact.company}
                  onChange={updateInput}
                />
              </div>
              <div className="mb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Title"
                  name="title"
                  required={true}
                  value={contact.title}
                  onChange={updateInput}
                />
              </div>
              <div className="mb-2">
                <select
                  className="form-control"
                  name="groupId"
                  required={true}
                  value={contact.groupId}
                  onChange={updateInput}
                >
                  <option value="0">Select a Group</option>
                  {groups.length > 0 &&
                    groups.map((group) => {
                      return (
                        <option key={group.id} value={group.id}>
                          {group.name}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="mb-2">
                <input
                  type="submit"
                  className="btn btn-danger"
                  value="Create"
                />
                <Link to={"/contacts/list"} className="btn btn-dark ms-2">
                  Close
                </Link>
              </div>
            </form>
          </div>
          <div className="col-sm-4">
            <img
              src="https://toppng.com/uploads/preview/icons-logos-emojis-user-icon-png-transparent-11563566676e32kbvynug.png"
              alt=""
              className="contact-img"
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AddContact;
