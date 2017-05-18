import Layout from '../components/layout';

export default () => (
  <Layout title="Login">
    <form>
      <input type="text" name="login" placeholder="Login" /><br />
      <input type="password" name="password" placeholder="Password" /><br />
      <button type="submit"></button>
    </form>
  </Layout>
);
