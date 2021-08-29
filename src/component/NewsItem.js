import React, { Component } from 'react'

export default class NewsItem extends Component {
   render() {

      // let {title,description,imgUrl}=this.props;
      let { title, description, url, urlToImage, author, publishedAt, source } = this.props.article;

      this.dateFormatter = (date) => {
         let parsedDate = new Date(date)
         return parsedDate.toLocaleDateString() + " " + parsedDate.toLocaleTimeString()
      }

      return (
         <div className="my-3">
            <div className="card" >
               <span className="position-absolute  badge rounded-pill bg-danger">
                  {source.name}
               </span>
               <img src={urlToImage} className="card-img-top" alt="..." height="160px" />
               <div className="card-body">

                  <h5 className="card-title">{title && title.length > 45 ? title.slice(0, 45) + '...' : title}</h5>
                  <p className="card-text">{description && description.length > 100 ? description.slice(0, 100) + " ..." : description}</p>
                  <p className="card-text"><small className="text-muted">By {author ? author : "Unkown"} on {this.dateFormatter(publishedAt)}</small></p>
                  <a href={url} target="_blank" rel="noreferrer" className="btn btn-dark">Read More</a>
               </div>
            </div>
         </div>
      )
   }
}
