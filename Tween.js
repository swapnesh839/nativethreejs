import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// Create the scene
const scene = new THREE.Scene();

// Set up the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(1, 3, 3);
scene.add(camera);

// Set up the renderer
const canvas = document.getElementById("app");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Set up the controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.rotateSpeed = 0.9;

// Create box meshes
const box1 = new THREE.Mesh(
  new THREE.BoxGeometry(5, 0.1, 5),
  new THREE.MeshBasicMaterial({ color: "red" })
);
const box2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "green" })
);
box1.position.y = -0.5;
scene.add(box1);
scene.add(box2);

// Ambient light
const ambientLight = new THREE.AmbientLight("white", 1); // color, intensity
scene.add(ambientLight);

// Directional light
const directionalLight1 = new THREE.DirectionalLight("white", 1);
directionalLight1.position.set(1, 3, 4);
scene.add(directionalLight1);

// Set up Tween
const transition = new TWEEN.Tween({ x: 0, y: 0, z: 0 })
  .to({ x: 1, y: 0, z: 0 }, 2000)
  .onUpdate((e) => {
    box2.position.x = e.x;
  })
  .start();

// Combined animation loop
const animate = (time) => {
  requestAnimationFrame(animate);
  TWEEN.update(time);
  controls.update();
  renderer.render(scene, camera);
};
animate();
