import request from '@/utils/request';

export async function query(): Promise<any> {
  return request('/api/users');
}

export async function queryCurrent(): Promise<any> {
  return request('/apis/user/current');
}

export async function queryNotices(): Promise<any> {
  return request('/api/notices');
}

export async function register(params: any): Promise<any> {
  return request('/apis/user/register', {
    method: 'POST',
    data: params,
  });
}
