import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.165.0/examples/jsm/controls/OrbitControls.js";

// 장면 만들기
const scene = new THREE.Scene();

// 카메라 만들기
const camera = new THREE.PerspectiveCamera(
  75 /* 시야각 */,
  window.innerWidth / window.innerHeight /* 화면비율 */,
  0.1 /* 카메라가 볼 수 있는 가장 가까운거리 */,
  1000 /* 카메라가 볼 수 있는 가장 먼 거리 */,
);

const canvas = document.getElementById("threeCanvas");

// 화면에 그려주는 도구 만들기
const renderer = new THREE.WebGLRenderer({ canvas });

// 브라우저 화면 크기만큼 3D 화면 크기를 설정
renderer.setSize(window.innerWidth, window.innerHeight);

// 박스 모양 만들기
const getmetry = new THREE.BoxGeometry(1, 1, 1);

const textureLoader = new THREE.TextureLoader(); /*  이미지를 불러오는 도구를 만듦 */
const boxTexture = textureLoader.load("/img/bamby.png"); /* 이미지 불러오기 */

// const boxTexture = textureLoader.load("https://iili.io/CO0IkAl.png");

// 박스 재질 만들기 MeshStandardMaterial 빛을 받는 재질
const meterial = new THREE.MeshStandardMaterial({ color: 0x00ff00, map: boxTexture });
const meterial2 = new THREE.MeshStandardMaterial({ color: 0xffff00, map: boxTexture });
const meterial3 = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.7 /* 표면이 얼마나 거친지 정하는 값 */, metalness: 1 /* 금속 느낌을 정하는 값 */, map: boxTexture /* 이미지 맵핑 */ });

// 박스 만들기
const box = new THREE.Mesh(getmetry, meterial);
const box2 = new THREE.Mesh(getmetry, meterial2);
const box3 = new THREE.Mesh(getmetry, meterial3);

box2.position.x = 2;
box3.position.x = -2;

box2.scale.x = 2;
box3.scale.y = -2;

// 빛 추가
const light = new THREE.DirectionalLight(0xffffff, 1); /* DirectionalLight(빛의색,빛의밝기) 한 방향에서 비추는 빛 */
light.position.set(3, 3, 3); /* 빛의 위치 설정  x,y,z 축*/

// 마우스로 화면 조작하기
const controls = new OrbitControls(camera, renderer.domElement);

// 배경색 넣기
scene.background = new THREE.Color(0xeaf1ff);

// 안개 넣기
scene.fog = new THREE.Fog(0xeaf1ff, 1, 10); /* (색상,시작거리,끝거리) */
/* renderer그림자 켜기 */
renderer.shadowMap.enabled = true;

/* 빛에서 그림자 켜기 */
light.castShadow = true;
box.castShadow = true;
box2.castShadow = true;
box3.castShadow = true;

/* 바닥에 그림자 만들기 */

const floorGeometry = new THREE.PlaneGeometry(10, 10); /* 가로10,세로10 평평한 바닥을 만든다 */
const floorMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
});

const floor = new THREE.Mesh(floorGeometry, floorMaterial); /* 재질을 만든다 */
floor.rotation.x = -Math.PI / 2; /* 바닥을 눕힌다. */
floor.position.y = -1;
floor.receiveShadow = true;
scene.add(floor);

// 장면에 만든 박스 추가 3D 공간안에 넣음
scene.add(box);
scene.add(box2);
scene.add(box3);
scene.add(light);

//카메라 위치 조정
camera.position.z = 5;

// 애니메이션처럼 화면을 다시 그림
function animate() {
  requestAnimationFrame(animate);

  box.rotation.x += 0.01; /* x축 */
  box.rotation.y += 0.01; /* y축 */

  box2.rotation.x += 0.01;
  box2.rotation.y += 0.01;

  box3.rotation.x += 0.01;
  box3.rotation.y += 0.01;

  controls.update(); /* 마우스 조작 상태를 화면에 반영 */

  renderer.render(scene, camera); /* 화면에 그려주는 도구에 장면과 카메라를 그려줌 */
}

animate();

// 화면 크기가 바뀌면 다시 맞추기
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight; /* 카메라 화면 비율을 현재 브라우저 크기에 맞춤 */
  camera.updateProjectionMatrix(); /* 바뀐 카메라 비율을 다시 계산 */
  renderer.setSize(window.innerWidth, window.innerHeight); /* 3D 화면 크기를 현재 브라우저 크기에 맞춤 */
});
