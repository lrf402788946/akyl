import _ from 'lodash';

/**
 * data:要筛选的数据集
 * searchItem: 需要信息的属性名
 * value:匹配的值
 * label:需要显示的信息
 */
const filters = {
  getName(object) {
    const { data, searchItem, value, label } = object;
    if (data.length > 0) {
      if (value !== null || value !== undefined) {
        let returnText = 'undefined';
        for (const item of data) {
          if (_.get(item, `${searchItem}`) === value) {
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
