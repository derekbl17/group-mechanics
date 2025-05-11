import React from 'react'
import { useAuth } from "../services/AuthContext"; 
import MechanicDisplay from '../components/MechanicDisplay';
import WorkshopDisplay from '../components/WorkshopDisplay';

const BasicPage = () => {
  const {user } = useAuth();
  return (
    <div>
      <h1>User Page</h1>
      <MechanicDisplay role={user.role}/>
      <WorkshopDisplay role={user.role}/>
    </div>
  )
}

export default BasicPage
