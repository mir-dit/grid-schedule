import {Column} from '@app/components/table/table.model';

function orderBy(fn: Function, columns: Column[], ...filters: string[]): Column[] {
  return filters.length > 1 ? orderBy(fn, fn(columns, filters[0], false), ...filters.slice(1)) : fn(columns, filters[0], false);
}

function tableOrderColumnFilter($filter: ng.IFilterService) {
  return (columns: Column[]): Column[] => {
    return orderBy($filter('orderBy'), columns, '"interval[0]"', '"specialty"', '"doctor"', '"date" | date: "d"', '"date" | date: "M"', '"date" | date: "yy"');
  };
}

tableOrderColumnFilter.$inject = ['$filter'];

export {tableOrderColumnFilter};
