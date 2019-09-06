import * as React from 'react'
import { RouteComponentProps } from 'react-router';
import { inject, observer } from 'mobx-react';
import FeedsStore from '../stores/FeedsStore';
import style from './Home.module.scss'
import { WingBlank, WhiteSpace, Button } from 'antd-mobile';

export interface HomeProps extends RouteComponentProps {
  feedsStore: FeedsStore
}

@inject('feedsStore')
@observer
class Home extends React.Component<HomeProps> {

  componentDidMount () {
    this.props.feedsStore.fetch()
  }

  onclickMore = () => {
    this.props.feedsStore.nextFetch()
  }

  renderItem (feed: any) {
    if (feed.plate_type !== 'feed') {
      return
    }
    const title = feed.feed.content
    return <li key={feed.feed.id}>{title}</li>
  }

  render () {
    console.log(style)
    return (
    <WingBlank>
      <h1 className={style.box}>feed 流展示</h1>
      {this.props.feedsStore.feeds.map(feed => this.renderItem(feed))}

      <WhiteSpace />
      <Button onClick={this.onclickMore}>加载更多</Button>
    </WingBlank>
    )
  }
}

export default Home
