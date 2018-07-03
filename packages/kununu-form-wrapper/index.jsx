import React from 'react';
import PropTypes from 'prop-types';
import {validateField} from '@kununu/kununu-utils/dist/kununu-helpers/formValidation';

const FormWrapper = (WrappedComponent) => {
  class HOC extends React.Component {
    constructor (props) {
      super(props);
      this.state = {
        fields: this.props.getInitialFields(),
      };
    }

    getFormFieldProps = id => ({
      id,
      input: {
        name: id,
        value: this.state.fields[id].value,
        onChange: this.handleUserInput,
        onBlur: this.handleUserBlur,
      },
      meta: {
        touched: this.state.fields[id].touched,
        error: this.state.fields[id].error,
      },
    });

    /**
     * Returns an object with all state field keys and values
     */
    getFormValues = () => Object.keys(this.state.fields).reduce((acc, key) => ({
      ...acc,
      [key]: this.state.fields[key].value,
    }), {});

    updateStateFromLocalStorage = (storageKey) => {
      if (localStorage) {
        const fieldValues = JSON.parse(localStorage.getItem(storageKey));
        // Field values need to be merged with the ^ial state values, to still have their validations
        if (fieldValues) {
          this.setState({
            fields: Object.keys(this.state.fields).reduce((acc, key) => ({
              ...acc,
              [key]: {
                ...this.state.fields[key],
                value: fieldValues.fields[key] ? fieldValues.fields[key].value : '',
              },
            }), {}),
          });
        }
      }
    }

    /**
     * Checks if all fields that are to be sent are valid
     * @returns {bool}
     */
    isFormValid = () => Object.keys(this.state.fields).reduce((acc, field) => acc && !this.state.fields[field].error, true);

    /**
     * Validate a given field and return the updated field object
     *
     * @param {string} value
     * @param {string} key
     * @param {bool} touched
     */
    updateField = (value, key, touched = false) => ({
      [key]: {
        ...this.state.fields[key],
        value,
        touched: this.state.fields[key].touched || touched, // touched is unset when field is loaded from local storage
        error: validateField(value, this.state.fields[key].validations),
      },
    });

    /**
     * Is called when onChange event of a field is called
     * @param {object} event
     */
    handleUserInput = (event) => {
      const {name, value} = event.target;

      this.setState({
        fields: {
          ...this.state.fields,
          ...this.updateField(value, name),
        },
      });
    };

    /**
     * Is called when onBlur event of a field is called
     * @param {object} event
     */
    handleUserBlur = (event) => {
      const {name, value} = event.target;

      // When the form is submit, setting state in blur stops event propagation
      if (event.relatedTarget && event.relatedTarget.type !== 'submit') {
        this.setState({
          fields: {
            ...this.state.fields,
            ...this.updateField(value, name, true),
          },
        });
      }
    };

    /**
     * Saves current form values into local storage for given key
     * error and touched values for key are not persisted, so that they
     * are not immediately shown, when user returns to page
     *
     * @param {string} storageKey
     */
    updateLocalStorageFromState = (storageKey) => {
      // get field values and check if at least one of this values is not empty
      const hasFieldsWithValues = Object.keys(this.state.fields)
        .filter(out => this.state.fields[out].value.length > 0).length > 0;

      if (hasFieldsWithValues) {
        // get values from this state.fields
        const fieldValues = Object.keys(this.state.fields).reduce((obj, key) =>
          ({...obj, [key]: {value: this.state.fields[key].value}}), {});

        // persist this values into localstorage
        localStorage.setItem(storageKey, JSON.stringify({
          fields: {
            ...fieldValues,
          },
        }));
      }
    }

    /**
     * Validate all form fields
     */
    validateForm (callback) {
      this.setState({
        fields: Object.keys(this.state.fields).reduce((acc, key) => ({
          ...acc,
          ...this.updateField(this.state.fields[key].value, key, true),
        }), {}),
      }, () => {
        const isFormValid = this.isFormValid();

        if (isFormValid) {
          // this will be submit function in the child component
          callback(this.getFormValues());
        } else {
          this.touchForm(true);
        }
      });
    }

    handleSubmit = (e, callback) => {
      // callback is the submit function in the child component
      e.preventDefault();
      this.validateForm(callback);
    }

    /**
     * Trigger form field validation
     * for each field
     */
    touchForm = (isTouched) => {
      const fieldsObj = this.state.fields;
      const touchedFields = Object.keys(fieldsObj).reduce((obj, key) =>
        ({...obj, [key]: {...fieldsObj[key], touched: isTouched}}), {});

      this.setState({
        fields: touchedFields,
      });
    }

    /**
     * Resets values of the form fields
     */
    resetFormFields = () => {
      this.setState({
        fields: this.props.getInitialFields(),
      });
    }

    render () {
      return (
        <WrappedComponent
          handleUserInput={this.handleUserInput}
          handleUserBlur={this.handleUserBlur}
          fields={this.state.fields}
          handleSubmit={this.handleSubmit}
          touchForm={this.touchForm}
          updateStateFromLocalStorage={this.updateStateFromLocalStorage}
          updateLocalStorageFromState={this.updateLocalStorageFromState}
          resetFormFields={this.resetFormFields}
          getFormFieldProps={this.getFormFieldProps}
          {...this.props}
        />
      );
    }
  }

  return HOC;
};

FormWrapper.propTypes = {
  getInitialFields: PropTypes.func.isRequired,
};

export default FormWrapper;
