import React, { Component } from 'react'
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

const getAllCaliRSVPs = superSecret => {
  return new Promise((resolve, reject) => {
    axios
      .post(`https://rsvp.somewhataccurate.com/calidash`, {secret:superSecret})
      .then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};

export default class CaliDash extends Component {
  state = {
    superSecret: '',
    caliResults: '',
    gridOptions: {
      columnDefs: [
      { headerName: "Names", field: "guestName", sortable: true, resizable: true, filter: 'agTextColumnFilter'}, 
      { headerName: "Attendance Count", field: "count", sortable: true, resizable: true }],
    rowData: [],
    }
  }
  handleSecretInput = e => {
    this.setState({
      [e.target.name]: [e.target.value],
    });
  };
  handleDataFetch = e => {
    e.target.disabled = true;
    e.persist();
    getAllCaliRSVPs(this.state.superSecret)
      .then(res => {
        this.setState(prevState=>{return {caliResults:res, gridOptions: {...prevState.gridOptions, rowData:res}}})
      })
      .catch(err=>{
        e.target.disabled = false;
        this.setState({
          error: true,
        });
        setTimeout(() => this.setState({ error: false }), 5000);
      })
  }
  onGridReady = (params) => {
    this.api = params.api;
    this.columnApi = params.columnApi;
    this.api.sizeColumnsToFit()
  }
  render() {
    const caliResults = this.state.caliResults;
    return (
      <>
      {!caliResults && (
        <div className='dashboardContainer'>
          <div>
            <label style={{ textAlign: 'center' }} htmlFor='superSecret'>
              Secret Word:
            </label>
            <br />
            <input
              name='superSecret'
              type='text'
              id='superSecret'
              onChange={this.handleSecretInput}
            />
            </div>
            <button id='secretButt' onClick={this.handleDataFetch}>
              Submit
            </button>
            {this.state.error ? (
              <>
                <h3>Uhh...that's not right...</h3>
                <img
                  alt='no no no'
                  src='https://media.giphy.com/media/1zSz5MVw4zKg0/giphy.gif'
                />
              </>
            ) : (
              ''
            )}
          </div>
          )}
      {caliResults && (
        <>
        <h2>Total Guest Count: {caliResults.reduce((acc, rsvp)=>{return acc+rsvp.count},0)}</h2>
        {console.log(caliResults)}
        {console.log(caliResults.reduce((acc, rsvp)=>{return acc+rsvp.count},0))}
        <div className="ag-theme-balham" style={{ height: '80vh', width: '95vw' }} >
          <AgGridReact
            gridOptions={this.state.gridOptions} onGridReady={this.onGridReady}>
          </AgGridReact>
        </div>
        </>
      )}
      </>
    )
  }
}

