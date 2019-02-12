import _ from 'lodash';

const filters = {
  getName(object) {
    const { data, searchItem, value, label } = object;
    if (data.length > 0) {
      if (value !== null || value !== undefined) {
        let returnText = 'undefined';
        for (const item of data) {
          if (item.value === value) {
            returnText = _.get(item, `${label}`);
            break;
          }
        }
        return returnText;
      } else {
        return _.get(data, searchItem) === undefined ? '' : _.get(data, searchItem);
      }
    }
  },
};

export default filters;
