import React from 'react';
import { Chart } from "react-google-charts";


const DashCharts = (props: any) => {
    // Chart Lib: https://www.react-google-charts.com/examples/column-chart
    // NPM: https://www.npmjs.com/package/react-google-charts#listen-to-chart-events
    // Details: https://developers.google.com/chart/interactive/docs/gallery/columnchart


    const { data, options } = props;
    let defaultOptions = {
        legend: { position: "right", textStyle: { fontSize: 10 } },
        vAxis: {
            textPosition: 'in',
            textStyle: { color: 'transparent' },
            gridlines: {
                count: 0
            },

            titleTextStyle: { color: '#371BB1', bold: true, italic: false },
        },
        hAxis: {
            titleTextStyle: { color: '#371BB1', bold: true, italic: false },
            textStyle: { color: '#371BB1', bold: true, italic: false, fontSize: 12 },
        },
        isStacked: true,
    }

    console.log(mergeDeep(options, defaultOptions));

    return (
        <React.Fragment>
            {
                (data && options) ?
                    <Chart
                        chartType="ColumnChart"
                        width="100%"
                        height="500px"
                        data={data}
                        options={mergeDeep(options, defaultOptions)}
                    /> :
                    <div style={{ color: 'red' }}>
                        {!data ? 'No Data Found!' : !options ? 'No options were provided!' : 'Invalid Information'}
                    </div>
            }
        </React.Fragment>
    );
};

export const mergeDeep = (a: Object, b: Object): Object => {
    return Object.entries(b).reduce((o: any, [k, v]) => {
        o[k] = v && typeof v === 'object'
            ? mergeDeep(o[k] = o[k] || (Array.isArray(v) ? [] : {}), v)
            : v;
        return o;
    }, a);
}

export default DashCharts;
