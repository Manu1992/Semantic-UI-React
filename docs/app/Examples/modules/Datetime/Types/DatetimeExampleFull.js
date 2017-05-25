import _ from 'lodash'
import React from 'react'
import { Datetime, Dropdown, Input, Table } from 'semantic-ui-react'

const DatetimeExampleFull = () => (
  <div>
    <Datetime time defaultValue={new Date()} />
    <div>
      <strong>Time</strong>
      <br />
      <br />
      <Dropdown
        pointing='top right'
        search
        selection
        icon={null} scrolling
        placeholder='hr'
        options={_.flatten(_.times(24, i => {
          const hour = (i + 1) % 12 || 12
          const ampm = hour < 12 ? 'am' : 'pm'
          return _.times(4, j => {
            const minute = _.padStart(j * 15, 2, '0')
            const time = `${hour}:${minute} ${ampm}`
            return { key: time, value: time, text: time }
          })
        }))}
      />
      <Table
        style={{ width: '250px' }}
        fixed
        singleLine
        unstackable
        // basic='very'
        attached='bottom'
        size='small'
        compact='very'
        textAlign='center'
      >
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan='2'>Hour</Table.HeaderCell>
            <Table.HeaderCell colSpan='2'>Minute</Table.HeaderCell>
            <Table.HeaderCell colSpan='2'>AM/PM</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell colSpan='6'>
              <strong>Hours</strong>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            {_.times(6, i => <Table.Cell selectable><a style={{ cursor: 'pointer' }}>{i + 1}</a></Table.Cell>)}
          </Table.Row>
          <Table.Row>
            {_.times(6, i => <Table.Cell selectable><a style={{ cursor: 'pointer' }}>{i + 7}</a></Table.Cell>)}
          </Table.Row>
          <Table.Row>
            <Table.Cell colSpan='6'>
              <strong>Minutes</strong>
            </Table.Cell>
          </Table.Row>
          {_.times(10, i => {
            return (
              <Table.Row>
                {_.times(6, j => {
                  const minute = (i * 10) + (j + 1)
                  return (
                    <Table.Cell selectable><a style={{ cursor: 'pointer' }}>{minute}</a></Table.Cell>
                  )
                })}
              </Table.Row>
            )
          })}
          <Table.Row>
            <Table.Cell colSpan='6'>
              <strong>AM/PM</strong>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell colSpan='3' selectable><a style={{ cursor: 'pointer' }}>AM</a></Table.Cell>
            <Table.Cell colSpan='3' selectable><a style={{ cursor: 'pointer' }}>PM</a></Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      {/*<div style={{ display: 'flex', flexDirection: 'row', width: '200px', height: '200px' }}>*/}
      {/*<div style={{ flex: '1', height: '100%', overflowY: 'scroll' }}>*/}
      {/*/!*{_.times(12, i => <Label basic>{i + 1}</Label>)}*!/*/}
      {/*</div>*/}
      {/*<div style={{ flex: '1', height: '100%', overflowY: 'scroll' }}>*/}
      {/*{_.times(60, i => <div key={i}>{i + 1}</div>)}*/}
      {/*</div>*/}
      {/*<div style={{ flex: '1', height: '100%', overflowY: 'scroll' }}>*/}
      {/*<div>am</div>*/}
      {/*<div>pm</div>*/}
      {/*</div>*/}
      {/*</div>*/}
    </div>
  </div>
)

export default DatetimeExampleFull
