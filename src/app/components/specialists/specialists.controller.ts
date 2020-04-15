import {IScheduleService} from '@app/pages/schedule/schedule.service';
import {ISpecialist} from '@mocks/user';
import {ITreeItem} from '../tree/tree.model';
import {IDropdownItem} from '../dropdown/dropdown.directive';
import asideDictionary from '@src/dictionary/aside';
import {IInputService, IInputState} from '@app/services/input.service';

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
  inputState: IInputState;
  tree: ITreeItem[];
  handleCheckboxChange: (item: ITreeItem) => void;
  handleOrderChange: () => void;
  dropdownItems: IDropdownItem[];
}

export class SpecialistsController {
  static $inject: readonly string[] = ['$scope', 'ScheduleService', 'InputService'];
  private specialists: ISpecialist[];

  constructor(private $scope: ISpecialistsScope, private scheduleService: IScheduleService, private inputService: IInputService) {
    this.specialists = scheduleService.getSpecialists();
    $scope.value = '';
    $scope.specialists = this.specialists;
    $scope.order = Order.specialty;
    $scope.inputState = inputService.state;
    $scope.dropdownItems = [
      {
        label: asideDictionary.specialists.select,
        icon: 'glyphicon glyphicon-ok',
        onClick: this.handleSelect,
      },
      {
        label: asideDictionary.specialists.unselect,
        icon: 'glyphicon glyphicon-remove',
        onClick: this.handleUnselect,
      },
    ];
    this.buildTree();

    $scope.$watch('value', this.handleValueChange);
    $scope.handleBlur = this.handleBlur;
    $scope.handleCheckboxChange = this.handleCheckboxChange;
    $scope.handleOrderChange = this.handleOrderChange;
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
    if (!this.inputService.state.specialists.includes(value)) {
      this.inputService.state.specialists.push(value);
      this.buildTree();
    }
  }

  private handleCheckboxChange = (item: ITreeItem): void => {
    if (item.key.startsWith('s')) {
      const specialists = this.getSpecialistsBySpeciality(item.label);
      if (item.checked) {
        specialists
            .filter((specialist) => !this.inputService.state.specialists.includes(specialist))
            .forEach((specialist) => this.inputService.state.specialists.push(specialist));
      } else {
        specialists
            .forEach((specialist) => {
              const index = this.inputService.state.specialists.indexOf(specialist);
              if (index !== -1) {
                this.inputService.state.specialists.splice(index, 1);
              }
            });
      }
    } else {
      const specialist = this.scheduleService.getSpecialistById(Number(item.key));
      if (item.checked) {
        this.inputService.state.specialists.push(specialist);
      } else {
        this.inputService.state.specialists.splice(this.inputService.state.specialists.indexOf(specialist), 1);
      }
    }
    this.buildTree();
  }

  private handleSelect = (): void => {
    this.inputService.state.specialists = this.specialists.slice();
    this.buildTree();
  }

  private handleUnselect = (): void => {
    this.inputService.state.specialists = [];
    this.buildTree();
  }

  private handleOrderChange = (): void => {
    this.buildTree();
  }

  private getSpecialistsBySpeciality(specialty: string): ISpecialist[] {
    return this.specialists.filter((specialist) => specialist.specialty === specialty);
  }

  private buildTreeNames(specialists: ISpecialist[], addSpeciality: boolean): ITreeItem[] {
    return specialists.map((specialist) => ({
      key: String(specialist.id),
      label: addSpeciality ? `${specialist.name} (${specialist.specialty})` : specialist.name,
      checked: this.inputService.state.specialists.includes(specialist),
    }));
  }

  private sortByName(a: ISpecialist, b: ISpecialist): (1 | -1 | 0) {
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
    return 0;
  }

  private buildTree(): void {
    if (this.$scope.order === Order.alphabetically) {
      this.$scope.tree = this.buildTreeNames(this.specialists.slice().sort(this.sortByName), true);
      return;
    }
    this.$scope.tree = this.specialists
        .map(({specialty}) => specialty)
        .filter((specialty, index, arr) => arr.indexOf(specialty) === index)
        .map((specialty, i) => {
          const children = this.buildTreeNames(this.getSpecialistsBySpeciality(specialty), false);
          return {
            key: `s${i}`,
            label: specialty,
            checked: children.some(({checked}) => checked),
            children,
          };
        });
  }
}
