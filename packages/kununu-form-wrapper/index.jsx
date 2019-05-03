import React from 'react';
import PropTypes from 'prop-types';
import {validateField} from '@kununu/kununu-utils/dist/kununu-helpers/formValidation';

const FormWrapper = (WrappedComponent) => {
  class HOC extends React.Component {
    /**
     * If the initial fields are loaded
     * async then they will be empty upon initial load.
     * If this is the case we will try to update them
     * until fields contain a value
     */
    static getDerivedStateFromProps (nextProps, prevState) {
      const currentStateIsNotEmpty = Object.keys(prevState.fields).length;

      if (currentStateIsNotEmpty) return null;

      return {
        fields: nextProps.getInitialFields(),
      };
    }


    constructor (props) {
      super(props);
      const {getInitialFields} = this.props;

      this.state = {
        fields: getInitialFields(),
      };
    }

    getStateFields = () => {
      const {fields} = this.state;

      return fields;
    }

    getFormFieldProps = id => ({
      id,
      input: {
        name: id,
        value: this.getStateFields()[id].value,
        onChange: this.handleUserInput,
        onBlur: this.handleUserBlur,
      },
      meta: {
        touched: this.getStateFields()[id].touched,
        error: this.getStateFields()[id].error,
      },
    });

    /**
     * Returns an object with all state field keys and values
     */
    getFormValues = () => Object.keys(this.getStateFields()).reduce((acc, key) => ({
      ...acc,
      [key]: this.getStateFields()[key].value,
    }), {});

    updateStateFromLocalStorage = (storageKey) => {
      if (localStorage) {
        const fieldValues = JSON.parse(localStorage.getItem(storageKey));

        // Field values need to be merged with the ^ial state values, to still have their validations
        if (fieldValues) {
          this.setState({
            fields: Object.keys(this.getStateFields()).reduce((acc, key) => ({
              ...acc,
              [key]: {
                ...this.getStateFields()[key],
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
    isFormValid = () => Object.keys(this.getStateFields()).reduce((acc, field) => acc && !this.getStateFields()[field].error, true);

    /**
     * Checks if all the fields do not contain
     * a value
     * @returns {bool}
     */
    formIsEmpty = () => Object.keys(this.getStateFields())
      .every(key => !this.getStateFields()[key].value)

    /**
     * Handles different form values types
     */
    handleFieldTypes = (prevVal, val) => {
      if (Array.isArray(prevVal) && !Array.isArray(val)) {
        // if it is already there, then the user is removing the item
        if (prevVal.includes(val)) {
          return prevVal.filter(item => item !== val);
        }

        prevVal.push(val);

        return prevVal;
      }

      return val;
    }

    /**
     * Validate a given field and return the updated field object
     *
     * @param {string, array} value
     * @param {string} key
     * @param {bool} touched
     */
    updateField = (value, key, touched = false) => ({
      [key]: {
        ...this.getStateFields()[key],
        value: this.handleFieldTypes(this.getStateFields()[key].value, value),
        touched: this.getStateFields()[key].touched || touched, // touched is unset when field is loaded from local storage
        error: validateField(value, this.getStateFields()[key].validations),
      },
    });

    /**
     *
     * Allows you to update a field
     * error manually.
     *
     * @param {string} key
     * @param {string} error
     */
    handleCustomError = (key, error) => {
      const fields = {
        fields: {
          ...this.getStateFields(),
          [key]: {
            ...this.getStateFields()[key],
            error,
          },
        },
      };

      return new Promise((resolve) => {
        this.setState(fields, resolve);
      });
    }

    /**
     * Is called when onChange event of a field is called
     * @param {object} event
     */
    handleUserInput = (event) => {
      const {name, value} = event.target;

      const fields = {
        fields: {
          ...this.getStateFields(),
          ...this.updateField(value, name),
        },
      };

      return new Promise((resolve) => {
        this.setState(fields, resolve);
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
        // For radio and selectboxes, make sure they are selected, otherwise don't update state
        if (['radio', 'checkbox'].includes(event.target.type) && !event.target.checked) return null;

        const fields = {
          fields: {
            ...this.getStateFields(),
            ...this.updateField(value, name, true),
          },
        };

        return new Promise((resolve) => {
          this.setState(fields, resolve);
        });
      }

      return null;
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
      const hasFieldsWithValues = Object.keys(this.getStateFields())
        .filter(out => this.getStateFields()[out].value.length > 0).length > 0;

      if (hasFieldsWithValues) {
        // get values from this state.fields
        const fieldValues = Object.keys(this.getStateFields()).reduce((obj, key) => ({...obj, [key]: {value: this.getStateFields()[key].value}}), {});

        // persist this values into localstorage
        localStorage.setItem(storageKey, JSON.stringify({
          fields: {
            ...fieldValues,
          },
        }));
      }
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
      const fieldsObj = this.getStateFields();
      const touchedFields = Object.keys(fieldsObj).reduce((obj, key) => ({...obj, [key]: {...fieldsObj[key], touched: isTouched}}), {});

      this.setState({
        fields: touchedFields,
      });
    }

    /**
     * Resets values of the form fields
     */
    resetFormFields = () => {
      const {getInitialFields} = this.props;

      this.setState({
        fields: getInitialFields(),
      });
    }

    /**
     * Validate all form fields
     */
    validateForm (callback) {
      this.setState({
        fields: Object.keys(this.getStateFields()).reduce((acc, key) => ({
          ...acc,
          ...this.updateField(this.getStateFields()[key].value, key, true),
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

    render () {
      const {fields} = this.state;

      return (
        <WrappedComponent
          formIsEmpty={this.formIsEmpty}
          handleUserInput={this.handleUserInput}
          handleUserBlur={this.handleUserBlur}
          handleCustomError={this.handleCustomError}
          fields={fields}
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

  HOC.propTypes = {
    getInitialFields: PropTypes.func.isRequired,
  };

  return HOC;
};


export default FormWrapper;
