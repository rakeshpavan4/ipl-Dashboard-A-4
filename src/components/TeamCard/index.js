// Write your code here
import {Link} from 'react-router-dom'
import './index.css'

const TeamCard = props => {
  const {iplTeamDetails} = props

  const {id, name, teamImageUrl} = iplTeamDetails

  return (
    <Link to={`/team-matches/${id}`} className="ipl-team-card">
      <li className="logo-and-team-container">
        <img src={teamImageUrl} alt={name} className="team-image" />
        <p className="team-name">{name}</p>
      </li>
    </Link>
  )
}

export default TeamCard
