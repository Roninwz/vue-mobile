import request from '@/https/index';

export function getDictByType (data) {
  return request({
    url: '/dictItem/getDictByType',
    method: 'post',
    data: data
  });
}
