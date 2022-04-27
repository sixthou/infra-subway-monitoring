<p align="center">
    <img width="200px;" src="https://raw.githubusercontent.com/woowacourse/atdd-subway-admin-frontend/master/images/main_logo.png"/>
</p>
<p align="center">
  <img alt="npm" src="https://img.shields.io/badge/npm-%3E%3D%205.5.0-blue">
  <img alt="node" src="https://img.shields.io/badge/node-%3E%3D%209.3.0-blue">
  <a href="https://edu.nextstep.camp/c/R89PYi5H" alt="nextstep atdd">
    <img alt="Website" src="https://img.shields.io/website?url=https%3A%2F%2Fedu.nextstep.camp%2Fc%2FR89PYi5H">
  </a>
  <img alt="GitHub" src="https://img.shields.io/github/license/next-step/atdd-subway-service">
</p>

<br>

# 인프라공방 샘플 서비스 - 지하철 노선도

<br>

## 🚀 Getting Started

### Install
#### npm 설치
```
cd frontend
npm install
```
> `frontend` 디렉토리에서 수행해야 합니다.

### Usage
#### webpack server 구동
```
npm run dev
```
#### application 구동
```
./gradlew clean build
```
<br>


### 1단계 - 웹 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요

- **메인 - LTE 환경 모바일에서 First Contentful Paint 를 3초 미만으로 한다.**
    - 메인 페이지는 서비스를 이용하기 위한 첫 관문인데, 느린 FCP 로 멈춘 화면을 본다면 서비스가 정상적이지 않다고 판단하고 이탈할 가능성이 있다.
- **메인 - LTE 환경 모바일에서 Largest Contentful Paint 를 3초 미만으로 한다.**
    - `3초의 법칙` 에 따라 판단함. 
- **경로 검색 - LTE 환경에서의 모바일 기기의 Time to Interactive는 7초 미만이어야 한다.**
    - 빠르게 검색을 이용하기 위해 상호작용이 가능해야할 거라 생각함.
    - 유저는 검색 화면에서 시각적인 내용물 보단, 검색 이라는 '행위' 가 가능하길 원할 것으로 예상.
    - 카카오맵 4.6초, 네이버지도 7.1초
- **WebPageTest 지표 중 `Compress Transfer` 를 A 등급으로 유지한다.**
    - 네트워크 오버헤드는 모든 지표에 많은 영향을 미치므로 이를 줄일 수 있이기 위함.  

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요
- **WebPageTest 지표를 확인했을 때 Compress Transfer 가 F등급**
    - http 압축을 통해 개선한다. 
    - nginx에 gzip 을 적용한다.
- **render-blocking resource 가 존재한다.**
    - 해당 리소스들을 지연로딩한다. ( -> FCP 개선 효과 )
  


---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
