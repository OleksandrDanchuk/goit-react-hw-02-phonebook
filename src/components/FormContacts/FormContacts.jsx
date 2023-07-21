import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './FormContacts.module.css';

export class FormContacts extends Component {
  state = {
    name: '',
    number: '',
  };
  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };
  submitAddContact = evt => {
    evt.preventDefault();
    this.props.addContact(evt);
    this.setState({ name: '', number: '' });
  };
  render() {
    return (
      <>
        <form className={css.form} onSubmit={this.submitAddContact}>
          <label className={css.label}>
            Name
            <input
              className={css.input}
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              onChange={this.handleChange}
              value={this.state.name}
            />
          </label>
          <label className={css.label}>
            Number
            <input
              className={css.input}
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              onChange={this.handleChange}
              value={this.state.number}
            />
          </label>
          <button className={css.form_button}>Add contact</button>
        </form>
      </>
    );
  }
}

FormContacts.propTypes = {
  addContact: PropTypes.func.isRequired,
};
