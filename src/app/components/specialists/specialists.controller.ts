import {ISpecialist} from '@mocks/user';
import {ITreeItem} from '../tree/tree.model';
import {IDropdownItem} from '../dropdown/dropdown.directive';
import asideDictionary from '@src/dictionary/aside';
import {ISpecialistService} from '@app/services/specialist.service';

enum Order {
  specialty,
  alphabetically,
}

interface ISpeciality {
  name: string;
  specialty: string;
}

export class SpecialistsController {
  static $inject: readonly string[] = ['$timeout', 'SpecialistService'];

  private specialists: ISpecialist[] = [];
  public value: ISpecialist | string = '';
  public typeaheads: (ISpecialist | ISpeciality)[];
  public order: Order = Order.specialty;
  public dropdownItems: IDropdownItem[];
  public noResults: boolean;
  public tree: ITreeItem[];

  constructor(private $timeout: ng.ITimeoutService, private specialistService: ISpecialistService) {
    this.specialists = this.specialistService.getSpecialists();
    const specialities: ISpeciality[] = this.getSpecialities().map((specialty) => ({
      name: asideDictionary.specialists.specialties[specialty] || specialty,
      specialty,
    }));
    this.typeaheads = [...this.specialists, ...specialities];
    this.dropdownItems = [
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
  }

  public handleBlur(): void {
    if (this.noResults) {
      this.noResults = false;
      this.value = '';
    }
  }

  public handleClear(): void {
    this.value = '';
  }

  private checkBySpeciality(specialty: string): void {
    this.getSpecialistsBySpeciality(specialty)
        .filter((specialist) => !this.specialistService.selected.includes(specialist))
        .forEach((specialist) => this.specialistService.selected.push(specialist));
  }

  public handleValueChange(): void {
    if (typeof this.value !== 'object') return;
    const value = this.value as ISpecialist;
    if (value.id) {
      if (!this.specialistService.selected.includes(value)) {
        this.specialistService.selected.push(value);
        this.buildTree();
      }
    } else {
      const value = this.value as ISpeciality;
      this.checkBySpeciality(value.specialty);
      this.buildTree();
    }
  }

  public handleCheckboxChange(item: ITreeItem): void {
    console.log(item)
    if (item.key.startsWith('s')) {
      const specialties = asideDictionary.specialists.specialties;
      const speciality = Object.keys(specialties).find((key) => specialties[key] === item.label) || item.label;
      if (item.checked) {
        this.checkBySpeciality(speciality);
      } else {
        this.getSpecialistsBySpeciality(speciality)
            .forEach((specialist) => {
              const index = this.specialistService.selected.indexOf(specialist);
              if (index !== -1) {
                this.specialistService.selected.splice(index, 1);
              }
            });
      }
    } else {
      const specialist = this.specialistService.getSpecialistById(Number(item.key));
      if (item.checked) {
        this.specialistService.selected.push(specialist);
      } else {
        this.specialistService.selected.splice(this.specialistService.selected.indexOf(specialist), 1);
      }
    }
    this.buildTree();
  }

  private handleSelect = (): void => {
    this.specialistService.selected = this.specialists.slice();
    this.buildTree();
  }

  private handleUnselect = (): void => {
    this.specialistService.selected = [];
    this.buildTree();
  }

  public handleOrderChange(): void {
    this.buildTree();
  }

  private getSpecialistsBySpeciality(specialty: string): ISpecialist[] {
    return this.specialists.filter((specialist) => specialist.specialty === specialty);
  }

  private buildTreeNames(specialists: ISpecialist[], addSpeciality: boolean): ITreeItem[] {
    return specialists.map((specialist) => ({
      key: String(specialist.id),
      label: `${specialist.name} (к.${specialist.cabinet}${addSpeciality ? ', ' + specialist.specialty : ''})`,
      checked: this.specialistService.selected.includes(specialist),
    }));
  }

  private sortByName(a: ISpecialist, b: ISpecialist): (1 | -1 | 0) {
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
    return 0;
  }

  private getSpecialities(): string[] {
    return this.specialists
        .map(({specialty}) => specialty)
        .filter((specialty, index, arr) => arr.indexOf(specialty) === index);
  }

  private buildTree(): void {
    if (this.order === Order.alphabetically) {
      this.tree = this.buildTreeNames(this.specialists.slice().sort(this.sortByName), true);
      return;
    }
    this.tree = this.getSpecialities().map((specialty, i) => {
      const children = this.buildTreeNames(this.getSpecialistsBySpeciality(specialty), false);
      return {
        key: `s${i}`,
        label: asideDictionary.specialists.specialties[specialty] || specialty,
        checked: children.some(({checked}) => checked),
        children,
      };
    });
  }
}
