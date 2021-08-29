import React, { Component } from 'react'
import loadingIcon from './loadingIcon.gif'

export default class Spinner extends Component {
   render() {
      return (
         <div className="text-center">
            <img src={loadingIcon} alt="loading" />
         </div>
      )
   }
}
