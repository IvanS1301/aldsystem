import { Link } from "react-router-dom"
import { useLeadsContext } from "../hooks/useLeadsContext"
import { useAuthContext } from '../hooks/useAuthContext'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import formatRelative from 'date-fns/formatRelative'

// Function to shorten ObjectId
const objectIdToShortId = (objectId) => {
  const hexString = objectId.toString();
  return hexString.substring(22, 26);
}

const AgentLeads = ({ lead }) => {
  const { dispatch } = useLeadsContext()
  const { userLG } = useAuthContext()

  const handleClick = async () => {
    if (!userLG) {
      return
    }

    const response = await fetch('/api/leads/' + lead._id, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${userLG.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: "DELETE_LEAD", payload: json})
    }
  }

  // Logging to check the values of createdAt and updatedAt
  console.log('createdAt:', lead.createdAt);
  console.log('updatedAt:', lead.updatedAt);

    return (
        <div className="lead-body">
        <table border={0} cellSpacing={0}>
        <tbody>
        <tr>
          <td className="ID">{objectIdToShortId(lead._id)}</td> {/* Display the ObjectId */}
          <td className="Name">{lead.name}</td>
          <td className="Type">{lead.type}</td>
          <td className="Phone">{lead.phonenumber}</td>
          <td className="Email">{lead.emailaddress}</td>
          <td className="Date">{formatRelative(new Date(lead.createdAt), 3, new Date())}</td>
          <td className="Date">{formatDistanceToNow(new Date(lead.updatedAt), 3, new Date(), { addSuffix: true })}</td>
          <td className="Date">{lead.callDisposition}</td>
          <td className="Date">{lead.remarks}</td>
          <td className="actionButtons">
            <Link to={`/agentview/${lead._id}`}><i className="fa-solid fa-eye"></i></Link>
            <button onClick={handleClick}><i className="fa-solid fa-trash"></i></button>
            <Link to={`/agentedit/${lead._id}`}><i className="fa-solid fa-pen-to-square"></i></Link>
          </td>
        </tr>
      </tbody>
        </table>
        </div>
    )
  }
  
  export default AgentLeads
