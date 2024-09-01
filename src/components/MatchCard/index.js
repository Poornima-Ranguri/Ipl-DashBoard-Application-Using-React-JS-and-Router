import './index.css'

const MatchCard = props => {
  const {matchDetails} = props
  const {competingTeam, competingTeamLogo, result, matchStatus} = matchDetails
  const textClassName = matchStatus === 'Won' ? 'won-text' : 'lose-text'

  return (
    <li className="match-item-container">
      <img
        src={competingTeamLogo}
        alt={`competing team ${competingTeam}`}
        className="logo-match"
      />
      <p>{competingTeam}</p>
      <p>{result}</p>
      <p className={textClassName}>{matchStatus}</p>
    </li>
  )
}

export default MatchCard
