import request from '@/utils/request';

export async function summaryChina(): Promise<any> {
  return request('/apis/summary/china');
}

export async function chinaDaily(): Promise<any> {
  return request('/apis/summary/china/daily')
}

export async function chinaDetail(): Promise<any> {
  return request('/apis/summary/china/detail')
}

export async function overseas(): Promise<any> {
  return request('/apis/summary/overseas')
}

export async function historySummary(): Promise<any> {
  return request('/apis/summary/history')
}
