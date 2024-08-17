import axios from "axios";

export class ContactService {
  static serverUrl = `http://localhost:9001`; //json-server url

  //GET All Contacts
  // http://localhost:9001/contacts
  static getAllContacts() {
    let dataURL = `${this.serverUrl}/contacts`;
    return axios.get(dataURL);
  }
  //GET Single Contact
  // http://localhost:9001/contacts/:contactId
  static getContact(contactId) {
    let dataURL = `${this.serverUrl}/contacts/${contactId}`;
    return axios.get(dataURL);
  }

  //Create a contact
  // http://localhost:9001/contacts
  static createContact(contact) {
    let dataURL = `${this.serverUrl}/contacts`;
    return axios.post(dataURL, contact);
  }

  //Update a contact
  // http://localhost:9001/contacts/:contactId

  static updateContact(contact, contactId) {
    let dataURL = `${this.serverUrl}/contacts/${contactId}`;
    return axios.put(dataURL, contact);
  }

  //Delete a contact
  // http://localhost:9001/contacts/:contactId
  static deleteContact(contactId) {
    let dataURL = `${this.serverUrl}/contacts/${contactId}`;
    return axios.delete(dataURL);
  }

  //GET All Groups
  static getGroups() {
    let dataURL = `${this.serverUrl}/groups`;
    return axios.get(dataURL);
  }

  //GET Single Group
  static getGroup(contact) {
    let dataURL = `${this.serverUrl}/groups/${contact.groupId}`;
    return axios.get(dataURL);
  }
}
