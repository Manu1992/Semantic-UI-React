/**
 * A native javascript Date handler to manage accessing Date values
 * using Date objects. It is used as a replacement Date object when storing
 * state.
 * The handler is pluggable and supports creating, reading and formatting
 * date values.
 * Note that a native javascript Date takes on the timezone of the browser
 * and therefore is less suitable to support dates from varying time zones.
 */

export function getNativeDateHandler(settings={}) {
  class DateHandler {
    static settings = settings
    constructor(date) {
      if (date) {
        this.set(date)
      }
    }

    /**
     * Return the settings as provided by the closure
     */
    getSettings() {
      return settings
    }

    /**
     * re/set a new date on this instance
     */
    set(date) {
      this.date = new Date(date)
      return this
    }

    /**
     * Pad a number with a zero if it's one digit
     * @param  {number} n
     * @return {string} Returns the number padded with a zero if below 10
     */
    zeroPad(n) {
      return (n < 10 ? '0' : '') + n
    }

    /**
     * Returns a string formatted date/time value
     */
    format(formatString) {
      if (this.date) {
        return `${this.formatDate()} ${this.formatTime()}`
      } else {
        return ''
      }
    }

    /**
     * Returns a date formatted string
     */
    formatDate(formatString) {
      if (this.date && this.date != 'Invalid Date') {
        const settings = this.getSettings()
        if (settings.dateFormatter) {
          return settings.dateFormatter(this.date)
        }
        return `${this.date.getFullYear()}-${this.zeroPad(this.date.getMonth() + 1)}-${this.zeroPad(this.date.getDate())}`
      } else {
        return ''
      }
    }

    /**
     * Return a time formatted string
     */
    formatTime(formatString) {
      if (this.date) {
        const settings = this.getSettings()
        if (settings.timeFormatter) {
          return settings.timeFormatter(this.date)
        }
        return `${this.zeroPad(this.date.getHours())}:${this.zeroPad(this.date.getMinutes())}`
      } else {
        return ''
      }
    }

    getFirstOfMonth(date) {
      date = date || this.date
      return new Date(date.getFullYear(), date.getMonth(), 1)
    }

    getWeekDay(date) {
      date = date || this.date
      return date.getDay()
    }

    daysInMonth(date) {
      date = date || this.date
      return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
    }

    getDateString(date) {
      date = date || this.date
      return `${date.getFullYear()}${date.getMonth()}${date.getDate()}`
    }

    getDateStrings(dates) {
      if (dates && dates.length) {
        return dates.map(date => this.getDateString(date))
      }
      return []
    }

    /**
     * Return a date from the last month
     */
    lastMonth(date) {
      date = date || this.date
      const _date = new Date(date)
      _date.setMonth(date.getMonth() - 1)
      return _date
    }


    /**
     * Returns yesterday's date
     */
    yesterday() {
      const _date = new Date(this.date)
      _date.setDate(this.date.getDate() - 1)
      return _date
    }

    /**
     * Returns tomorrow's date
     */
    tomorrow() {
      const _date = new Date(this.date)
      _date.setDate(this.date.getDate() + 1)
      return _date
    }

    /**
     * Return a native Date object
     */
    getDate() {
      return this.date
    }

    /**
     * Get or set the year of the date
     */
    year(value) {
      if (value) {
        this.date.setFullYear(value)
      }
      return this.date.getFullYear()
    }

    /**
     * Get or set the month of the date
     */
    month(value) {
      if (value) {
        this.date.setMonth(value)
      }
      return this.date.getMonth()
    }

    /**
     * Get or set the date of the date
     */
    day(value) {
      if (value) {
        this.date.setDate(value)
      }
      return this.date.getDate()
    }

    /**
     * Get or set the hours of the date
     */
    hours(value) {
      if (value) {
        this.date.setHours(value)
      }
      console.log("NATIVE", this.date, this.date.getHours())
      return this.date.getHours()
    }

    /**
     * Get or set the minutes of the date
     */
    minutes(value) {
      if (value) {
        this.date.setMinutes(value)
      }
      return this.date.getMinutes()
    }

    /**
     * Get or set the seconds of the date
     */
    seconds(value) {
      if (value) {
        this.date.setSeconds(value)
      }
      return this.date.getSeconds()
    }
  }
  return DateHandler
}
