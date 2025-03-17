import logo from './logo.svg';
import Form from './components/Form';
import MainNavbar from './components/MainNavbar';
import Notes from "./pages/Notes";
import './App.css';

function App() {
  return (
    <>
      <div className="container-fluid justify-content-center">
        <MainNavbar numNotif = {13}></MainNavbar>
        <Notes></Notes>
      </div>
    </>
  );
}

export default App;
