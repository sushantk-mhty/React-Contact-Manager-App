import React from 'react'
import './App.css';
import Navbar from './pages/components/Navbar/Navbar';
import { Navigate, Route, Routes } from 'react-router-dom';
import ContactList from './pages/components/Contact/ContactList/ContactList';
import AddContact from './pages/components/Contact/AddContact/AddContact';
import ViewContact from './pages/components/Contact/ViewContact/ViewContact';
import EditContact from './pages/components/Contact/EditContact/EditContact';
// import Spinner from './pages/components/Spinner/Spinner';


const App = () => {
  return (
    <React.Fragment>
      <Navbar/>
      <Routes>
        <Route path={'/'} element={<Navigate to={'/contacts/list'}/>}/>
        <Route path={'/contacts/list'} element={<ContactList/>}/>
        <Route path={'/contacts/add'} element={<AddContact/>}/>
        <Route path={'/contacts/view/:contactId'} element={<ViewContact/>}/>
        <Route path={'/contacts/edit/:contactId'} element={<EditContact/>}/>
      </Routes>

    </React.Fragment>
  )
}

export default App;
