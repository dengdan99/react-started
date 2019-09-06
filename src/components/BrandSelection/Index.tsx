import React from 'react'
import { Drawer, List, NavBar, Icon, Toast } from 'antd-mobile';
import './index.scss'
import { BrandSelectionProps, BrandSelectionState, BrandSelectionItem } from './Types';
import { inject, observer } from 'mobx-react';

@inject('brandStore')
@observer
class BrandSelection extends React.Component<BrandSelectionProps, BrandSelectionState> {
  static defaultProps: BrandSelectionProps  = {
    position: 'left',
    height: document.documentElement.clientHeight,
    open: false,
    max: 1,
  }
  readonly state: BrandSelectionState = {
    brands: []
  }

  componentDidMount () {
    if (this.props.open) this.fetchBrands()
    if (this.props.initBrands) this.setState({brands: this.props.initBrands})
  }

  componentDidUpdate(prevProps: BrandSelectionProps) {
    //if changge prop open 
    if (!prevProps.open && this.props.open && this.state.brands.length === 0) {
      this.fetchBrands()
    }

    //if change prop initBrands
    if (this.props.initBrands && (prevProps.initBrands !== this.props.initBrands)) {
      this.setState({brands: this.props.initBrands})
    }
  }

  fetchBrands () {
    if (this.props.initBrands) return
    this.props.brandStore!.fetchBrands().then(res => {
      const _bs: BrandSelectionItem[] =  this.props.brandStore!.brands.map(b => ({
        ...b,
        selected: false
      }))
      this.setState({
        brands: _bs
      })
    })
  }

  onOpenChange = (isOpen: boolean) => {
    if (this.props.onOpenChange) this.props.onOpenChange(isOpen)
  }

  onClickItemHandler = (brand: BrandSelectionItem) => {
    if (this.props.onSelect) this.props.onSelect(brand)
    const index = this.state.brands.indexOf(brand)
    this.state.brands[index].selected = !brand.selected
    this.setState({
      brands: this.state.brands
    })
  }

  onClickConfirm = () => {
    const _count = this.state.brands.filter(item => item.selected).length
    if (_count > this.props.max) {
      Toast.info(`最多只能选择 ${this.props.max} 个`)
      return
    }
    if (this.props.onConfirm) this.props.onConfirm(this.state.brands.filter(item => item.selected))
  }

  onClickClose = () => {
    if (this.props.onOpenChange) this.props.onOpenChange(false)
    this.state.brands.forEach(item => item.selected = false)
  }

  renderBrandList () {
    return (
      <List>
        {this.state.brands.map(item => 
          <List.Item 
            thumb={item.icon}
            extra={item.selected ? <Icon type="check"></Icon> : null}
            key={item.id} onClick={() => this.onClickItemHandler(item)}
          >{item.name}</List.Item>
        )}
      </List>
    )
  }

  renderLoading () {
    const items = Array(10).fill('').map(i => Math.ceil(Math.random()*60)+'%')
    return (
      <List>
        {items.map(item => (
          <List.Item thumb={<div className="loading-thumb"></div>}><div style={{width: item}} className="loading-line"></div></List.Item>
        ))}
      </List>
    )
  }

  renderSidebar () {
    return (
      <div style={{  }}>
        <NavBar
          leftContent={<Icon type="cross" onClick={this.onClickClose} />}
          rightContent={<span onClick={this.onClickConfirm} >确认</span>}
        >标题</NavBar>
        {this.props.brandStore!.fetchLoading ? this.renderLoading() : this.renderBrandList()}
      </div>
    )
  }

  render () {
    return (
      <Drawer
        className="brand-drawer"
        position={this.props.position}
        style={{ minHeight: this.props.height, width: this.props.width }}
        sidebar={this.renderSidebar()}
        open={this.props.open}
        onOpenChange={this.onOpenChange}
      >
        {this.props.children}
      </Drawer>
    )
  }
}

export default BrandSelection
