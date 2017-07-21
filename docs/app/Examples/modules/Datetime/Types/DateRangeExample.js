import React from 'react'
import { Datetime } from 'semantic-ui-react'

const DateRangeExample = () => (
  <Datetime.Range
    defaultValue={[]}
    dateHandler='moment'
    name='date_range'
    onChange={(e, {rangeId, name, value}) => {
      console.log("Date selected: ", name, rangeId, value)
    }}
  />
)

export default DateRangeExample
// defaultSelectionStart={new Date('2017-02-28')}
// defaultSelectionEnd={new Date('2017-03-10')}/>
