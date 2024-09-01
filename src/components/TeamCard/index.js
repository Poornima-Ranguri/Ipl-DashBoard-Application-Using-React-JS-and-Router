import {Link} from 'react-router-dom'
import './index.css'

const TeamCard = props => {
  const {team} = props
  const {name, teamImageUrl, id} = team
  return (
    <Link to={`/team-matches/${id}`} className="link-text">
      <li className="team-item">
        <img src={teamImageUrl} alt={name} className="banner" />
        <p className="text-banner">{name}</p>
      </li>
    </Link>
  )
}

export default TeamCard
