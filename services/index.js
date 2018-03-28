import APIService from './APIService'
import BoxService from './BoxService'

const APIServiceInstanse = new APIService()
const BoxServiceInstanse = new BoxService(APIServiceInstanse)

export {
  APIServiceInstanse as APIService,
  BoxServiceInstanse as BoxService,
}
