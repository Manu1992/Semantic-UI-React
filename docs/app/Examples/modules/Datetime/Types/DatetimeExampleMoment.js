import React from 'react'
import { Datetime } from 'semantic-ui-react'
import moment from 'moment-timezone'
import 'moment/locale/en-gb'

const DatetimeExampleMoment = () => (
  <Datetime
    time
    dateHandler='moment'
    defaultValue={moment.tz('2017-04-24T12:35', 'Europe/London')}
    name='date_field'
    onChange={(e, {value}) => {
      console.log("Date selected:", value)
    }}
  />
)

export default DatetimeExampleMoment
