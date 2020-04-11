export interface ITreeItem {
  key: string;
  label: string;
  checked: boolean;
  children?: ITreeItem[];
}
