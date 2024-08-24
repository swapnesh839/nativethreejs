import * as THREE from "three";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader"
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js"
const scene = new THREE.Scene
const canvas = document.getElementById("app")

const textureloader = new THREE.TextureLoader

// const geometry = new THREE.BoxGeometry(1,1,1)
// const material = new THREE.MeshBasicMaterial({color:"red"})
// const Cube = new THREE.Mesh(geometry,material)
// Cube.rotation.set()
// scene.add(Cube)
// Cube.position.normalize()

// console.log(Cube.position.distanceTo(Camera.position))
// console.log(Cube.position.distanceTo(Camera.position))

// const spherematerial =new THREE.MeshBasicMaterial({ color: 0x00ff00 })
// const spheregeometry =  new THREE.SphereGeometry(1, 32, 32)
// const sphere = new THREE.Mesh(spheregeometry,spherematerial)
// scene.add(sphere)


const planematerial = new THREE.MeshBasicMaterial({
  color:"purple",
  side:THREE.DoubleSide
})
const planegeometry = new THREE.PlaneGeometry(1,1)
const planetexture = textureloader.load("https://images.pexels.com/photos/235985/pexels-photo-235985.jpeg?auto=compress&cs=tinysrgb&w=400") 
const plane = new THREE.Mesh(planegeometry,planematerial)
scene.add(plane)


// const point = new THREE.Vector2()




const Camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,.1,1000)

Camera.position.set(-1,1,3)
Camera.position.x= 1
// Camera.rotateY()
scene.add(Camera)


const renderer = new THREE.WebGLRenderer({
  canvas:canvas,
  antialias:true
})
// renderer.setClearColor("red")
const controler = new OrbitControls(Camera,renderer.domElement)
controler.rotateSpeed=1.3
const setuporbitalcontrol= ()=>{
  requestAnimationFrame(setuporbitalcontrol)
  controler.update()
  renderer.render(scene,Camera)
}
setuporbitalcontrol()
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