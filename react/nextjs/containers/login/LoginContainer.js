import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-final-form';
import Link from 'next/link';

import * as st from './LoginContainer.style';
import {
  Input,
  FormField,
  SubmitButton,
  Validators,
} from '../../components/Form';

export class LoginContainer extends React.Component {
  static propTypes = {
    actions: PropTypes.shape({
      login: PropTypes.func.isRequired,
      clearError: PropTypes.func.isRequired,
    }),
    processing: PropTypes.bool.isRequired,
  };

  componentWillUnmount() {
    const {
      actions: { clearError },
    } = this.props;
    clearError();
  }

  onSubmit = authData => {
    const { actions } = this.props;
    actions.login(authData);
  };

  render() {
    const { processing } = this.props;
    return (
      <Form
        onSubmit={this.onSubmit}
        render={({ handleSubmit }) => (
          <st.LoginFormCard>
            <form onSubmit={handleSubmit}>
              <FormField
                name="email"
                validate={Validators.required()}
                placeholder="Email"
                component={Input}
              />
              <FormField
                name="password"
                validate={Validators.required()}
                placeholder="Password"
                type="password"
                component={Input}
              />
              <st.SubmitButtonWrapper>
                <SubmitButton
                  type="primary"
                  htmlType="submit"
                  onClick={handleSubmit}
                  loading={processing}>
                  Sign In
                </SubmitButton>
              </st.SubmitButtonWrapper>
              <st.LinksWrapper>
                <Link href="/registration">Click to register</Link>
                <Link href="/forgotpassword">Forgot your password?</Link>
              </st.LinksWrapper>
            </form>
          </st.LoginFormCard>
        )}
      />
    );
  }
}
