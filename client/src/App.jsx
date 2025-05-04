import RegistrationForm from "./components/RegistrationForm.jsx";
import MechanicRegistrationForm from "./components/MechanicRegistrationForm.jsx";
import UserLoginForm from "./components/UserLogin.jsx";
import AdminCheckButton from "./components/Admin.jsx";
function App() {
  return (
    <>
      <RegistrationForm />
      <MechanicRegistrationForm />
      <UserLoginForm />
      <AdminCheckButton />
    </>
  );
}

export default App;
