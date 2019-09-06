import React from 'react';
import { storiesOf } from '@storybook/react';
import BrandSelection from './Index';
import { action } from '@storybook/addon-actions';
import { Button, WingBlank, WhiteSpace } from 'antd-mobile';
import { Provider } from 'mobx-react';
import BrandStore from '../../stores/components/BrandStore';
import { BrandSelectionItem } from './Types';

const stories = storiesOf('BrandSelection', module)

export const actions = {
  onOpenChange: action('onOpenChange'),
  onConfirm: action('onConfirm'),
  onSelect: action('onSelect'),
}

function mockFetch (): Promise<BrandSelectionItem[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve([
        {id: 1, name: '外部传入品牌1', icon: '', selected: false, ext: { otherData: 'otherData'}},
        {id: 2, name: '外部传入品牌2', icon: '', selected: false, ext: { otherData: 'otherData'}},
        {id: 3, name: '外部传入品牌3', icon: '', selected: false, ext: { otherData: 'otherData'}},
      ])
    }, 5000)
  })
}

const brandStore = new BrandStore

stories
  .addDecorator(story => <Provider brandStore={brandStore}>{story()}</Provider>)
  .add(
    '默认使用',
    () => <BrandSelectionAndButtonStory></BrandSelectionAndButtonStory>
  )
  .add(
    '事件返回值（Action）',
    () => <BrandSelection open={true} {...actions} />
  )
  .add(
    '外部导入品牌  interface: BrandSelectionItem[]',
    () => <InjectData></InjectData>
  )



class BrandSelectionAndButtonStory extends React.Component {
  readonly state = {
    open: false
  }
  render () {
    return (
        <BrandSelection
          open={this.state.open}
          onOpenChange={isOpen => this.setState({open: isOpen})}
          onConfirm={brands => this.setState({open: false})}
        >
          <WingBlank>
            <Button onClick={() => {
              this.setState({open: true})
            }}>选择品牌</Button>
          </WingBlank>
        </BrandSelection>
    )
  }
}

class InjectData extends React.Component {
  readonly state = {
    open: false,
    brands: [],
  }
  componentDidMount () {}

  fetchData = () => {
    mockFetch().then(res => this.setState({brands: res}))
  }

  render () {
    return (
      <BrandSelection
        initBrands={this.state.brands}
        open={this.state.open}
        onOpenChange={isOpen => this.setState({open: isOpen})}
      >
        <WingBlank>
          <Button onClick={this.fetchData}>加载数据</Button>
          <WhiteSpace></WhiteSpace>
          <Button onClick={() => {this.setState({open: true})}}>打开</Button>
        </WingBlank>
      </BrandSelection>
    )
  }
}
