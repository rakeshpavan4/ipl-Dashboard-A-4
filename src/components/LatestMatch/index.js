// Write your code here
import './index.css'

const LatestMatch = props => {
  const {details} = props
  const {
    umpires,
    result,
    manOfTheMatch,
    date,
    venue,
    competingTeam,
    competingTeamLogo,
    firstInnings,
    secondInnings,
  } = details

  return (
    <div className="container">
      <div>
        <p>{competingTeam}</p>
        <p>{date}</p>
        <p>{result}</p>

        <p>{venue}</p>
      </div>

      <div>
        <img src={competingTeamLogo} alt={`latest match ${competingTeam}`} />
      </div>

      <div>
        <h1>FirstInnings</h1>
        <p>{firstInnings}</p>
        <h1>SecondInnings</h1>
        <p>{secondInnings}</p>
        <h1>Man of the match</h1>
        <p>{manOfTheMatch}</p>
        <h1>Upmires</h1>
        <p>{umpires}</p>
      </div>
    </div>
  )
}

export default LatestMatch
