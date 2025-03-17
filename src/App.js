import logo from './logo.svg';
import Form from './components/Form';
import MainNavbar from './components/MainNavbar';
import './App.css';

function App() {
  return (
    <>
      <div className="container-fluid jutstify-conent-center">
        <MainNavbar></MainNavbar>
        <Form></Form>
      </div>
    </>
  );
}

export default App;
