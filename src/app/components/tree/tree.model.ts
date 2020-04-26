export interface ITreeItem {
  key: string;
  label: string;
  checked: boolean;
  children?: ITreeItem[];
}

export interface ITreeScope extends ng.IScope {
  items: ITreeItem[];
  onCheckboxChange: (params: {item: ITreeItem}) => void
  handleCheckboxChange: (item: ITreeItem) => void;
}
