import { observable, action } from 'mobx'
import { getFeeds } from '../../../api';

class FeedsStore {
  @observable feeds: any[]
  @observable page: number
  @observable size: number

  constructor () {
    this.page = 1
    this.size = 10
    this.feeds = []
  }

  @action
  fetch () {
    getFeeds({page: this.page}).then(res => {
      if (res.code === 0) {
        this.feeds.push(...res.data.feed)
      }
    })
  }

  @action
  nextFetch () {
    this.page ++
    this.fetch()
  }
}

export default FeedsStore
