import Button from 'react-uikit-button';
import Form from 'react-uikit-form';
import FormInput from 'react-uikit-form/lib/form-input';

import Layout from '../components/layout';

export default () => (
  <Layout title="Login">
    <Form layout="horizontal">
      <FormInput
        row
        label="Login"
        placeholder="Login"
      />

      <FormInput
        row
        label="Password"
        placeholder="*******"
        Password
      />

      <FormInput
        row
        type="button"
        button={{
          body: 'Login',
          type: 'submit',
          context: 'primary'
        }}
      />
    </Form>
  </Layout>
);
