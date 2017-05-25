import PropTypes from 'prop-types'
import React, { Component } from 'react'
import CalendarMenu from './CalendarMenu'
import Month from './Month'
import Months from './Months'
import Years from './Years'
import Hours from './Hours'
import Minutes from './Minutes'

import {
  // AutoControlledComponent as Component,
  customPropTypes,
  META,
} from '../../lib'

const style = {
  float: 'left',    // for side-by-side calendar ranges
  width: '20em',
}

/**
 * A <Datetime/> allows a user to select a calendar date and/or time as well
 * as handle date ranges.
 * @see Form
 */
export default class Calendar extends Component {
  static _meta = {
    name: 'Calendar',
    parent: 'Datetime',
    type: META.TYPES.MODULE,
  }

  static propTypes = {
    /** Textual context constants. */
    content: PropTypes.object,

    /** Enables date selection. */
    date: PropTypes.bool,

    /**
     * Formats the date string in the input and calendar.
     *
     * @param {date} - A date object.
     * @returns {string} - A formatted date string.
     */
    dateFormatter: PropTypes.func,

    // TODO doc
    dateHandler: PropTypes.func,

    /** The initial value for selectionEnd. */
    defaultSelectionEnd: customPropTypes.DateValue,

    /** The initial value for selectionStart. */
    defaultSelectionStart: customPropTypes.DateValue,

    /** Initial value for value. */
    defaultValue: PropTypes.arrayOf(customPropTypes.DateValue),

    /** Initial value for mode. */
    defaultMode: PropTypes.arrayOf(customPropTypes.DateValue),

    /** An array of dates that should be marked disabled in the calendar. */
    disabledDates: PropTypes.arrayOf(customPropTypes.DateValue),

    /** First day of the week (Sunday = 0, Monday = 1). */
    firstDayOfWeek: PropTypes.number,

    /** Current calendar mode. */
    mode: PropTypes.oneOf(['minute', 'hour', 'day', 'month', 'year']),

    /** Handler fired when a date is selected. */
    onDateSelect: PropTypes.func,

    /** Handler fired when a month is changed. */
    onChangeMonth: PropTypes.func,

    /** Handler fired when a year is changed. */
    onChangeYear: PropTypes.func,

    // TODO what is this used for and what type is it?
    page: PropTypes.any,

    /** Render two calendars for selecting the start and end of a range. */
    range: PropTypes.bool,

    /** Dates until or at selectionEnd are marked as selected. */
    selectionEnd: customPropTypes.DateValue,

    /** Dates at or after selectionStart are marked as selected. */
    selectionStart: customPropTypes.DateValue,

    /** Enables time selection. */
    time: PropTypes.bool,

    /**
     * Formats the time string in the input and calendar.
     *
     * @param {date} - A date object.
     * @returns {string} - A formatted time string.
     */
    timeFormatter: PropTypes.func,

    /** Current value as a Date object or a string that can be parsed into one. */
    value: customPropTypes.DateValue,
  }

  static defaultProps = {
    disabledDates: [],
    firstDayOfWeek: 1,
    date: true,
    time: true,
    range: false,
    mode: 'day',
    selectionStart: null,
    selectionEnd: null,
  }

  // static autoControlledProps = [
  //   'value',
  //   'mode',
  //   'selectionStart',
  //   'selectionEnd',
  // ]

  constructor(props) {
    super(props)
    const { dateHandler } = props
    this.Date = dateHandler
    // const initialValue = new this.Date(new Date()).getDate()
    // this.state = {
    //   value: initialValue,
    //   mode: this.getInitialMode(props),
    // }
  }

  // getInitialMode(props) {
  //   const { date, time } = props
  //   return !date && time ? 'hour' : 'day'
  // }

  getYear = () => new this.Date(this.props.value).year()
  getMonth = () => new this.Date(this.props.value).month()
  getHour = () => new this.Date(this.props.value).hours()
  getDate = () => new this.Date(this.props.value).day()

