import PropTypes from 'prop-types'
import React from 'react'

import {
  AutoControlledComponent as Component,
  customPropTypes,
  makeDebugger,
  META,
} from '../../lib'

import Calendar from './Calendar'
import DateRange from './DateRange'
import Input from '../../elements/Input/Input'
import Popup from '../Popup/Popup'
import { getDateHandlerClass } from './handlers'

const debug = makeDebugger('datetime')

/**
 * A <Datetime/> allows a user to select a calendar date and/or time as well
 * as handle date ranges.
 * @see Form
 */
export default class Datetime extends Component {
  static _meta = {
    name: 'Datetime',
    type: META.TYPES.MODULE,
  }
  static Range = DateRange

  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /**
     * Textual content for the various text element of the calendar.
     * {
     *   daysShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
     *   daysFull: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
     *   months: [
     *     'January',
     *     'February',
     *     'March',
     *     'April',
     *     'May',
     *     'June',
     *     'July',
     *     'August',
     *     'September',
     *     'October',
     *     'November',
     *     'December',
     *   ],
     *   monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', Nov', 'Dec'],
     *   today: 'Today',
     *   now: 'Now',
     *   am: 'AM',
     *   pm: 'PM',
     * }
     * @type {Object}
     */
    content: PropTypes.object,

    /** Enables date selection. */
    date: PropTypes.bool,

    /**
     * A function that will return a Date object as a formatted string in the
     * current locale. By default the Date will formatted as YYYY-MM-DD
     * @type {function}
     */
    dateFormatter: PropTypes.func,

    /** A disabled dropdown menu or item does not allow user interaction. */
    disabled: PropTypes.bool,

    /** An array of dates that should be marked disabled in the calendar. */
    disabledDates: PropTypes.arrayOf(customPropTypes.DateValue),

    /** Initial value of open. */
    defaultOpen: PropTypes.bool,

    /** Initial value as a Date object or a string that can be parsed into one. */
    defaultValue: customPropTypes.DateValue,

    /** An errored dropdown can alert a user to a problem. */
    error: PropTypes.bool,

    /** First day of the week. Can be either 0 (Sunday), 1 (Monday) **/
    firstDayOfWeek: PropTypes.number,

