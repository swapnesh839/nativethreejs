import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js"
const scene = new THREE.Scene
const canvas = document.getElementById("app")
import fragmentshader from "../glsl/fragment.glsl?raw"
import vertexShader from "../glsl/vertex.glsl?raw"

const Camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,.1,1000)
Camera.position.set(0,0,3)
// Camera.position.x= 1
// Camera.rotateY()
scene.add(Camera)


const renderer = new THREE.WebGLRenderer({
  canvas:canvas,
  antialias:true
})
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio)
// renderer.setClearColor("red")
const controler = new OrbitControls(Camera,renderer.domElement)
controler.rotateSpeed=1.3
const setuporbitalcontrol= ()=>{
  requestAnimationFrame(setuporbitalcontrol)
  controler.update()
  renderer.render(scene,Camera)
}

const spherematerials = new THREE.ShaderMaterial({
  vertexShader: vertexShader, // Add your vertex shader code here
  fragmentShader: fragmentshader
})
const sphere = new THREE.Mesh(new THREE.IcosahedronGeometry(1,5),spherematerials)
scene.add(sphere)
// setuporbitalcontrol()
//ambientlight
const ambientlight = new THREE.AmbientLight("white",1)// color ,intensity,distance,decay
// ambientlight.position = Camera.position
scene.add(ambientlight)

//directionallight
const directionallight1 = new THREE.DirectionalLight("white",1)
directionallight1.position.set(1,3,4)
scene.add(directionallight1)


renderer.setSize(window.innerWidth,window.innerHeight)
renderer.render(scene,Camera)