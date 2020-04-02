import {IFilterFunction} from 'angular';

function orderBy(fn: Function, array: any[], ...filters: string[]): any[] {
  return filters.length > 1 ? orderBy(fn, fn(array, filters[0], false), ...filters.slice(1)) : fn(array, filters[0], false);
}

function tableOrderColumnFilter($filter: any): IFilterFunction {
  return (array: any[]) => {
    return orderBy($filter('orderBy'), array, "'interval'", "'specialty'", "'doctor'", "'date' | date: 'd'", "'date' | date: 'M'", "'date' | date: 'yy'");
  }
}

tableOrderColumnFilter.$inject = ['$filter'];

export {tableOrderColumnFilter};