    /** Shorthand for Icon. */
    icon: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.object,
    ]),

    /** Do not allow dates after maxDate. */
    maxDate: customPropTypes.DateValue,

    /** Do not allow dates before minDate. */
    minDate: customPropTypes.DateValue,

    /** Name of the input field which holds the date value. */
    name: PropTypes.string,

    /**
     * Called when the user attempts to change the value.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props and proposed value.
     */
    // TODO: implement
    onChange: PropTypes.func,

    /**
     * Called when a close event happens.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onClose: PropTypes.func,

    /**
     * Called when an open event happens.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onOpen: PropTypes.func,

    /** Controls whether or not the dropdown menu is displayed. */
    open: PropTypes.bool,

    /** Placeholder text. */
    placeholder: PropTypes.string,

    /** Render two calendars for selecting the start and end of a range. */
    range: PropTypes.bool,

    /** Enables time selection. */
    time: PropTypes.bool,

    /**
     * A function that will return the time image of a Date object as a formatted
     * string in the current locale. By default the time will be formatted as HH:MM
     * @type {function}
     */
    timeFormatter: PropTypes.func,

    /** Current value as a Date object or a string that can be parsed into one. */
    value: customPropTypes.DateValue,
    /** Placeholder text. */
    dateHandler: PropTypes.string,
    timeZone: PropTypes.string,
    defaultMode: PropTypes.string,
    mode: PropTypes.string,
  }

  static autoControlledProps = [
    'open',
    'value',
    'mode',
  ]

  static defaultProps = {
    icon: 'calendar',
    dateHandler: 'native',
    content: {
      daysShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
      daysFull: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      today: 'Today',
      now: 'Now',
      am: 'AM',
      pm: 'PM',
    },
    disabledDates: [],
    dateFormatter: null, // defaultDateFormatter,
    timeFormatter: null,  // defaultTimeFormatter,
    date: true,
    time: true,
  }

  constructor(props) {
    super(props)
    const {
      dateHandler,
      dateFormatter,
      timeFormatter,
      timeZone,
    } = this.props
    // set Date as the date handler for this instance
    this.Date = getDateHandlerClass(dateHandler, {
      dateFormatter,
      timeFormatter,
      timeZone,
    })
    this.state = {
      mode: this.getInitialMode(),
    }
  }

  getInitialMode() {
    const { date, time } = this.props
    return !date && time ? 'hour' : 'day'
  }

  open = (e) => {
    debug('open()')

    const { onOpen } = this.props
    if (onOpen) onOpen(e, this.props)

    this.trySetState({ open: true })
  }

  close = (e) => {
    debug('close()')

    const { onClose } = this.props
    if (onClose) onClose(e, this.props)

    this.trySetState({
      open: false,
      mode: this.getInitialMode(),
    })
  }

  toggle = (e) => this.state.open ? this.close(e) : this.open(e)

  handleOpen = (e) => {
    debug('handleOpen()', e)
    const { onOpen } = this.props
    if (onOpen) onOpen(e, this.props)

    this.open(e)
  }

  handleClose = (e) => {
    debug('handleClose()', e)
    const { onClose } = this.props
    if (onClose) onClose(e, this.props)

    this.close(e)
  }

  handleDateSelection = (e, date, nextMode, rangeStart) => {
    debug('handleDateSelection()', date, e)
    console.log('handleDateSelection', date, nextMode, rangeStart)
    // const _date = new this.Date(date)
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
    // const selectedDate = _date.getDate()
    this.trySetState({
      value: date,
      mode: nextMode,
    })
    if (!nextMode) {
      this.close()
    }
  }

  onSetMonth = (value, nextMode) => {
    debug('onSetMonth()', value, nextMode)
    console.log('onSetMonth', value, nextMode)
    this.trySetState({
      value,
      mode: nextMode,
    })
  }

  /**
   * Return a formatted date or date/time string
   */
  getFormattedDate(value) {
    value = value || this.state.value
    const { date, time } = this.props
    const _date = new this.Date(value)
    if (date && time) {
      return _date.format()
    } else if (!date && time) {
      return _date.formatTime(value)
    }

    return _date.formatDate(value)
  }

  render() {
    debug('render state', this.state)
    const {
      disabled,
      error,
      content,
      firstDayOfWeek,
      icon,
      name,
      placeholder,
      time,
      date,
      timeFormatter,
      minDate,
      disabledDates,
    } = this.props
    const { open, value, mode } = this.state
    const inputElement = (
      <Input
        type='text'
        name={name}
        icon={icon}
        disabled={disabled}
        error={error}
        iconPosition='left'
        placeholder={placeholder}
        value={this.getFormattedDate(value)}
      />
    )
    return (
      <Popup
        openOnTriggerFocus
        closeOnDocumentClick
        // TODO: Fix close on trigger blur, it closes when clicking inside the calendar.
        // Calendar contents are changed on click, so Popup cannot find the clicked node within calendar.
        // If the clicked node is not within the Portal, it is considered a "blur" and closes.
        // Enable close on trigger blur after this is fixed.
        // Portal should be able to identify clicks within the portal even with no e.target, perhaps using x y coords.
        closeOnTriggerBlur={false}
        openOnTriggerMouseEnter={false}
        closeOnTriggerMouseLeave={false}
        openOnTriggerClick={false}
        closeOnTriggerClick={false}
        trigger={inputElement}
        position='bottom left'
        open={open}
        onOpen={this.handleOpen}
        onClose={this.handleClose}
      >
        <Calendar
          mode={mode}
          content={content}
          dateHandler={this.Date}
          onDateSelect={this.handleDateSelection}
          onChangeMonth={this.onSetMonth}
          timeFormatter={timeFormatter}
          firstDayOfWeek={firstDayOfWeek}
          time={time}
          date={date}
          minDate={minDate}
          disabledDates={disabledDates}
          value={value}
        />
      </Popup>
    )
  }
}
