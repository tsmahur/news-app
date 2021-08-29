import React, { Component } from 'react'
import Navbar from './component/Navbar'
import News from './component/News'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  // Link
} from "react-router-dom";
import PageNotFound from "./component/PageNotFound"

export default class App extends Component {

  constructor() {
    super();

    this.newsConfigData = { ///initial config for all
      pageSize: 9,
      category: 'general',
      country: 'in',
      apiKey:'0128039c06c347f88e2119671d1e4196',
      page:1, //default page
      // sortBy:
      //language
      //from
      //to
      //domain
      //sources
      //q
      resource: 'top-headlines'//top-headlines , everything , top-headlines/sources

    }

    this.state = {
      newsConfigData: this.newsConfigData
    }
  }

  setCountry =(country)=>{
    this.newsConfigData.country=country
    this.newsConfigData.page=1 //page should reset to 1 after country change
    console.log("setCountry method called : "+this.newsConfigData.country)
    this.setState({newsConfigData:this.newsConfigData})
  }

  render() {
    return (
      <div>

        <Router>
          <Navbar setCountry={this.setCountry}/>
          <Switch>
            <Route exact path="/" render={()=>(<Redirect to="/general"/>)}></Route>

            {/* not passing the category */}
            <Route exact path="/all"><News key="all" resource={"everything"} category={"all"} newsConfigData={this.state.newsConfigData} /></Route>

            <Route exact path="/general"><News key="general"  category={'general'} newsConfigData={this.state.newsConfigData} /></Route>

            <Route exact path="/business"><News key="business"  category={'business'} newsConfigData={this.state.newsConfigData} /></Route>
            <Route exact path="/entertainment"><News key="entertainment"  category={'entertainment'} newsConfigData={this.state.newsConfigData} /></Route>
            <Route exact path="/health"><News key="health"  category={'health'} newsConfigData={this.state.newsConfigData} /></Route>
            <Route exact path="/science"><News key="science"  category={'science'} newsConfigData={this.state.newsConfigData} /></Route>
            <Route exact path="/sports"><News key="sports"  category={'sports'} newsConfigData={this.state.newsConfigData} /></Route>
            <Route exact path="/technology"><News key="technology"  category={'technology'} newsConfigData={this.state.newsConfigData} /></Route>

            <Route >
              <PageNotFound/>
            </Route>
          </Switch>
          {/* <News  newsConfigData={this.state.newsConfigData}/> */}
          {/* <Sources></Sources> */}

        </Router>
      </div>
    )
  }
}