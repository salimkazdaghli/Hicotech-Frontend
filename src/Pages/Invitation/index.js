import React  , { useState , useEffect }from "react";
import "./invitation.css";
import {  Button } from "antd";
import Logo from "../../Assets/logo.svg";
import { useParams } from 'react-router-dom';
import { getInvitation , updateInvitation } from "../../Services/InvitationService";
import  Register  from "../Register/index" ;



const Invitation = () => {
 
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expiration , setExpiration] = useState(true);
  const [user, setUser] = useState(false);

  const [invi , setInvi ] = useState({
    userData : {
      firstName : ""
    },
    creacteBy : {
      firstName : "",
      lastName : "" ,
      email : ""
    }

  });
  
  async function updateInvi(id){
    await updateInvitation(id,{etat : "accepté"}).then(
      response => {
        //console.log(response.data)
      }
    );
  }

  function confirmer(){
    updateInvi(id);
    setUser(true)
    
  }
  
  async function invitation(id) {
      await getInvitation(id).then(response =>{
        setInvi(response.data);
        const expiration = new Date() < new Date(invi.dateExpiration) ;
        setExpiration(expiration);
        setLoading(true)
      }).catch((err) => {
        setLoading(true)
        setExpiration(true);
        if (err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError("erreur de serveur");
        }        
      });

      
  }

  useEffect(() => {
    invitation(id);
  }, []);

  return (
    
    <>
    {user && (
      <>
       <Register invi={invi} />
      </>
    )}
    {!user && (
      <>
    <div className="invitation">
      
      {loading && (<>
      
        <div  className="invitation-form">        
        <div className="logo-center">
          <img src={Logo} height={50} width={150} alt="" />
        </div>
        {expiration && <div>Invitation expiration</div> }
        {!expiration && (<>
        <div className="invitation-text">
                Bonjour {invi.userData.firstName },{ invi.creacteBy.firstName} { invi.creacteBy.lastName} ({ invi.creacteBy.email})  vous a invité au Hicotech
          
        </div>
        <Button type="primary" className="invitation-form-button" onClick={confirmer} >Confirmer</Button>
        <Button className="invitation-form-button">Supprimer</Button>
        </>)}

      </div>
    </>)}  
    </div>
    </>
    )}
    </>
  );


};

export default Invitation;
