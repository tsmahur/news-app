import React, { Component } from 'react'
import NewsItem from './NewsItem'
import SampleOutput from '../SampleOutput.json'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
// import NewsScroll from './NewsScroll'

export default class News extends Component {

   isOffline = true //change this to false to get data from fetch API  

   static defaultProps = { //default values for props
      category: 'general'
   }
   static propTypes = { //type checking on props
      category: PropTypes.string,
   }

   constructor(props) { //accepting props , if want to use in constructor
      super(props);     //passing props to parent React.Component class
      this.state = {
         isLoading: false,
         country: this.props.newsConfigData.country, //to compare the changes value
         page: this.props.newsConfigData.page, //first time only
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

   // async componentDidUpdate(){ //while country changed
   //    // this.setState({page: this.props.newsConfigData.page})
   //    console.log("inside update lifecycle of news component")
   //    console.log(this.props.newsConfigData)
   //    // if(this.state.country!==this.props.newsConfigData.country) this.getNews(1);
   // }
   async componentDidMount() {
      this.getNews(this.state.page) // default page is 1
   }

   //fetch API
   getNews = async (page) => {
      this.setState({ isLoading: true })
      let url;
      if (this.props.resource === 'everything' && this.props.category === 'all') {
         let q='bitcoin'
         url = `https://newsapi.org/v2/${this.props.resource}?&apiKey=${this.props.newsConfigData.apiKey}&page=${page}&pageSize=${this.props.newsConfigData.pageSize}&q=${q}`;
      }else {
         //reseting page ,if country changed and reseting country state
         if (this.state.country !== this.props.newsConfigData.country) {
            page = 1
            this.setState({ country: this.props.newsConfigData.country })
         }
         url = `https://newsapi.org/v2/${this.props.newsConfigData.resource}?country=${this.props.newsConfigData.country}&apiKey=${this.props.newsConfigData.apiKey}&page=${page}&pageSize=${this.props.newsConfigData.pageSize}&category=${this.props.category}`;
      }
      // let url2=new String("https://newsapi.org/v2/").append("test")
      console.log("rendered url in getNews ->>> " + url)

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
      this.setState({
         isLoading: false,
         response: parsedResponse,
         page: page
      })
   }

   pagination = (direction) => {
      if (direction === "next") {
         this.getNews(this.state.page + 1)
      }
      else if (direction === "previous") {
         this.getNews(this.state.page - 1)
      }
   }

   render() {
      // if(this.props.resource === 'everything') return (
      //    <NewsScroll key="all" resource={"everything"} category={"all"} newsConfigData={this.props.newsConfigData} />)

      // else 
      return (
         <div className="container my-3">
            <h2 className="text-center" style={{ margin: '20px 0px' }}>News - Top {this.capitalize(this.props.category)} Headlines</h2>

            {this.state.isLoading && <Spinner />}

            <div className="row">
               {!this.state.loading && this.state.response && this.state.response.articles && this.state.response.articles.map((article) => {
                  return (
                     <div className="col-md-4">
                        <NewsItem key={article.url} article={article} />
                     </div>
                  )
               })}
            </div>
            <div>
               <div className="d-flex justify-content-between">
                  <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={() => this.pagination("previous")}>&laquo; Previous</button>
                  <button
                     disabled={!this.state.response || !this.state.response.totalResults || (this.state.page * this.state.pageSize) >= this.state.response.totalResults}
                     type="button" className="btn btn-dark" onClick={() => this.pagination("next")}>Next &raquo;</button>
               </div>

               {/* <nav aria-label="Page navigation example">
                  <ul class="pagination justify-content-center ">
                     <li class="page-item">
                        <a class="page-link" href="#" aria-label="Previous">
                           <span aria-hidden="true">&laquo;</span>
                        </a>
                     </li>
                     <li class="page-item disabled ">
                        <a class="page-link" href="#" tabindex="-1" aria-disabled="true">Previous</a>
                     </li>
                     <li class="page-item "><a class="page-link" href="#">1</a></li>
                     <li class="page-item"><a class="page-link" href="#">2</a></li>
                     <li class="page-item active" aria-current="page">
                        <a class="page-link bg-dark" href="#">2</a>
                     </li>
                     <li class="page-item"><a class="page-link" href="#">3</a></li>
                     <li class="page-item">
                        <a class="page-link text-dark" href="#" aria-label="Next">
                           <span aria-hidden="true">&raquo;</span>
                        </a>
                     </li>
                  </ul>
               </nav> */}
            </div>
         </div>
      )
   }
}
