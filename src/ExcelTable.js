import React from 'react';
import { HotTable } from '@handsontable/react';
import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.css';
import './App.css'
import "antd/dist/antd.css";
import './App.css';
// import Button from 'antd/es/button';

export default class ExcelTable extends React.Component {
    constructor(props) {
        super(props);
        this.handsontableData = Handsontable.helper.createEmptySpreadsheetData(25, 25);
    }
    render() {
        return (
            <div>
                <h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{this.props.title}
                    {/* <Button type="primary" style={{ marginLeft: '50px' }} onClick={() => this.props.onReady(this.props.title, this.handsontableData)}>Ready</Button> */}
                </h1>
                <div className='excel-table center-flex'>
                    <HotTable
                        id="hot"
                        data={this.props.data}
                        rowHeaders={true}
                        licenseKey='non-commercial-and-evaluation'
                        width='45vw'
                        overflow='scroll'
                        height='45vh'
                        // colWidths={75}
                        // dropdownMenu={true}
                        colHeaders={this.props.headers ? this.props.headers : true}
                    />
                </div>
            </div>
        )
    }
}
