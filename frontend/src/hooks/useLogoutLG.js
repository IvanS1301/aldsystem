import { useAuthContext } from './useAuthContext'
import { useLeadsContext } from "../hooks/useLeadsContext"

export const useLogoutLG = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: dispatchLeads } = useLeadsContext()

  const logoutLG = () => {
    // Retrieve the user token from local storage
    const userToken = localStorage.getItem('userLG') ? JSON.parse(localStorage.getItem('userLG')).token : null

    // Check if the token is available
    if (!userToken) {
      console.error('User token not found');
      return
    }

    // Set up headers with the authentication token
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userToken}`
    }

    // Send a request to the backend logout endpoint
    fetch('/api/userLG/logout', {
      method: 'POST',
      headers: headers
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Logout request failed')
      }
      // Clear user data from local storage
      localStorage.removeItem('userLG')
      // Dispatch logout action
      dispatch({ type: 'LOGOUT' })
   // Dispatch action to reset leads data
   dispatchLeads({ type: 'SET_LEADS', payload: null })
  })
  .catch(error => {
    console.error('Logout error:', error);
    // Handle any logout errors here
  })
}

  return { logoutLG }
}