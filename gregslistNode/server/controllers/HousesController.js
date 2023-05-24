import { houseService } from "../services/HousesService.js";
import BaseController from "../utils/BaseController.js";
import { Auth0Provider } from "@bcwdev/auth0provider";
export class HousesController extends BaseController {
  constructor() {
    super('api/houses')
    this.router
      .get('', this.getHouses)
      .get('/:houseId', this.getHouseById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createHouse)
      .put('/:houseId', this.editHouse)
      .delete('/:houseId', this.deleteHouse)

  }
  async getHouses(req, res, next) {
    try {
      const query = req.query
      const houses = await houseService.getHouses(query)
      return res.send(houses)
    } catch (error) {
      next(error)
    }
  }
  
 async getHouseById(req, res, next) {
try {
  const houseId = req.params.houseId
  const house = await houseService.getHouseById(houseId)
  return res.send(house)
} catch (error) {
  next(error)
}
}
 async createHouse(req, res, next) {
try {
  const houseData = req.body
  houseData.creatorId = req.userInfo.id
  const newHouse = await houseService.createHouse(houseData)
  res.send(newHouse)
} catch (error) {
  next(error)
}    
  }
async  editHouse(req, res, next) {
try {
  const houseData= req.body
  const houseId = req.params.houseId
  const userId = req.userInfo.id
  const editHouse = await houseService.editHouse(houseData,houseId,userId)
  res.send(editHouse)
} catch (error) {
  next(error)
}    
  }
async  deleteHouse(req, res, next) {
try {
  const houseId = req.params.houseId
  const userId = req.userInfo.id
  await houseService.deleteHouse(houseId, userId)
  return res.send('House is Gone')
} catch (error) {
  next(error)
}    
  }


}