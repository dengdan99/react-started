import { observable, computed, action } from 'mobx'

export interface Coordinate {
  longitude: number,
  latitude: number,
  altitude?: number,
  accuracy?: number,
  speed?: number,
}

export interface Place {
  provinceName?: string,
  cityName?: string,
  areaName?: string,
  streetName?: string,
  address: string
}

class LocationStore {
  @observable public coords?: Coordinate
  @observable public place?: Place

  constructor () {
    this.getCoords()
  }

  @computed 
  get isFetchCoordinate (): boolean {
    return !!(this.coords && this.coords.longitude > 0)
  }

  @action
  getCoords (): Promise<Coordinate> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
          this.coords = {
            longitude: pos.coords.longitude,
            latitude: pos.coords.latitude,
            accuracy: pos.coords.accuracy,
          }
          return resolve(this.coords)
        })
      } else {
        reject(new Error('设备不支持'))
      }
    })
  }
}


export default LocationStore
