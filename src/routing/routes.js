import Home from "../Views/Home";
import Login from "../Views/Login";
import Registration from "../Views/Registration";
import Banner from "../Views/Banner";
import About from "../Views/About";
import Contact from "../Views/Contact";
import HouseCardDetails from "../componenets/HouseCardDetails";
import OwnerHome from "../Views/OwnerHome";
import EditHouseForm from "../Views/EditHouseForm";
import UploadHouse from "../Views/UploadHouse"
import Saved from "../Views/Saved";
import Applied from "../Views/Applied";
import Profile from "../componenets/Profile";
import HomeRequests from "../componenets/HomeRequests";

const routes = [
  { name: "Banner", path: "/", element: <Banner />, roles: ["Seller", "Rent"] },
  { name: "Login", path: "/login", element: <Login />, roles: ["Seller", "Rent"] },
  { name: "Registration", path: "/registration", element: <Registration />, roles: ["Seller", "Rent"] },
  { name: "Home", path: "/home", element: <Home />, isProtected: true, roles: ["Rent"] },
  { name: "Contact", path: "/contact", element: <Contact />, isProtected: true, roles: ["Seller", "Rent"] },
  { name: "About", path: "/about", element: <About />, isProtected: true, roles: ["Seller", "Rent"] },
  {name: "HouseCardDetails", path: "/details", element: <HouseCardDetails />, isProtected: true, roles: ["Rent"] },
  {name: "OwneHome", path: "/owner-home", element: <OwnerHome />, isProtected: true, roles: ["Seller"] },
  {name: "EditHouseForm", path: "/edit-house", element: <EditHouseForm />, isProtected: true, roles: ["Seller"] },
  {name: "UploadHouse", path: "/upload-house", element: <UploadHouse />, isProtected: true, roles: ["Seller"] },
  {name: "Saved", path: "/saved", element: <Saved />, isProtected: true, roles: ["Rent"] },
  {name: "Applied", path: "/applied", element: <Applied />, isProtected: true, roles: ["Rent"] },
  {name: "Profile", path: "/profile", element: <Profile />, isProtected: true, roles: ["Rent", "Seller"] },
  {name: "HomeRequests", path: "/requests", element: <HomeRequests />, isProtected: true, roles: ["Seller"] },
];

export default routes;