  getMonthName() {
    const { content } = this.props
    return content.months[this.getMonth()]
  }

  setMonth = (e, props) => {
    console.log('Calendar setMonth()', props)
    e.stopPropagation()
    const { value, page } = props
    const { onDateSelect } = this.props
    const nextMode = 'day'
    const date = new this.Date(this.props.value)
    const month = !value && page
      ? date.month() + page
      : value

    date.month(month)
    onDateSelect(e, date.getDate(), nextMode)
    // this.trySetState({
    //   value: date.getDate(),
    //   mode: nextMode,
    // })
    // if (this.props.onChangeMonth) {
    //   this.props.onChangeMonth(date.day())
    // }
  }

  setYear = (e, year, nextMode = 'day') => {
    e.stopPropagation()
    const { value, onDateSelect } = this.props
    const date = new this.Date(value)
    date.year(year)
    onDateSelect(e, date.getDate(), nextMode)
  }

  setHour = (e, hour, nextMode = 'minute') => {
    e.stopPropagation()
    const { value, onDateSelect } = this.props
    const date = new this.Date(value)
    date.hours(hour)
    onDateSelect(e, date.getDate(), nextMode)
  }

  setMinute = (e, minute) => {
    e.stopPropagation()
    const { onDateSelect, value } = this.props
    const date = new this.Date(value)
    date.minutes(minute)
    const nextMode = this.props.range ? ' day' : null
    onDateSelect(e, date.getDate(), nextMode)
  }

  setDay = (e, day) => {
    e.stopPropagation()
    const { onDateSelect, time, range, value } = this.props
    const date = new this.Date(value)
    date.day(day)

    const selectedDate = date.getDate()
    const nextMode = time ? 'hour' : null
    onDateSelect(e, selectedDate, nextMode, range ? date : null)
  }

  page = (direction) => (e) => {
    e.stopPropagation()
    const { mode } = this.props
    switch (mode) {
      case 'day':
        this.setMonth(e, { page: direction })
        break

      case 'month':
        this.setYear(e, this.getYear() + direction, mode)
        break

      case 'year':
        this.setYear(e, this.getYear() + (direction * 16), mode)
        break

      default:
        break
    }
  }

  /**
   * Change the calendar mode from day to month or year selection
   *
   * @param {string} mode - One of day, month or year
   * @param {SyntheticEvent} e
   */
  changeMode = (mode, e) => {
    e.stopPropagation()
    const { value, onDateSelect } = this.props
    onDateSelect(e, value, mode)
  }

  /**
   * Returns the calendar body content
   */
  renderBody() {
    const {
      content,
      firstDayOfWeek,
      dateFormatter,
      disabledDates,
      mode,
      value,
      selectionStart,
      selectionEnd,
      timeFormatter,
    } = this.props

    switch (mode) {
      case 'day':
        return (
          <Month
            firstDayOfWeek={firstDayOfWeek}
            dateHandler={this.Date}
            content={content}
            onClick={this.setDay}
            date={value}
            selectionStart={selectionStart}
            selectionEnd={selectionEnd}
            disabledDates={disabledDates}
          />
        )

      case 'month':
        return <Months content={content} onClick={this.setMonth} />

      case 'year':
        return <Years year={this.getYear()} onClick={this.setYear} />

      case 'hour':
        return <Hours onClick={this.setHour} />

      case 'minute':
        return <Minutes onClick={this.setMinute} hour={this.getHour()} />

      default:
        return null
    }
  }

  render() {
    const { date, mode } = this.props
    const calendarDay = this.getDate()

    return (
      <div style={style}>
        {date && (
          <CalendarMenu
            value={calendarDay}
            monthName={this.getMonthName()}
            year={this.getYear()}
            mode={mode}
            onPrevious={this.page(-1)}
            onNext={this.page(1)}
            onChangeMode={this.changeMode}
          />
        )}
        {this.renderBody()}
      </div>
    )
  }
}
