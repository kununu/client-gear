import React from 'react';
import PropTypes from 'prop-types';
import Button from 'nukleus/dist/components/Button';
import Select from 'nukleus/dist/components/Select';
import TextField from 'nukleus/dist/components/TextField';

class FormComponent extends React.Component {
  state = {
    submitFields: {},
    formFieldsProps: {},
  };

  onSubmit = () => {
    const {
      fields,
    } = this.props;

    this.setState({
      submitFields: fields,
    });
  };

  render () {
    const {
      fields,
      formIsEmpty,
      getFormFieldProps,
      handleSubmit,
      handleUserBlur,
      handleUserInput,
      resetFormFields,
      touchForm,
      updateLocalStorageFromState,
      updateStateFromLocalStorage,
    } = this.props;

    const {
      formFieldsProps,
      submitFields,
    } = this.state;

    return (
      <div>
        <h2>
          Welcome to kununu form wrapper playground!
        </h2>
        <form
          id="profileFilterMenuForm"
          onSubmit={(e) => { handleSubmit(e, this.onSubmit); }}
          noValidate
        >
          <div className="row">
            <div className="col-sm-6">
              <TextField
                label="Text Field"
                name="text_name"
                id="text_id"
                value={fields.text_name.value}
                onChange={handleUserInput}
                onBlur={handleUserBlur}
                inputStyle="block"
              />
            </div>
            <div className="col-sm-6">
              <code>{JSON.stringify(fields.text_name, null, 2)}</code>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <Button
                text="Get Text Field Props"
                htmlType="button"
                type="info"
                onClick={() => this.setState({formFieldsProps: {...formFieldsProps, text_name: getFormFieldProps('text_name')}})}
              />
            </div>
            <div className="col-sm-6">
              {formFieldsProps.text_name && <code>{JSON.stringify(formFieldsProps.text_name, null, 2)}</code>}
            </div>
          </div>
          <br />

          <div className="row">
            <div className="col-sm-6">
              <Select
                label="Select"
                name="select_name"
                id="select_id"
                value={fields.select_name.value}
                options={{a: 'a value', b: 'b value'}}
                onChange={handleUserInput}
                onBlur={handleUserBlur}
                inputStyle="block"
              />
            </div>
            <div className="col-sm-6">
              <code>{JSON.stringify(fields.select_name, null, 2)}</code>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <Button
                text="Get Select Props"
                htmlType="button"
                type="info"
                onClick={() => this.setState({formFieldsProps: {...formFieldsProps, select_name: getFormFieldProps('select_name')}})}
              />
            </div>
            <div className="col-sm-6">
              {formFieldsProps.select_name && <code>{JSON.stringify(formFieldsProps.select_name, null, 2)}</code>}
            </div>
          </div>

          <br />
          <h3>Form Values (to submit):</h3>
          <code>{JSON.stringify(submitFields)}</code>
          <h3>Form is Empty:</h3>
          <code>{JSON.stringify(formIsEmpty())}</code>
          <br />
          <br />
          <div className="row">
            <div className="col-sm-4">
              <Button
                text="Reset"
                htmlType="button"
                onClick={resetFormFields}
              />
            </div>
            <div className="col-sm-4">
              <Button
                text="Touch Form"
                htmlType="button"
                onClick={() => touchForm(true)}
              />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-sm-4">
              <Button
                text="Update LocalStorage"
                htmlType="button"
                onClick={() => updateLocalStorageFromState('form')}
              />
            </div>
            <div className="col-sm-4">
              <Button
                text="Read LocalStorage"
                htmlType="button"
                onClick={() => updateStateFromLocalStorage('form')}
              />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-sm-3">
              <Button
                text="Submit"
                htmlType="submit"
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

FormComponent.propTypes = {
  fields: PropTypes.shape({
    text_name: PropTypes.object.isRequired,
    select_name: PropTypes.object.isRequired,
  }).isRequired,
  formIsEmpty: PropTypes.func.isRequired,
  getFormFieldProps: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleUserBlur: PropTypes.func.isRequired,
  handleUserInput: PropTypes.func.isRequired,
  resetFormFields: PropTypes.func.isRequired,
  touchForm: PropTypes.func.isRequired,
  updateLocalStorageFromState: PropTypes.func.isRequired,
  updateStateFromLocalStorage: PropTypes.func.isRequired,
};

export default FormComponent;
