import { Component } from 'react';
import css from './App.module.css';
import { nanoid } from 'nanoid';
import { FormContacts } from './FormContacts/FormContacts';
import { Filter } from './Filter/Filter';
import { ListContacts } from './ListContacts/ListContacts';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  deleteContact = ({ target: { id } }) => {
    this.setState(prevState => {
      return { contacts: prevState.contacts.filter(obj => obj.id !== id) };
    });
  };

  addContact = evt => {
    const { name, number } = evt.currentTarget.elements;
    this.checkName(name.value) &&
      this.setState(prevState => ({
        contacts: [
          ...prevState.contacts,
          {
            id: nanoid(),
            name: name.value,
            number: number.value,
          },
        ],
      }));
  };

  checkName = name => {
    const resultCheck = this.state.contacts.find(
      obj => obj.name.toLowerCase() === name.toLowerCase()
    );
    if (resultCheck) {
      alert(`${name} is already in contacts.`);
    }
    return !resultCheck;
  };

  filterContacts = () => {
    return this.state.contacts.filter(({ name }) => {
      return name.toLowerCase().includes(this.state.filter.toLowerCase());
    });
  };

  render() {
    const filterRender = this.filterContacts();

    return (
      <div className={css.container}>
        <h2>Phonebook</h2>
        <FormContacts addContact={this.addContact} />
        <h2>Contacts</h2>
        <Filter handleChange={this.handleChange} value={this.state.filter} />
        <ListContacts
          filterRender={filterRender}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
