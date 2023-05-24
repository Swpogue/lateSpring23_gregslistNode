import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class HousesService {
  async getHouses(query) {
    const houses = await dbContext.Houses.find(query)
    return houses
  }

  async getHouseById(houseId) {
    const house = dbContext.Houses.findById(houseId)
    if (!house) {
      throw new BadRequest("Unable to find House by Id")
    }
    return house
  }

  async createHouse(houseData) {
    const newHouse = await dbContext.Houses.create(houseData)
    return newHouse
  }

  async editHouse(houseData, houseId, userId) {
    const oldHouse = await this.getHouseById(houseId)
    if (oldHouse.creatorId != userId) {
      throw new Forbidden('Unauthorized to edit that House')
    }
    oldHouse.bedrooms = houseData.bedrooms || oldHouse.bedrooms
    oldHouse.bathroom = houseData.bathroom || oldHouse.bathroom
    oldHouse.squareFoot = houseData.squareFoot || oldHouse.squareFoot
    oldHouse.year = houseData.year || oldHouse.year
    oldHouse.description = houseData.description || oldHouse.description

    await oldHouse.save()
    return oldHouse
  }

  async deleteHouse(houseId, userId) {
    const house = await this.getHouseById(houseId)
    if (house.creatorId != userId) {
      throw new Forbidden('NOT A HOUSE YOU CAN DELETE!')
    }
await house.remove()
return
  }

}

export const houseService = new HousesService()