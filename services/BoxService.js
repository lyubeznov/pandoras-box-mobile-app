import uuid from 'uuid/v4'

export const COMMANDS = {
  PING: '/ping',

  POWER_ON: '/power',
  POWER_OFF: '/power',

  SET_COLOR: '/color',
  SET_BRIGHTNESS: '/brightness',

  SET_DEFAULT: '/default',

  GET_CONFIGURATION: '/configuration',
  SET_CONFIGURATION: '/configuration',
}

export default class BoxService {
  constructor(apiService) {
    this.apiService = apiService
  }

  ping = () => {
    const payload = uuid()

    return this.apiService.get(COMMANDS.PING, { payload }).then(res => payload === res)
  }

  powerOn = () => this.apiService.post(COMMANDS.POWER_ON, { status: 'on' })

  powerOff = () => this.apiService.post(COMMANDS.POWER_OFF, { status: 'off' })

  setColor = color => this.apiService.post(COMMANDS.SET_COLOR, {
    colorH: color.h,
    colorS: color.s,
    colorV: color.v,
  })

  setBrightness = brightness => this.apiService.post(COMMANDS.SET_BRIGHTNESS, { brightness })

  setDefault = () => this.apiService.post(COMMANDS.SET_DEFAULT)

  getConfiguration = () => this.apiService.get(COMMANDS.GET_CONFIGURATION)

  setConfiguration = configuration => this.apiService.post(COMMANDS.SET_CONFIGURATION, {
    brightness: configuration.brightness,
    colorH: configuration.color.h,
    colorS: configuration.color.s,
    colorV: configuration.color.v,
  })
}
