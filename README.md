# fe-sprint-coz-shopping

코드스테이츠 SEB FE 44기 솔로 프로젝트입니다.

<br>

# Stack

- Javascript
- React
- CSS Module
- Vite

<br>

# 배포 링크

.

<br>

# Folder Structire

```
fe-sprint-coz-shopping
├─ .eslintrc.cjs
├─ src
│  ├─ App.css
│  ├─ App.jsx
│  ├─ assets
│  │  ├─ kuromi.jpg
│  │  ├─ main-logo.png
│  │  └─ types_img
│  │     ├─ type_all.png
│  │     ├─ type_brand.png
│  │     ├─ type_category.png
│  │     ├─ type_product.png
│  │     └─ type_special.png
│  ├─ components
│  │  ├─ BookmarkList.jsx
│  │  ├─ BookmarkList.module.css
│  │  ├─ Dropdown.jsx
│  │  ├─ Dropdown.module.css
│  │  ├─ Footer.jsx
│  │  ├─ Footer.module.css
│  │  ├─ ProductList.jsx
│  │  ├─ ProductList.module.css
│  │  ├─ Types.jsx
│  │  ├─ Types.module.css
│  │  └─ UI
│  │     ├─ Error.jsx
│  │     ├─ Error.module.css
│  │     ├─ Item.jsx
│  │     ├─ Item.module.css
│  │     ├─ Modal.jsx
│  │     ├─ Modal.module.css
│  │     ├─ Type.jsx
│  │     └─ Type.module.css
│  ├─ index.css
│  ├─ main.jsx
│  └─ pages
│     ├─ BookmarkListPage.jsx
│     ├─ Header.jsx
│     ├─ Header.module.css
│     ├─ Mainpage.jsx
│     ├─ ProductListPage.jsx
│     └─ ProductListPage.module.css
├─ tree.txt
└─ vite.config.js

```

<br>

# 기능

- 북마크 추가/제거(로컬스토리지 사용)
- 상품 이미지 클릭 시 모달창을 띄우고 모달창에서 북마크 추가/제거 가능
- 저장된 북마크가 없을 때 오류 컴포넌트 띄우기
- 햄버거 버튼을 눌러 메뉴 드롭다운 띄우기
- SPA 라우팅
- 상품리스트 페이지, 북마크 페이지에서 무한 스크롤 및 타입별 필터 기능
- 북마크 추가/제거 시 토스트 알림창

<br>

# 기능 설명/아쉬운 점

### 라우팅

리액트 라우터 버전6의 `createBrowserRouter`와 data api를 사용하는 것을 고민했으나 여러 라우트 간에 서버를 통해 주고받아야 할 데이터가 있는 것 같지는 않아서 `BrowserRouter`만을 사용해 라우팅을 구현했습니다.

<br>

### 무한스크롤

`Intersection Observer API`를 사용해서 옵저버가 감지되면 추가 데이터를 로드합니다. 제공되는 전체 데이터의 양이 많지 않기 때문에 서버 요청을 통해 모든 데이터를 받아오고 페이지네이션 방식으로 데이터를 끊어서 화면에 보여줍니다.

> #### 무한스크롤 기능에 남아 있는 문제점
>
> 데이터가 끝나는 페이지를 설정해서 끝에 도달하면 추가로 데이터를 로드하지 않도록 해야 하는데 기능 구현에 실패했습니다.

<br>

### 타입별 필터

무한스크롤 기능과 동시에 필터 기능을 구현하는 로직을 짜는 부분에서 어려움을 겪었습니다. 무한스크롤을 먼저 구현하고 필터 기능을 나중에 도입하니 페이지별로 이미 끊어져 있는 데이터에 필터가 들어가게 돼서 타입별 필터를 했을 때 개수가 랜덤으로 표시되었습니다. 로직을 바꿔서 데이터 전체에서 먼저 필터를 하고 나서 페이지별로 데이터를 끊어서 표시하도록 하고, 선택된 타입이 바뀌었을 때 페이지를 1로 초기화해서 문제를 해결했습니다.

<br>

### 상태 관리

상태 관리를 위해서 별도의 라이브러리를 사용하지 않고 `useState`만을 사용해서 상태 관리를 해주었습니다. 리덕스를 도입할 만큼 애플리케이션의 크기가 크지 않고 관리해 줘야 할 상태의 양도 많지 않을 것이라 판단했습니다.<br>
그렇지만 실제 개발 과정에서 새로운 기능을 도입하려 할 때마다 상태를 어디에 둘 것인지에 관한 고민에서 오는 피로감이 있었습니다.<br>
특히 아이템 카드 컴포넌트나 모달창, 토스트창 같은 ui 요소들은 심한 props drilling을 유발하거나 그렇지 않으면 다른 컴포넌트에 의존하게 되는 결과를 낳았습니다. 이런 문제 때문에 토스트창은 라이브러리를 사용해서 구현했습니다. 애플리케이션이 크지 않더라도 ui 요소들의 적절한 사용을 위해서는 별도의 상태 관리 도구가 필요하겠다고 생각했습니다.

<br>

### ui 컴포넌트의 재사용성

ui 요소들은 재사용성을 고려해 만들어야 하는데 ui 요소 개발 경험이 많지 않다 보니 재사용성이 거의 없는 특수한 컴포넌트를 만들게 되었습니다.
