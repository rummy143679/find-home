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
];

export default routes;