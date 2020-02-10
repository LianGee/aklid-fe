import request from '@/utils/request';

export async function infoSave(params: any): Promise<any> {
  return request('/apis/daily/info/save', {
    method: 'POST',
    data: params,
  });
}

export async function infoStatistic(start: string, end: string): Promise<any> {
  return request(`/apis/daily/info/statistic?start=${start}&end=${end}`)
}
