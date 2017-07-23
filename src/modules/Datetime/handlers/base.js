/**
 * A root class for Date Handlers.
 * Any new Date handler can be plugged in if it supports the interface
 * provided by this base class.
 */

export default class BaseDateHandler {
  /**
   * The constructor receives a date or date parsable string as value
   * It can also receive a custom date/time formatter functions and
   * an optional timezone where relevant.
   */
  constructor(date, dateFormatter = null, timeFormatter = null, timeZone = null) {
    this.date = date
    this._dateFormatter = dateFormatter
    this._timeFormatter = timeFormatter
  }

  /**
   * Returns a string formatted date/time value
   */
  format(formatString) {}

  /**
   * Returns a date formatted string
   */
  formatDate(formatString) {}

  /**
   * Return a time formatted string
   */
  formatTime(formatString) {}

  /**
   * Returns yesterday's date
   */
  yesterday() {}

  /**
   * Returns tomorrow's date
   */
  tomorrow() {}

  /**
   * Return a native Date object
   */
  getDate() {}

  /**
   * Get or set the year of the date
   */
  year(value) {}

  /**
   * Get or set the month of the date
   */
  month(value) {}

  /**
   * Get or set the day (date) of the date
   */
  day(value) {}

  /**
   * Get or set the hours of the date
   */
  hours(value) {}

  /**
   * Get or set the minutes of the date
   */
  minutes(value) {}

  /**
   * Get or set the seconds of the date
   */
  seconds(value) {}
}
