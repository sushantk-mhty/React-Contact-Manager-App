import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ContactService } from "../../../../core/services/ContactService";
import Spinner from "../../Spinner/Spinner";

const ContactList = () => {

  let [query, setQuery]=useState({
    text:''
  })
 let searchContacts=(event)=>{
   setQuery({...query,text:event.target.value});
   let theContacts=state.contacts.filter(contact=>{
    return contact.name.toLowerCase().includes(event.target.value.toLowerCase())
   });
   setState({
    ...state,
    filteredContacts:theContacts
   })

 }


  let [state, setState] = useState({
    loading: false,
    contacts: [],
    filteredContacts:[],
    errorMessage: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState({ ...state, loading: true });
        const response = await ContactService.getAllContacts();
        setState({
          ...state,
          loading: false,
          contacts: response.data,
          filteredContacts: response.data
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


  let clickDelete=async(contactId)=>{
   try {
    let response=await ContactService.deleteContact(contactId);
    if(response){
      setState({ ...state, loading: true });
      const response = await ContactService.getAllContacts();
      setState({
        ...state,
        loading: false,
        contacts: response.data,
        filteredContacts: response.data
      });
    }
   } catch (error) {
    setState({
      ...state,
      loading: false,
      errorMessage: error.errorMessage,
    });
   }
  }

  let { loading, contacts, filteredContacts, errorMessage } = state;
  return (
    <React.Fragment>
      <section className="contact-search p-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h3">
                Contact Manager
                <Link to={"/contacts/add"} className="btn btn-primary ms-2">
                  <i className="fa fa-plus-circle me-2"></i>
                  New
                </Link>
              </p>
              <p className="fst-italic">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit,
                culpa placeat. Incidunt nulla molestias amet exercitationem iure
                eos sapiente hic saepe. Aut tempore velit debitis est nisi
                voluptatem nam atque.
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <form className="row">
                <div className="col">
                  <div className="mb-2">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search Names"
                      name="text"
                      value={query.text}
                      onChange={searchContacts}
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="mb-2">
                    <input
                      type="submit"
                      className="btn btn-outline-dark"
                      value="Search"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {loading ? (
        <Spinner />
      ) : (
        <React.Fragment>
          <section>
            <div className="container mt-3">
              <div className="row">
                {
                filteredContacts.length > 0 &&
                filteredContacts.map((contact) => {
                    return (
                      <div className="col-md-6" key={contact.id}>
                        <div className="card list-group-item list-group-item-danger shadow-lg my-2">
                          <div className="card-body">
                            <div className="row">
                              <div className="col-sm-4">
                                <img
                                  src={contact.photo}
                                  alt=""
                                  className="contact-img"
                                />
                              </div>
                              <div className="col-sm-7 my-3">
                                <ul className="list-group">
                                  <li className="list-group-item list-group-item-action">
                                    Name:{" "}
                                    <span className="fw-bold">
                                      {contact.name}
                                    </span>
                                  </li>
                                  <li className="list-group-item">
                                    Email:
                                    <span className="fw-bold">
                                      {contact.email}
                                    </span>
                                  </li>
                                  <li className="list-group-item">
                                    Mobile:{" "}
                                    <span className="fw-bold">
                                      {contact.mobile}
                                    </span>
                                  </li>
                                </ul>
                              </div>
                              <div className="col-sm-1 d-flex flex-column justify-content-center align-items-center">
                                <Link
                                  to={`/contacts/view/${contact.id}`}
                                  className="btn btn-warning my-1"
                                >
                                  {" "}
                                  <i className="fa fa-eye"></i>
                                </Link>
                                <Link
                                  to={`/contacts/edit/${contact.id}`}
                                  className="btn btn-primary my-1"
                                >
                                  {" "}
                                  <i className="fa fa-pen"></i>
                                </Link>
                                <button className="btn btn-danger my-1" onClick={()=>clickDelete(contact.id)}>
                                  <i className="fa fa-trash-alt"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </section>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ContactList;
