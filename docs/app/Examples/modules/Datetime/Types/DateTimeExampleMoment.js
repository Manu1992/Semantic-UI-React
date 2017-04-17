import React from 'react'
import { Datetime } from 'semantic-ui-react'
import moment from 'moment-timezone';
import 'moment/locale/en-gb';

const DateTimeExampleMoment = () => (
    <Datetime
      time
      dateHandler='moment'
      defaultValue={moment.tz('2017-04-24T12:35', 'Europe/London')} />
)

export default DateTimeExampleMoment
