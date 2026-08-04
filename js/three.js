import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.165.0/examples/jsm/controls/OrbitControls.js";

// 장면 만들기
const scene = new THREE.Scene();

const canvas = document.getElementById("threeCanvas");

// 카메라 만들기
const camera = new THREE.PerspectiveCamera(
  75 /* 시야각 */,
  canvas.clientWidth / canvas.clientHeight /* 캔버스 화면비율 */,
  0.1 /* 카메라가 볼 수 있는 가장 가까운거리 */,
  1000 /* 카메라가 볼 수 있는 가장 먼 거리 */,
);

// 화면에 그려주는 도구 만들기
const renderer = new THREE.WebGLRenderer({
  canvas,
  alpha: true,
});

// 캔버스 크기만큼 3D 화면 크기를 설정
renderer.setSize(canvas.clientWidth, canvas.clientHeight);

// 박스 모양 만들기
const getmetry = new THREE.BoxGeometry(1, 1, 1);

// 카드 모양 만들기
const cardGeometry = new THREE.BoxGeometry(2, 1.2, 0.1);

const textureLoader = new THREE.TextureLoader(); /* 이미지를 불러오는 도구를 만듦 */
const boxTexture = textureLoader.load("https://iili.io/CO0IkAl.png"); /* 이미지 불러오기 */

// 박스 재질 만들기 MeshStandardMaterial 빛을 받는 재질
const meterial = new THREE.MeshStandardMaterial({
  color: 0x00ff00,
  map: boxTexture,
});

const meterial2 = new THREE.MeshStandardMaterial({
  color: 0xffff00,
  map: boxTexture,
});

const meterial3 = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  roughness: 0.7 /* 표면이 얼마나 거친지 정하는 값 */,
  metalness: 1 /* 금속 느낌을 정하는 값 */,
  map: boxTexture /* 이미지 맵핑 */,
});

// 카드 재질 만들기
const cardMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  roughness: 0.4,
  metalness: 0.1,
});

// 박스 만들기
const box = new THREE.Mesh(getmetry, meterial);
const box2 = new THREE.Mesh(getmetry, meterial2);
const box3 = new THREE.Mesh(getmetry, meterial3);

// 카드 만들기
const card = new THREE.Mesh(cardGeometry, cardMaterial);

// 박스 위치 조정
box2.position.x = 2;
box3.position.x = -2;

// 박스 크기 조정
box2.scale.x = 2;
box3.scale.y = 2;

// 카드 위치 조정
card.position.y = 2;

// 빛 추가
const light = new THREE.DirectionalLight(0xffffff, 1); /* DirectionalLight(빛의색, 빛의밝기) 한 방향에서 비추는 빛 */
light.position.set(3, 3, 3); /* 빛의 위치 설정 x, y, z축 */

// 마우스로 화면 조작하기
const controls = new OrbitControls(camera, renderer.domElement);

// 마우스 휠 확대/축소 막기
controls.enableZoom = false;

// 마우스 위치 저장
const mouse = {
  x: 0,
  y: 0,
};

// 마우스 움직임 감지
window.addEventListener("mousemove", (event) => {
  mouse.x = event.clientX / window.innerWidth - 0.5;
  mouse.y = event.clientY / window.innerHeight - 0.5;
});

// 마우스가 화면 밖으로 나가면 원래 위치로 돌아가기
window.addEventListener("mouseleave", () => {
  mouse.x = 0;
  mouse.y = 0;
});

// 스크롤값 저장
let scrollY = window.scrollY;

// 스크롤 움직임 감지
window.addEventListener("scroll", () => {
  scrollY = window.scrollY;
});

// 배경색 넣기
scene.background = new THREE.Color(0xeaf1ff);

// 안개 넣기
scene.fog = new THREE.Fog(0xeaf1ff, 1, 10); /* (색상, 시작거리, 끝거리) */

// renderer 그림자 켜기
renderer.shadowMap.enabled = true;

// 빛에서 그림자 켜기
light.castShadow = true;

// 박스 그림자 켜기
box.castShadow = true;
box2.castShadow = true;
box3.castShadow = true;
card.castShadow = true;

// 바닥 만들기
const floorGeometry = new THREE.PlaneGeometry(10, 10); /* 가로10, 세로10 평평한 바닥을 만든다 */

const floorMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
});

const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2; /* 바닥을 눕힌다 */
floor.position.y = -1;
floor.receiveShadow = true;

// 장면에 만든 요소 추가
scene.add(box);
scene.add(box2);
scene.add(box3);
scene.add(card);
scene.add(light);
scene.add(floor);

// 카메라 위치 조정
camera.position.z = 5;

// 화면 크기에 맞게 3D 요소 조절하기
function setResponsiveObject() {
  if (window.innerWidth <= 550) {
    camera.position.z = 8;

    box.scale.set(0.7, 0.7, 0.7);
    box2.scale.set(1, 1, 1);
    box3.scale.set(0.6, 0.6, 0.6);
    card.scale.set(0.8, 0.8, 0.8);

    box2.position.x = 1.3;
    box3.position.x = -1.3;
  } else {
    camera.position.z = 5;

    box.scale.set(1, 1, 1);
    box2.scale.set(2, 1, 1);
    box3.scale.set(1, 2, 1);
    card.scale.set(1, 1, 1);

    box2.position.x = 2;
    box3.position.x = -2;
  }
}

setResponsiveObject();

// 애니메이션처럼 화면을 다시 그림
function animate() {
  requestAnimationFrame(animate);

  // 스크롤에 따라 박스 움직이기
  box.position.y = -scrollY * 0.005;
  box.rotation.y = scrollY * 0.005;

  box2.position.y = -scrollY * 0.005;
  box2.rotation.y = scrollY * 0.005;

  box3.position.y = -scrollY * 0.005;
  box3.rotation.y = scrollY * 0.005;

  // 마우스에 따라 카드 기울이기
  card.rotation.y += (mouse.x * 0.8 - card.rotation.y) * 0.08;
  card.rotation.x += (mouse.y * 0.8 - card.rotation.x) * 0.08;

  controls.update(); /* 마우스 조작 상태를 화면에 반영 */

  renderer.render(scene, camera); /* 화면에 그려주는 도구에 장면과 카메라를 그려줌 */
}

animate();

// 화면 크기가 바뀌면 다시 맞추기
window.addEventListener("resize", () => {
  camera.aspect = canvas.clientWidth / canvas.clientHeight; /* 캔버스 기준으로 변경 */
  camera.updateProjectionMatrix(); /* 바뀐 카메라 비율을 다시 계산 */

  renderer.setSize(canvas.clientWidth, canvas.clientHeight); /* 캔버스 크기에 맞춤 */

  setResponsiveObject();
});
