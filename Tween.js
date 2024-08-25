import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// Create the scene
const scene = new THREE.Scene();
// Set up the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 7, 1);
scene.add(camera);


// axesHelper
const axesHelper = new THREE.AxesHelper(5); 
scene.add(axesHelper);
const axesHelper2 = new THREE.AxesHelper(-5); 
scene.add(axesHelper2);

// Set up the renderer
const canvas = document.getElementById("app");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);



// Set up the orbitalcontrols
const controls = new OrbitControls(camera, renderer.domElement);
controls.rotateSpeed = 0.9;
const animate = () => {
  requestAnimationFrame(animate)
  controls.update()
  renderer.render(scene, camera);
}
animate()

// Create box meshes
const box1 = new THREE.Mesh(
  new THREE.BoxGeometry(9, 0.1, 7),
  new THREE.MeshStandardMaterial({ color: "red" })
);
const box2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshStandardMaterial({ color: "green" })
);
box1.position.y = -0.5;
//ulternative
// box1.position.set(0, -0.5, 0
//Default is 0,0,0
scene.add(box1);
scene.add(box2);

// Ambient light
const ambientLight = new THREE.AmbientLight("white", 1); // color, intensity
scene.add(ambientLight);

// Directional light
const directionalLight1 = new THREE.DirectionalLight("white", 1);
directionalLight1.position.set(1, 3, 4);
scene.add(directionalLight1);



//manual movement on event
document.onkeydown = checkKey;
function checkKey(e) {

  if (e.keyCode == '38') {
    box2.position.z -= 0.1
  }
  else if (e.keyCode == '40') {
    box2.position.z += 0.1
  }
  else if (e.keyCode == '37') {
    box2.position.x -= 0.1
  }
  else if (e.keyCode == '39') {
    box2.position.x += 0.1
  }
  requestAnimationFrame(() => {
    renderer.render(scene, camera);
  })

}

renderer.render(scene, camera);


//manual rotation
const rotationrange = document.getElementById("Rotation")
rotationrange.addEventListener("input", (e) => {
  requestAnimationFrame(() => {
    box2.rotation.y = rotationrange.value
  })
})

//manual color change
const Boxcolor = document.getElementById("Boxcolor")
Boxcolor.addEventListener("input", (e) => {
  requestAnimationFrame(() => {
    box2.material.color.set(Boxcolor.value)
  })
})

//mamual light strength
const Lights = document.getElementById("Lights")
Lights.addEventListener("input", (e) => {

  if (Lights.checked) {
    ambientLight.intensity = 1
    directionalLight1.intensity = 1
  } else {
    ambientLight.intensity = 0
    directionalLight1.intensity = 0
  }
})