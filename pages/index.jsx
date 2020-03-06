import React from 'react'
import Link from 'next/link'
import Head from '../components/head'
import axios from 'axios'

export default class Home extends React.Component {
	state = {
		loaded: false,
		hotels: [],
		years: [],
		countries: [],
		countriesandhotels: [],
		filteredhotels: []
	}
	updateYearSearch(year) {
		this.setState({ filteredhotels: this.state.hotels.filter(c => c['Top Ten'].includes(year)) })
	}
	updateCountrySearch(cntry) {
		this.setState({ filteredhotels: this.state.hotels.filter(c => c.Country.toLowerCase().includes(cntry)) })
	}
	updateInputSearch(text) {
		this.setState({ filteredhotels: this.state.hotels.filter(c => c.Brand.includes(text)) })
	}
	componentDidMount() {
		axios.get("http://starlord.hackerearth.com/TopRamen", { crossDomain: true }).then(response => {
			this.setState({ loaded: true })
			this.setState({ hotels: response.data })
			this.setState({ filteredhotels: response.data })
		}).then(() => {
			var x = [];
			this.state.hotels.forEach(element => {
				x.push(element.Country)
			});
			return [... new Set(x)]
		}).then(cntry => {
			this.setState({ countries: cntry.sort() })
			var y = []
			this.state.hotels.forEach(element => {
				y.push(element['Top Ten'].split(" ")[0])
			});
			return [... new Set(y)]
		}).then((year) => {
			this.setState({ years: year.sort() })
			$('#yearsearch').dropdown({
				onChange: (text, value, $selectedItem) => {
					this.updateYearSearch(text)
				}
			});
			$('#countrysearch').dropdown({
				onChange: (text, value, $selectedItem) => {
					this.updateCountrySearch(text)
				}
			});

			var cah = []
			this.state.hotels.forEach(element => {
				cah.push({ category: element.Country, title: element.Brand })
			});
			return cah
		}).then(cah => {
			this.setState({ countriesandhotels: cah })
			$('.ui.search').search({
				type: 'category',
				source: this.state.countriesandhotels,
				onSelect: (result, response) => {
					this.updateInputSearch(result.title)
				}
			})
		})
	}
	render() {
		return (
			<React.Fragment>
				<Head title="Home" />
				<div className="ui inverted fixed menu" style={{ marginBottom: 0 }}>
					<div className="item" style={{ backgroundColor: 'black' }}>
						<i className="hand peace icon" style={{ color: 'white' }}></i>
					</div>
					<div className="header item">
						TopRamen Restaurants
					</div>

					<div className="right menu">
						<a className="active item">Home</a>
					</div>
				</div>
				<div className="ui segment raised" style={{ marginTop: '2.5em', paddingTop: '10vh', paddingBottom: '10vh', background: "url('/static/beautiful-restaurant-websites.jpg') #FAFAFA center right", backgroundSize: 'auto 100%', backgroundRepeat: 'no-repeat' }}>
					<div className="ui container">
						<h1>Browse Thousands of Restaurants Online</h1>
						<h5 style={{ marginTop: 0 }}>Search for your favorite restaurants all over the world</h5>
						<div className="ui search">
							<div className="ui icon input" style={{ width: '50%' }}>
								<input className="prompt" style={{ boxShadow: '0 3px 3px gray' }} type="text" placeholder="Search hotels by name..." />
								<i className="search icon"></i>
							</div>
							<div className="results"></div>
						</div>
						<br />
						<div className="ui teal floating labeled icon dropdown button raised" id="yearsearch">
							<i className="calendar alternate outline icon"></i>
							<span className="text">Search by Year</span>
							<div className="menu">
								{
									this.state.years.map(y =>
										<div className="item">
											{y}
										</div>)
								}
							</div>
						</div>
						<div className="ui orange floating labeled icon dropdown button" id="countrysearch">
							<i className="globe icon"></i>
							<span className="text">Search by Country</span>
							<div className="menu">
								{
									this.state.countries.map(y =>
										<div className="item">
											{y}
										</div>)
								}
							</div>
						</div>
					</div>
				</div>
				<div style={{ backgroundColor: 'aliceblue' }}>
					{
						this.state.loaded ?
							<div className="ui container">
								<div className="ui stackable three column grid">
									{
										this.state.filteredhotels.map(h =>
											<div className="column">
												<div className="ui fluid card raised">
													<div className="content">
														{
															h.Stars != 'NaN' ?
																<label style={{ float: 'right', color: 'teal' }}>{h.Stars} <i className="star icon"></i></label>
																:
																<label></label>
														}
														<div className="header" style={{ color: 'brown' }}>{h.Brand}</div>
														<div className="meta" style={{ minHeight: '3em' }}>{h.Variety}</div>
														<div className="description">
															<div className="ui three column grid">
																<div className="four wide column">
																	<i className="box icon"></i> {h.Style}
																</div>
																<div className="seven wide column">
																	<i className="globe icon"></i> {h.Country}
																</div>
																{
																	h['Top Ten'] != 'NaN' ? <div className="five wide column">
																		<i className="trophy icon" style={{ color: 'gold' }}></i> {h['Top Ten']}
																	</div> : ''
																}

															</div>
														</div>
													</div>
												</div>
											</div>
										)
									}

								</div>
							</div>
							:
							<div className="ui container">
								<div className="ui three column stackable grid">
									<div className="column">
										<div className="ui raised segment">
											<div className="ui placeholder">
												<div className="image header">
													<div className="line"></div>
													<div className="line"></div>
												</div>
												<div className="paragraph">
													<div className="medium line"></div>
													<div className="short line"></div>
												</div>
											</div>
										</div>
									</div>
									<div className="column">
										<div className="ui raised segment">
											<div className="ui placeholder">
												<div className="image header">
													<div className="line"></div>
													<div className="line"></div>
												</div>
												<div className="paragraph">
													<div className="medium line"></div>
													<div className="short line"></div>
												</div>
											</div>
										</div>
									</div>
									<div className="column">
										<div className="ui raised segment">
											<div className="ui placeholder">
												<div className="image header">
													<div className="line"></div>
													<div className="line"></div>
												</div>
												<div className="paragraph">
													<div className="medium line"></div>
													<div className="short line"></div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
					}
				</div>
				<div className="ui inverted vertical footer segment" style={{ marginTop: '1em' }}>
					<div className="ui center aligned container">
						<div className="ui stackable inverted divided grid">
							<div className="three wide column">
								<h4 className="ui inverted header">Group 1</h4>
								<div className="ui inverted link list">
									<a href="#" className="item">Link One</a>
									<a href="#" className="item">Link Two</a>
									<a href="#" className="item">Link Three</a>
									<a href="#" className="item">Link Four</a>
								</div>
							</div>
							<div className="three wide column">
								<h4 className="ui inverted header">Group 2</h4>
								<div className="ui inverted link list">
									<a href="#" className="item">Link One</a>
									<a href="#" className="item">Link Two</a>
									<a href="#" className="item">Link Three</a>
									<a href="#" className="item">Link Four</a>
								</div>
							</div>
							<div className="three wide column">
								<h4 className="ui inverted header">Group 3</h4>
								<div className="ui inverted link list">
									<a href="#" className="item">Link One</a>
									<a href="#" className="item">Link Two</a>
									<a href="#" className="item">Link Three</a>
									<a href="#" className="item">Link Four</a>
								</div>
							</div>
							<div className="seven wide column">
								<h4 className="ui inverted header">Footer Header</h4>
								<p>Extra space for a call to action inside the footer that could help re-engage users.</p>
							</div>
						</div>
						<div className="ui inverted section divider"></div>
						<h2><i className="hand peace centered icon"></i></h2>

						<div className="ui horizontal inverted small divided link list">
							<a className="item" href="#">Site Map</a>
							<a className="item" href="#">Contact Us</a>
							<a className="item" href="#">Terms and Conditions</a>
							<a className="item" href="#">Privacy Policy</a>
						</div>
					</div>
				</div>
			</React.Fragment>
		)
	}
}