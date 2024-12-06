// 전역 변수 선언
var markers = [];
var mapContainer = document.getElementById('map');
var mapOption = {
    center: new kakao.maps.LatLng(37.566826, 126.9786567),
    level: 5,
    mapTypeId : kakao.maps.MapTypeId.ROADMAP
};

// 지도 생성
var map = new kakao.maps.Map(mapContainer, mapOption);
var ps = new kakao.maps.services.Places({
    size: 15  // 한 번에 표시할 결과 수를 최대로 설정
});
var infowindow = new kakao.maps.InfoWindow({zIndex:1});

// 인포윈도우 스타일 가져오기 함수 추가
function getInfoWindowStyle() {
    const isDarkMode = document.body.classList.contains('dark-mode');
    return isDarkMode ? 
        'background: #333; color: #fff; border: 1px solid #555;' : 
        'background: #fff; color: #333; border: 1px solid #ccc;';
}

// 인포윈도우 표시 함수 수정
function displayInfowindow(marker, title) {
    const contentStyle = getInfoWindowStyle();
    var content = `
        <div style="padding: 5px; ${contentStyle} border-radius: 4px;">
            ${title}
        </div>
    `;
    
    infowindow.setContent(content);
    infowindow.open(map, marker);
}

// 현재 위치 마커 표시 함수 수정
function displayCurrentLocation(locPosition) {
    var marker = new kakao.maps.Marker({
        map: map,
        position: locPosition
    });

    const contentStyle = getInfoWindowStyle();
    var iwContent = `
        <div style="padding: 5px; ${contentStyle} border-radius: 4px;">
            현재 위치
        </div>
    `;
    
    var infowindow = new kakao.maps.InfoWindow({
        content: iwContent
    });
    
    infowindow.open(map, marker);
    map.setCenter(locPosition);
}

// 현재 위치 가져오기
function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;
            var locPosition = new kakao.maps.LatLng(lat, lon);

            // 현재 위치 마커 표시
            displayCurrentLocation(locPosition);
            // 현재 위치 기준으로 자동 검색 실행
            var keyword = document.getElementById('keyword').value || '보건소'; // 키워드가 없으면 기본값 '보건소' 사용
            ps.keywordSearch(keyword, function(data, status, pagination) {
                placesSearchCB(data, status, pagination, locPosition);
            }, {
                location: locPosition,
                radius: 5000,
                sort: kakao.maps.services.SortBy.DISTANCE
            });
        }, function(error) {
            console.error("Geolocation 오류:", error);
            // 기본 위치(서울시청)에서 자동 검색
            var defaultPosition = new kakao.maps.LatLng(37.566826, 126.9786567);
            var keyword = document.getElementById('keyword').value || '보건소';
            ps.keywordSearch(keyword, function(data, status, pagination) {
                placesSearchCB(data, status, pagination, defaultPosition);
            }, {
                location: defaultPosition,
                radius: 5000,
                sort: kakao.maps.services.SortBy.DISTANCE
            });
        });
    }
}

// 키워드 검색 완료 시 호출되는 콜백함수
function placesSearchCB(data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {
        // 정상적으로 검색이 완료됐으면 검색 목록과 마커를 표출
        displayPlaces(data);
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert('검색 결과가 존재하지 않습니다.');
        return;
    } else if (status === kakao.maps.services.Status.ERROR) {
        alert('검색 결과 중 오류가 발생했습니다.');
        return;
    }
}

// 검색 수행 함수
function searchPlaces() {
    var keyword = document.getElementById('keyword').value;
    if (!keyword.replace(/^\s+|\s+$/g, '')) {
        alert('키워드를 입력해주세요!');
        return false;
    }

    // 장소검색 객체를 통해 키워드로 장소검색을 요청
    ps.keywordSearch(keyword, placesSearchCB, {
        size: 15  // 한 번에 최대 결과를 가져오도록 설정
    });
}

// 검색 결과 표시
function displayPlaces(places) {
    var listEl = document.getElementById('placesList');
    var bounds = new kakao.maps.LatLngBounds();

    // 기존 검색결과 및 마커 제거
    removeAllChildNods(listEl);
    removeMarker();
    
    for (var i = 0; i < places.length; i++) {
        var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x);
        var marker = addMarker(placePosition, i);
        var itemEl = getListItem(i, places[i]);

        bounds.extend(placePosition);

        (function(marker, title) {
            kakao.maps.event.addListener(marker, 'click', function() {
                displayInfowindow(marker, title);
            });

            itemEl.onclick = function() {
                displayInfowindow(marker, title);
                map.setCenter(placePosition);
            };
        })(marker, places[i].place_name);

        listEl.appendChild(itemEl);
    }

    map.setBounds(bounds);
}

// 마커 생성
function addMarker(position, idx, place) {
    var marker = new kakao.maps.Marker({
        position: position
    });
    marker.setMap(map);
    markers.push(marker);
    return marker;
}

// 마커 제거
function removeMarker() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = [];
}

// 검색결과 항목 Element 생성 함수
function getListItem(index, place) {
    var el = document.createElement('li');
    var itemStr = `
        <div class="item">
            <h5>${place.place_name}</h5>
            <div class="info">
                <div class="info-bottom">
                    <div class="address-container">
                        <span>${place.road_address_name ? place.road_address_name : place.address_name}</span>
                        <span class="tel">${place.phone}</span>
                    </div>
                    <button class="copy-btn" onclick="copyPlaceInfo('${place.place_name}', '${place.road_address_name}', '${place.phone}')">
                        <i class="fas fa-copy"></i>
                    </button>
                </div>
            </div>
        </div>`;
    el.innerHTML = itemStr;
    el.className = 'item';
    return el;
}
// 장소 정보 복사 함수 추가
function copyPlaceInfo(name, address, phone) {
    const placeInfo = `
이름: ${name}
주소: ${address}
전화번호: ${phone}
    `.trim();
    
    navigator.clipboard.writeText(placeInfo).then(() => {
        alert('장소 정보가 복사되었습니다!');
    }).catch(err => {
        console.error('복사 실패:', err);
        alert('복사에 실패했습니다. 다시 시도해주세요.');
    });
}

// 검색결과 목록 제거
function removeAllChildNods(el) {   
    while (el.hasChildNodes()) {
        el.removeChild(el.lastChild);
    }
}

// 페이지 로드 시 실행
window.onload = function() {
    getCurrentLocation();
};
