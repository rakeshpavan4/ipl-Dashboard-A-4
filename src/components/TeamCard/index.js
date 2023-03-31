// Write your code here
import './index.css'

const TeamCard = props => {
  const {details} = props
  const {name, teamImageUrl} = details

  return (
    <li className="team-container">
      <img src={teamImageUrl} alt={name} />
      <h1>{name}</h1>
    </li>
  )
}

export default TeamCard
