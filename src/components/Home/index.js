import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TeamCard from '../TeamCard'

import './index.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

class Home extends Component {
  state = {
    teams: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getIplTeamsData()
  }

  getIplTeamsData = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const iplData = await response.json()

    const filteredData = iplData.teams.map(eachIplTeam => ({
      id: eachIplTeam.id,
      name: eachIplTeam.name,
      teamImageUrl: eachIplTeam.team_image_url,
    }))

    console.log(filteredData)

    this.setState({
      teams: filteredData,
      isLoading: false,
    })
  }

  renderLoader = () => (
    <div testid="loader">
      <Loader
        className="loader"
        type="Oval"
        color="#ffffff"
        height={50}
        width={90}
      />
    </div>
  )

  renderTeamsList = () => {
    const {teams} = this.state

    return (
      <ul className="teams-list">
        {teams.map(eachTeam => (
          <TeamCard key={eachTeam.id} iplTeamDetails={eachTeam} />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <div className="app-container">
        <div className="container">
          <div className="ipl-heading-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
              alt="ipl logo"
              className="ipl-logo"
            />
            <h1 className="ipl-heading">IPL Dashboard</h1>
          </div>
          {isLoading ? this.renderLoader() : this.renderTeamsList()}
        </div>
      </div>
    )
  }
}

export default Home
