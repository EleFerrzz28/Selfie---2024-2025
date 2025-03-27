import logo from './logo.svg';
import Form from './components/Form';
import MainNavbar from './components/MainNavbar';
import Notes from "./pages/Notes";
import './App.css';

function App() {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="ps-0 pe-0 col col-lg-2 col-md-3">
            <MainNavbar></MainNavbar>
          </div>
          <div className="ps-0 col col-lg-10 col-md-9">
            <Notes></Notes>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
