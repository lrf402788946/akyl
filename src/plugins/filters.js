import Vue from 'vue';
import filters from '@/util/filters';

for (const method in filters) {
  Vue.filter(method, filters[method]);
}
