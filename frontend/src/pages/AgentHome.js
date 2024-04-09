import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useLeadsContext } from "../hooks/useLeadsContext"
import { useAuthContext } from "../hooks/useAuthContext"

// components
import AGLeadDetails from "../components/AGLeadDetails"
import AgentLeads from "../components/AgentLeads"

const AgentHome = () => {
  const { leads, dispatch } = useLeadsContext()
  const { userLG } = useAuthContext()

  useEffect(() => {
    const fetchLeads = async () => {
      const response = await fetch('/api/leads', {
        headers: {'Authorization': `Bearer ${userLG.token}`},
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_LEADS', payload: json})
      }
    }

    fetchLeads()
  }, [dispatch, userLG])

    return (
      <div className="home">
      <div className="home-title">List of Leads</div>
      <Link to={"/add"} className="add-button">Add Lead</Link>
        <div className="leads">
        <AGLeadDetails />
          {leads && leads.map((lead) =>(
            <AgentLeads key={lead._id} lead={lead} />
          ))}
        </div>
      </div>
    )
  }
  
export default AgentHome