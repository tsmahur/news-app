import React, { Component } from 'react'

export default class CountrySelect extends Component {

   constructor() {
      super();
      this.state = {
         country: 'us'
      }
   }

   handleRadio = (event) => {
      console.log(event.target.value);
      
      //()=>{this.props.setCountry('us')
      // this.setState({ country: event.target.value })
      // console.log(this.state)
   }

   render() {
      return (
         <div>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
               Country
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
               <div className="modal-dialog">
                  <div className="modal-content">
                     <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Please select a country to see news</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                     </div>
                     <div className="modal-body" onChange={this.handleRadio.bind(this)}>


                        <div className="form-check">
                           <input className="form-check-input" type="radio" name="country" id="flexRadioDefault2"
                              value='in'
                           // checked 
                           />
                           <label className="form-check-label" htmlFor="flexRadioDefault2">
                              India
                           </label>
                        </div>
                        <div className="form-check">
                           <input className="form-check-input" type="radio" name="country" id="flexRadioDefault1"
                              value='us'
                           />

                           <label className="form-check-label" htmlFor="flexRadioDefault1">
                              Us
                           </label>
                        </div>
                     </div>

                     <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      )
   }
}
