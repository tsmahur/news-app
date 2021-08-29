import React, { Component } from 'react'
import { Link } from "react-router-dom";
// import CountrySelect from './CountrySelect';
export default class Navbar extends Component {

  handleRadio = (event) => {
    console.log(event.target.value);
    this.props.setCountry(event.target.value)
    //()=>{this.props.setCountry('us')
    // this.setState({ country: event.target.value })
    // console.log(this.state)
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">News App</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/all">All</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/business">Business</Link></li>
                <li className="nav-item">
                  <Link className="nav-link" to="/entertainment">Entertainment</Link></li>
                <li className="nav-item">
                  <Link className="nav-link" to="/general">General</Link></li>
                <li className="nav-item">
                  <Link className="nav-link" to="/health">Health</Link></li>
                <li className="nav-item">
                  <Link className="nav-link" to="/science">Science</Link></li>
                <li className="nav-item">
                  <Link className="nav-link" to="/sports">Sports</Link></li>
                <li className="nav-item">
                  <Link className="nav-link" to="/technology">Technology</Link></li>
              </ul>


              {/* <CountrySelect setCountry={this.props.setCountry}/> */}

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

                      <div className="modal-body" onChange={this.handleRadio.bind(this)}> {/* binding */}
                        <div className="form-check">
                          <input className="form-check-input" type="radio" name="country" id="in"
                            value='in'
                          // checked 
                          />
                          <label className="form-check-label" htmlFor="in">
                            India
                          </label>
                        </div>
                        <div className="form-check">
                          <input className="form-check-input" type="radio" name="country" id="us" value='us' />
                          <label className="form-check-label" htmlFor="us">Us</label>
                        </div>

                        {/* ae
                        arataubebgbrcachcncocuczdeegfrgbgrhkhuidieilinitjpkrltlvmamxmyngnlnonzphplptrorsrusasesgsiskthtrtwuausveza */}

                      </div>

                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </nav>
      </div>
    )
  }
}
