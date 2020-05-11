import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Layout from '../../hoc/Layout/Layout';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

import * as actions from '../../store/actions/index';

class Auth extends Component {

  state = {
    authForm: {
      email: {
        config: {
          type: "email",
          label: "Email",
          placeholder: "example@domain.com",
          id: "email",
        },
        validation: {
          required: true
        },
        value: '',
        valid: false
      },
      password: {
        config: {
          type: "password",
          label: "Password",
          placeholder: "",
          id: "password",
        },
        validation: {
          required: true
        },
        value: '',
        valid: false
      }
    },
    formIsValid: false,
  }

  checkValidity = (value, rules) => {
    let isValid = true;
  
    if(!rules) {
      return true;
    }
  
    if(rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if(rules.minValue) {
      isValid = value >= rules.minValue && isValid;
    }

    if(rules.maxValue) {
      isValid = value <= rules.maxValue && isValid;
    }
  
    if(rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
  
    if(rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
  
    return isValid;
  };

  inputChangedHandler = (event, inputIdentifier) => {

    let formIsValid = true;

    //we create a clone of booking form
    const updatedAuthForm = {
      ...this.state.authForm
    }; 

    //we create a clone of each key of booking form (name, email, ....)
    const updatedFormElement = {
      ...updatedAuthForm[inputIdentifier]
    };

    //value of cloned key = event.target.value
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    //we attribute the cloned key updatedFormElement to each key of cloned booking form
    updatedAuthForm[inputIdentifier] = updatedFormElement;
    
    for (let inputIdentifier in updatedAuthForm) {
      formIsValid = updatedAuthForm[inputIdentifier].valid && formIsValid;
    }

    this.setState({authForm: updatedAuthForm, formIsValid: formIsValid});
  }

  logInHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(this.state.authForm.email.value, this.state.authForm.password.value)
  }

  render() {
    //We transform this.state.authForm in an array to use map (map is not usable on objects)
    const formElementsArray = [];
    for (let key in this.state.authForm) {
      formElementsArray.push({
        id: key,
        config: this.state.authForm[key]
      })
    }

    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to="/admin" />
    }

    let form = formElementsArray.map(formElement => {
      return (
        <Input 
          key={formElement.id}
          id={formElement.id}
          config={formElement.config.config}
          value={formElement.config.value}
          valid={formElement.config.valid}
          changed={(event) => this.inputChangedHandler(event, formElement.id)}            
        />
      );
    });

    if(this.props.loading) {
      form = <Spinner />
    }

    return (
      <Layout currentPathname={this.props.location.pathname}>
        {authRedirect}
        <div className="content">
          <div className="wrapper">
            <h1>Auth</h1>
            <form className="bookingForm">
              {form}
              <Button 
                type="submit" 
                class="btn -primary" 
                label="Connect" 
                disabled={!this.state.formIsValid}
                clicked={this.logInHandler} 
              />
            </form>
          </div>
        </div>
      </Layout>
    );
  }
}


const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    loading: state.auth.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password) => dispatch(actions.auth(email, password))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);