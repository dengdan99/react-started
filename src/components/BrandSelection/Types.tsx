import BrandStore from "../../stores/components/BrandStore";

export interface BrandSelectionProps {
  brandStore?: BrandStore,
  initBrands?: BrandSelectionItem[],
  height: number,
  width?: number,
  open: boolean,
  max: number,
  onOpenChange?: (isOpen: boolean) => void,
  onConfirm?: (selectedBrands: BrandSelectionItem[]) => void,
  onSelect?: (brand: BrandSelectionItem) => void,
  position?: 'left' | 'right' | 'top' | 'bottom'
}

export interface BrandSelectionState {
  brands: BrandSelectionItem[]
}

export interface BrandSelectionItem {
  icon: string
  name: string
  id: number
  ext?: any
  selected: boolean
}
