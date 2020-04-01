function orderBy(fn: Function, array: any[], ...filters: String[]) {
  return filters.length > 1 ? orderBy(fn, fn(array, filters[0], false), ...filters.slice(1)) : fn(array, filters[0], false);
}


function tableOrderColumn($filter: any) {
  return (array) => {
    return orderBy($filter('orderBy'), array, "'interval'", "'specialty'", "'doctor'", "'date'");
  }
}

tableOrderColumn.$inject = ['$filter'];

export {tableOrderColumn};