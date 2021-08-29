import React, { Component } from 'react'
import NewsItem from './NewsItem'
import SampleOutput from '../SampleOutput.json'
import Spinner from './Spinner'
import InfiniteScroll from "react-infinite-scroll-component";

export default class NewsScroll extends Component { //duplicate of News Componenet

   isOffline = true //change this to false to get data from fetch API  

   constructor(props) { //accepting props , if want to use in constructor
      super(props);     //passing props to parent React.Component class
      this.state = {
         isLoading: false,
         // page: this.props.newsConfigData.page, //first time only
         response: {
            articles:[],
            totalResults:0
         }
      };

      //setting title
      document.title = ` ${this.capitalize(this.props.category)} - News 24*7 `
   }

   capitalize = (string) => {
      if (!string) return ""
      return string.charAt(0).toUpperCase() + string.slice(1)
   }

   async componentDidMount() {
      this.fetchMoreData();
   }

   fetchMoreData = async () => {

      this.setState({
         isLoading: true,
         page: this.state.page + 1
      })

      let url;
      let q = 'bitcoin'
      url = `https://newsapi.org/v2/${this.props.resource}?&apiKey=${this.props.newsConfigData.apiKey}&page=${this.state.page}&pageSize=${this.props.newsConfigData.pageSize}&q=${q}`;

      let data;
      let parsedResponse;
      if (this.isOffline) {// for testing , to save request if news API :-)
         data = SampleOutput;
         parsedResponse = await data;
      }
      else {
         data = await fetch(url);
         parsedResponse = await data.json();
      }

      parsedResponse.articles=this.state.response.articles.concat(parsedResponse.articles)

      this.setState({
         isLoading: false,
         response: parsedResponse,
      })
   }

   render() {
      return (
         <div className="container my-3">
            <h2 className="text-center" style={{ margin: '20px 0px' }}>News - Top {this.capitalize(this.props.category)} Headlines</h2>

            <InfiniteScroll
               dataLength={this.state.response.articles.length}
               next={this.fetchMoreData}
               hasMore={this.state.response.articles.length !== this.state.response.totalResults}
               loader={<Spinner />}
            >
               <div className="row">
                  {this.state.response && this.state.response.articles && this.state.response.articles.map((article) => {
                     return (
                        <div className="col-md-4">
                           <NewsItem key={article.url} article={article} />
                        </div>
                     )
                  })}
               </div>
            </InfiniteScroll>
            <div>

            </div>

         </div>
      )
   }
}
