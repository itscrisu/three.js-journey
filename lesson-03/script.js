import * as THREE from 'three';

// Canvas can be created or not, depends on whatever we want the renderer to work on its own or do it ourselves

const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene();
// Object
const sphereGeometry = new THREE.SphereGeometry(1.5, 32, 32);
const material = new THREE.MeshBasicMaterial({
  color: 0x0000FF
})
const mesh = new THREE.Mesh(sphereGeometry, material);

scene.add(mesh)

// Camera 
// Parameters: 
// First: Field of view (how large your vision angle is expressed in degrees - Vertical vision angle)
// Second: Width / Height (aspect)

const size = {
  width: 800,
  height: 600
}

const camera = new THREE.PerspectiveCamera(75, size.width / size.height)
camera.position.z = 4
camera.position.y = 1
camera.position.x = 1
scene.add(camera)

const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})

renderer.setSize(size.width, size.height)

renderer.render(scene, camera)