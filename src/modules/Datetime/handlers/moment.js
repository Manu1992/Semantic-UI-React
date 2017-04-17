import moment from 'moment-timezone'
/**
 * A Date handler using moment.js to manage accessing Date values
 * using moment or moment-timezone objects.
 * The handler is pluggable and supports creating, reading and formatting
 * date values.
 * Note that a moment-timezone can facilitate date/time values in different
 * timezones which are not relying on the local machine's time zone setting.
 */
export function getMomentDateHandler(settings={}) {
  class DateHandler {
    static settings = settings
    constructor(date) {
      if (!date) {
        date = moment.tz()
      }
      if (date.tz && date.tz()) {
        this.timeZone = date.tz()
      } else {
        this.timeZone = settings.timeZone || null
      }
      this.set(date)
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
       if (date._isAMomentObject) {
        this.date = date
       } else {
         if (this.timeZone) {
           this.date = moment.tz(date, this.timeZone)
         } else {
           this.date = moment(date)
         }
       }
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
       if (this.date) {
         const settings = this.getSettings()
         if (settings.dateFormatter) {
           return settings.dateFormatter(this.date)
         }
         return this.date.format('L')
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
         return this.date.format('LT')
       } else {
         return ''
       }
     }

     /**
      * Returns a date of the first of the current month.
      * A new instance is created as moment mutates the date
      * when calling manipulation methods.
      */
     getFirstOfMonth(date) {
       date = date || this.date
       const newDate = moment.tz(date, date.tz())
       return newDate.startOf('month')
     }

     getWeekDay(date) {
       date = date || this.date
       return date.day()
     }

     /**
      * Returns the number of days in the month
      */
     daysInMonth(date) {
       date = date || this.date
       return date.daysInMonth()
     }

     /**
      * Create a new date, one month ago from current date.
      * A new instance is created as moment mutates the date
      * when calling manipulation methods.
      */
     lastMonth(date) {
       date = date || this.date
       const newDate = moment.tz(date, date.tz())
       return newDate.subtract(1, 'months')
     }

     /**
      * Returns a YYYYMMDD string representation of this date.
      * Used to create date signatures to determine disabled dates in a
      * calendar month
      */
     getDateString(date) {
       date = date || this.date
       return date.format('YYYYMMDD')
     }

     /**
      * Returns a list of YYYYMMMDD date signatures for a list of dates
      */
     getDateStrings(dates) {
       if (dates && dates.length) {
         return dates.map(date => this.getDateString(date))
       }
       return []
     }

     /**
      * Returns a new moment of yesterday's date
      */
     yesterday() {
       const newDate = moment.tz(this.date, this.date.tz())
       return newDate.subtract(1, 'days')
     }

     /**
      * Returns a new moment of tomorrow's date
      */
     tomorrow() {
       const newDate = moment.tz(this.date, this.date.tz())
       return newDate.add(1, 'days')
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
      return this.date.year(value)
    }

    /**
    * Get or set the month of the date
    */
    month(value) {
      return this.date.month(value)
    }

     /**
      * Get or set the date of the date
      */
     day(value) {
       return this.date.date(value)
     }

     /**
      * Get or set the hours of the date
      */
     hours(value) {
       return this.date.hours(value)
     }

     /**
      * Get or set the minutes of the date
      */
     minutes(value) {
       return this.date.minutes(value)
     }

     /**
      * Get or set the seconds of the date
      */
     seconds(value) {
       return this.date.seconds(value)
     }
  }
  return DateHandler
}
