import { check, sleep } from 'k6'
import http from 'k6/http'

/**
 * 데이터를 조회하는데 여러 데이이터를 참조하는 페이지 - 경로 검색
 * 지하철 역 목록 조회 - 최단 거리 조회
 *
 * Throughput = 11.8 ~ 177
 * Latency = 100ms
 *
 * vus
 * 11.8 x (3x1.5 ) /3 = 18,
 * 177 x (3x1.5)/3 = 266,
 */

export let options = {
  stages: [
    { duration: '5s', target: 50 },
    { duration: '5s', target: 100 },
    { duration: '5s', target: 200 },
    { duration: '5s', target: 300 },
    { duration: '10s', target: 50 },
    { duration: '10s', target: 100 },
    { duration: '10s', target: 200 },
    { duration: '10s', target: 300 },
    { duration: '5s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(99)<100'], // 99% of requests must complete below 100ms
  },
}

const BASE_URL = 'https://shinmj-nextstep.n-e.kr'

export default function () {
  var params = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  let stationsRes = http.get(`${BASE_URL}/stations`, params)
  check(stationsRes, { 'retrieved stations': (resp) => resp.status === 200 })
  sleep(1)

  const stations = stationsRes.json()
  let paths = http
    .get(
      `${BASE_URL}/paths?source=${stations[0].id}&target=${stations[10].id}`,
      params
    )
  check(paths, { 'retrieved paths': (resp) => resp.status === 200 })
  sleep(1)
}