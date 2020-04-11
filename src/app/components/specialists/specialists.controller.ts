import {IScheduleService} from '@app/pages/schedule/schedule.service';
import {ISpecialist} from '@mocks/user';
import {ITreeItem} from '../tree/tree.model';

enum Order {
  specialty,
  alphabetically,
}

export interface ISpecialistsScope extends ng.IScope {
  noResults: boolean;
  value: ISpecialist | string;
  specialists: ISpecialist[];
  handleBlur: () => void;
  order: Order;
  selected: number[];
  tree: ITreeItem[];
  handleCheckboxChange: (item: ITreeItem) => void;
}

export class SpecialistsController {
  static $inject: readonly string[] = ['$scope', 'ScheduleService'];
  private specialists: ISpecialist[];

  constructor(private $scope: ISpecialistsScope, scheduleService: IScheduleService) {
    this.specialists = scheduleService.getSpecialists();
    $scope.value = '';
    $scope.specialists = this.specialists;
    $scope.order = Order.specialty;
    $scope.selected = [];
    this.buildTree();

    $scope.$watch('value', this.handleValueChange);
    $scope.handleBlur = this.handleBlur;
    $scope.handleCheckboxChange = this.handleCheckboxChange;
  }

  private handleBlur = (): void => {
    if (this.$scope.noResults) {
      this.$scope.noResults = false;
      this.$scope.value = '';
    }
  }

  private handleValueChange = (): void => {
    if (typeof this.$scope.value !== 'object') return;
    const value = this.$scope.value as ISpecialist;
    if (!this.$scope.selected.includes(value.id)) {
      this.$scope.selected.push(value.id);
      this.buildTree();
    }
  }

  private handleCheckboxChange = (item: ITreeItem): void => {
    if (item.key.startsWith('s')) {
      const specialists = this.getSpecialistsBySpeciality(item.label);
      if (item.checked) {
        specialists
            .filter(({id}) => !this.$scope.selected.includes(id))
            .forEach(({id}) => this.$scope.selected.push(id));
      } else {
        specialists
            .filter(({id}) => this.$scope.selected.includes(id))
            .forEach(({id}) => this.$scope.selected.splice(this.$scope.selected.indexOf(id), 1));
      }
    } else {
      const id = Number(item.key);
      if (item.checked) {
        this.$scope.selected.push(id);
      } else {
        this.$scope.selected.splice(this.$scope.selected.indexOf(id), 1);
      }
    }
    this.buildTree();
  }

  private getSpecialistsBySpeciality(specialty: string): ISpecialist[] {
    return this.specialists.filter((specialist) => specialist.specialty === specialty);
  }

  private buildTree(): void {
    this.$scope.tree = this.specialists
        .map(({specialty}) => specialty)
        .filter((specialty, index, arr) => arr.indexOf(specialty) === index)
        .map((specialty, i) => {
          const children: ITreeItem[] = this.getSpecialistsBySpeciality(specialty).map(({id, name}) => ({
            key: String(id),
            label: name,
            checked: this.$scope.selected.includes(id),
          }));
          return {
            key: `s${i}`,
            label: specialty,
            checked: children.some(({checked}) => checked),
            children,
          };
        });
  }
}
