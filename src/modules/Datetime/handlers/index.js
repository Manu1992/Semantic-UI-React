import { getNativeDateHandler } from './native'
import { getMomentDateHandler } from './moment'

export const dateHandlers = {
  moment: getMomentDateHandler,
  native: getNativeDateHandler,
}

export function registerDateHandler(handler, func) {
  dateHandlers[handler] = func
}

export function getDateHandlerClass(handler, settings = {}) {
  return dateHandlers[handler](settings)
}

export function getDateHandler(handler, date, settings = {}) {
  return new getDateHandlerClass(handler, settings)(date)
}
