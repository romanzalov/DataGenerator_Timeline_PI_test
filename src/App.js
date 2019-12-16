import React from 'react';
import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.css';
import './App.css'
import ExcelTable from './ExcelTable';
import Button from 'antd/es/button';
import { GenerateData } from './HelperFunctions';
import { CSVLink } from "react-csv";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataFromEvents: Handsontable.helper.createEmptySpreadsheetData(1000, 1000),
      dataFromAttributes: Handsontable.helper.createEmptySpreadsheetData(1000, 1000),
      dataFromTimelines: Handsontable.helper.createEmptySpreadsheetData(1000, 1000),
      data4: Handsontable.helper.createEmptySpreadsheetData(25, 25),
      generatedData: '',
      loading: false
    }

    // this.bringStateUp = this.bringStateUp.bind(this)
    this.generateData = this.generateData.bind(this)
  }

  // async generateData() {
  //   console.log('this.state', this.state)
  //   this.setState({ loading: true })
  //   // this.setState({ loading: !this.state.loading })
  //   // const info = GenerateData(this.state.dataFromAttributes, this.state.dataFromEvents, this.state.dataFromTimelines)
  //   // console.log(info)
  //   // this.setState({ generatedData: info, data4: info })

  //   try {
  //     this.setState({ loading: true })
  //     const info = await axios.post('/api/generate', {
  //       attributes: this.state.dataFromAttributes,
  //       events: this.state.dataFromEvents,
  //       timelines: this.state.dataFromTimelines
  //     })
  //     const data = info.data
  //     console.log(info)
  //     this.setState({ loading: false, data4: data, generatedData: data })
  //   }
  //   catch (e) {
  //     console.log("Error:", e)
  //     this.setState({ loading: false })
  //   }
  // }
  generateData() {
    let info = '';
    // const worker = new Worker()
    this.setState({ loading: !this.state.loading })
    setTimeout(() => {
      info = GenerateData(this.state.dataFromAttributes, this.state.dataFromEvents, this.state.dataFromTimelines)
    }, 1);
    setTimeout(() => {
      this.setState({ generatedData: info, data4: info, loading: !this.state.loading })
    }, 1);
  }

  componentDidMount() {
    console.log('CONCURRENTLY!!!', window.navigator.hardwareConcurrency)
  }
  render() {
    return (
      <div>
        <div className='center-flex margin-25'>
          <Button
            type="primary"
            onClick={this.generateData}
            loading={this.state.loading}
            icon="global"
          >Generate Data</Button>
          {this.state.generatedData ? (<div style={{ marginLeft: '25px' }}>
            <CSVLink
              data={this.state.generatedData}
              filename={'Generated_Data.csv'}
              className="download_button"
            >Download Most Recently Generated File</CSVLink>
          </div>) : null}
        </div>
        <div className='excel-table-container'>
          <ExcelTable data={this.state.dataFromEvents} title={'Events'} headers={['Event', 'Duration', 'Variance']} />
          <ExcelTable data={this.state.dataFromAttributes} title={'Attributes'} />
          <ExcelTable data={this.state.dataFromTimelines} title={'Timelines'} />
          <ExcelTable data={this.state.data4} title={'Output'} />
        </div>
      </div>
    );
  }
}

export default App