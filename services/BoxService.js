import uuid from 'uuid/v4'

export const COMMANDS = {
  PING: 'PING',

  POWER_ON: 'POWER_ON',
  POWER_OFF: 'POWER_OFF',

  SET_COLOR: 'SET_COLOR',
  SET_BRIGHTNESS: 'SET_BRIGHTNESS',

  SET_DEFAULT: 'SET_DEFAULT',

  GET_CONFIGURATION: 'GET_CONFIGURATION',
  SET_CONFIGURATION: 'SET_CONFIGURATION',
}

export default class BoxService {
  constructor(apiService) {
    this.apiService = apiService
  }

  sendCommand = (action, payload) => this.apiService.post('http://pandoras.box/command', {
    type: action,
    ...payload,
  })

  ping = () => {
    const payload = uuid()

    return this.sendCommand(COMMANDS.PING, { payload }).then(res => payload === res.pong)
  }

  powerOn = () => this.sendCommand(COMMANDS.POWER_ON)

  powerOff = () => this.sendCommand(COMMANDS.POWER_OFF)

  setColor = color => this.sendCommand(COMMANDS.SET_COLOR, color)

  setBrightness = brightness => this.sendCommand(COMMANDS.SET_BRIGHTNESS, brightness)

  setDefault = () => this.sendCommand(COMMANDS.SET_DEFAULT)

  getConfiguration = () => this.sendCommand(COMMANDS.GET_CONFIGURATION)

  setConfiguration = configuration => this.sendCommand(COMMANDS.SET_CONFIGURATION, configuration)
}
