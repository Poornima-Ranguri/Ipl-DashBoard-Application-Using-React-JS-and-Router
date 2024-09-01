import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'

import './index.css'

class TeamMatches extends Component {
  state = {
    isLoading: true,
    teamBannerUrl: '',
    latestMatchDetails: {},
    recentMatches: [],
    id: '',
  }

  componentDidMount() {
    this.getMatchData()
  }

  getMatchData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()
    console.log(data)

    const teamBannerUrl = data.team_banner_url
    const latestMatchDetails = {
      competingTeam: data.latest_match_details.competing_team,
      competingTeamLogo: data.latest_match_details.competing_team_logo,
      date: data.latest_match_details.date,
      firstInnings: data.latest_match_details.first_innings,
      id: data.latest_match_details.id,
      manOfTheMatch: data.latest_match_details.man_of_the_match,
      matchStatus: data.latest_match_details.match_status,
      result: data.latest_match_details.result,
      secondInnings: data.latest_match_details.second_innings,
      umpires: data.latest_match_details.umpires,
      venue: data.latest_match_details.venue,
    }

    const recentMatches = data.recent_matches.map(eachTeam => ({
      competingTeam: eachTeam.competing_team,
      competingTeamLogo: eachTeam.competing_team_logo,
      date: eachTeam.date,
      firstInnings: eachTeam.first_innings,
      id: eachTeam.id,
      manOfTheMatch: eachTeam.man_of_the_match,
      matchStatus: eachTeam.match_status,
      result: eachTeam.result,
      secondInnings: eachTeam.second_innings,
      umpires: eachTeam.umpires,
      venue: eachTeam.venue,
    }))

    this.setState({
      teamBannerUrl,
      latestMatchDetails,
      recentMatches,
      isLoading: false,
      id,
    })
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="Oval" color="#ffffff" height={50} width={50} />
    </div>
  )

  renderTeamDetails = () => {
    const {teamBannerUrl, id, latestMatchDetails, recentMatches} = this.state

    return (
      <div className={id}>
        <img src={teamBannerUrl} alt="team banner" className="banner-logo" />
        <h3 className="latest-heading">Latest Matches</h3>
        <LatestMatch latestMatchDetails={latestMatchDetails} />
        <ul className="match-list-container">
          {recentMatches.map(eachMatch => (
            <MatchCard key={eachMatch.id} matchDetails={eachMatch} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {
      isLoading,
      teamBannerUrl,
      recentMatches,
      latestMatchDetails,
      id,
    } = this.state

    console.log(teamBannerUrl, latestMatchDetails, recentMatches, id)
    return (
      <div className={id}>
        {isLoading ? this.renderLoader() : this.renderTeamDetails()}
      </div>
    )
  }
}

export default TeamMatches
