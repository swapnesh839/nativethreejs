import * as THREE from 'three';
import { ARButton } from 'three/examples/jsm/webxr/ARButton.js';

// Create the scene
const scene = new THREE.Scene();
const canvas = document.getElementById("app");

// Set up the camera
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 3);

// Set up the renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true,
  });
// const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.xr.enabled = true;

// Append the renderer to the canvas
// canvas.appendChild(renderer.domElement);

// Add AR button with improved styling
const arButton = ARButton.createButton(renderer);
arButton.style.position = 'absolute';
arButton.style.bottom = '20px';
arButton.style.right = '20px';
arButton.style.padding = '12px 16px';
arButton.style.zIndex = '99999';
arButton.style.background = 'rgba(0, .4, .3, 0.8)';
arButton.style.borderRadius = '8px';
arButton.style.color = '#fff';
arButton.style.fontFamily = 'Arial, sans-serif';
document.body.appendChild(arButton);

// Create a simple cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 'blue' });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Set up the animation loop
function animate() {
  renderer.setAnimationLoop(() => {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
});
}
renderer.render(scene, camera);

// Start the animation loop
animate();

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
