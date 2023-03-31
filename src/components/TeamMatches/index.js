import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'

import './index.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

class TeamMatches extends Component {
  state = {
    recentMatchData: {},
    isLoading: true,
  }

  componentDidMount() {
    this.getRecentMatchDetails()
  }

  renderFormattedtMatchDetails = data => ({
    id: data.id,
    umpires: data.umpires,
    result: data.result,
    manOfTheMatch: data.man_of_the_match,
    date: data.date,
    venue: data.venue,
    competingTeam: data.competing_team,
    competingTeamLogo: data.competing_team_logo,
    firstInnings: data.first_innings,
    secondInnings: data.second_innings,
    matchStatus: data.match_status,
  })

  getRecentMatchDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)

    const fetchedData = await response.json()

    console.log(fetchedData)

    const updatedData = {
      teamBannerUrl: fetchedData.team_banner_url,
      latestMatch: this.renderFormattedtMatchDetails(
        fetchedData.latest_match_details,
      ),
      recentMatches: fetchedData.recent_matches.map(recentMatch =>
        this.renderFormattedtMatchDetails(recentMatch),
      ),
    }

    this.setState({recentMatchData: updatedData, isLoading: false})
  }

  getRecentMatchesList = () => {
    const {recentMatchData} = this.state
    const {recentMatches} = recentMatchData

    return (
      <ul className="recent-teams-list-container">
        {recentMatches.map(recentMatch => (
          <MatchCard key={recentMatch.id} details={recentMatch} />
        ))}
      </ul>
    )
  }

  renderRecentMatches = () => {
    const {recentMatchData} = this.state

    const {teamBannerUrl, latestMatch} = recentMatchData

    return (
      <div className="teams-matches-details-container">
        <img src={teamBannerUrl} alt="team banner" className="team-banner" />
        <LatestMatch details={latestMatch} />
        {this.getRecentMatchesList()}
      </div>
    )
  }

  renderLoader = () => (
    <div testid="loader">
      <Loader type="Oval" color="#ffffff" height={50} width={50} />
    </div>
  )

  getTeamClassName = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    switch (id) {
      case 'RCB':
        return 'rcb'
      case 'KKR':
        return 'kkr'
      case 'KXP':
        return 'kxp'
      case 'CSK':
        return 'csk'
      case 'RR':
        return 'rr'
      case 'MI':
        return 'mi'
      case 'SH':
        return 'srh'
      case 'DC':
        return 'dc'
      default:
        return ''
    }
  }

  render() {
    const {isLoading} = this.state
    const className = `match-details-container ${this.getTeamClassName()}`

    return (
      <div className={className}>
        {isLoading ? this.renderLoader() : this.renderRecentMatches()}
      </div>
    )
  }
}

export default TeamMatches
