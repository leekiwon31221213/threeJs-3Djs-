import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";

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

// 박스 재질 만들기 MeshBasicMaterial 빛을 받지 않는 재질
const meterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

// 박스 만들기
const box = new THREE.Mesh(getmetry, meterial);

// 장면에 만든 박스 추가 3D 공간안에 넣음
scene.add(box);

//카메라 위치 조정
camera.position.z = 5;

// 애니메이션처럼 화면을 다시 그림
function animate() {
  requestAnimationFrame(animate);
  box.rotation.x += 0.01; /* x축 */
  box.rotation.y += 0.01; /* y축 */

  renderer.render(scene, camera); /* 화면에 그려주는 도구에 장면과 카메라를 그려줌 */
}

animate();

// 화면 크기가 바뀌면 다시 맞추기
window.addEventListener("resize", () => {
  camera.addEventListener = window.innerWidth / window.innerHeight; /*  카메라 화면 비율을 현재 브라우저 크기에 맞춤 */
  camera.updateProjectionMatrix(); /* 바뀐 카메라 비율을 다시 계산 */
  renderer.setSize(window.innerWidth, window.innerHeight); /* 3D 화면 크기를 현재 브라우저 크기에 맞춤 */
});
