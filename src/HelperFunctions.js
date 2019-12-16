/* eslint-disable no-loop-func */
export const sanitizeData = (array) => {
    const data = array.map(element => {
        return element = element.filter(nestedElement => nestedElement !== '')
    })
    const info = data.filter(element => element.length > 1)
    return info
}


function randomNumber(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomDateGenerator(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}


function randomDate(start, duration = 0, variance = 0) {
    let year = start.getFullYear()
    let month = start.getMonth()
    let day = start.getDate()
    let hours = parseInt(start.getHours()) + parseInt(duration) + parseInt((randomNumber(0, variance)))
    let minutes = randomNumber(0, 60)
    let generatedDate = new Date(year, month, day, hours, minutes)
    return generatedDate
}

export const GenerateData = (attributes, events, timelines) => {
    let generatedData = []
    let sanitized_attributes = sanitizeData(attributes)
    let sanitized_events = sanitizeData(events)
    let sanitized_timelines = sanitizeData(timelines)
    const generateAttributes = () => {
        let additionalAttributesToPush = [];
        for (let k = 0; k < sanitized_attributes.length; k++) {
            let eachRow = sanitized_attributes[k].slice(2);
            let randomAttribute = eachRow[Math.floor(Math.random() * eachRow.length)]
            additionalAttributesToPush.push(randomAttribute)
        }
        return additionalAttributesToPush
    }
    let timeLineId = 10000;
    sanitized_timelines.forEach(row => {
        for (let i = 0; i < row[0]; i++) {
            let date = randomDateGenerator(new Date(2012, 0, 1), new Date(2019, 0, 1))
            for (let k = 1; k < row.length; k++) {
                let duration = parseInt(sanitized_events[row[k] - 1][1] ? sanitized_events[row[k] - 1][1] : 0)
                let variance = parseInt(sanitized_events[row[k] - 1][2] ? sanitized_events[row[k] - 1][2] : 0)
                let attributesToPush = generateAttributes()
                generatedData = [...generatedData, [date.toLocaleString(), timeLineId, sanitized_events[(row[k] ? row[k] : []) - 1][0], ...attributesToPush]]
                let newlyGenerated = randomDate(date, duration, variance)
                date = newlyGenerated
            }
            date = randomDateGenerator(new Date(2012, 0, 1), new Date(2019, 0, 1))

            timeLineId++;
        }
    });
    let header = sanitized_attributes.map(attribute => attribute[0])
    header = ['Date', 'TimelineID', 'Event', ...header]
    generatedData.unshift(header)
    return generatedData
}