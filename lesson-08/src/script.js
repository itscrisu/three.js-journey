import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
/**
 * What is a geometry object in three.js?
 * 
 * Its an object composed by vertices (point coordinates in 3D spaces) and faces (triangles that join those vertices to create a surface, what he explained in the first lessons)
 * These objects can be used for meshes but also for particles. Can also store more data than the positions (UV Coordinates, normals, colors, anything really)
 * 
 * There are a lot of built-in geometries. All of these inherit from the BufferGeometry class. This class it also has a lot of built in methods, like translate(), rotateX(), normalize(). This way you are not going to translate or do anything to the mesh but to the vertices itself of the 3D Object (we will see a few examples, but mostly we only apply methods to the mesh itself, so the full object or all the vertices combined really) Theres a built-in geometry called simply Shape which you can pass a lot of parameters to create a custom shape (see documentation on three.js)
 * 
 * The box (BoxGeometry) example:
 * It has 6 parameters
 * width: size on the X axis
 * height: size on the Y axis
 * depth: size on the Z axis
 * widthSegments: How many subdivisions (how much triangles) in the X axis
 * heightSegments: How many subdiv in the Y axis
 * depthSegments: How many subdiv in the Z axis
 * 
 * You can create a custom geometry, but before going into that, we need to understand how to store buffer geometry data, because as we saw previously, we can store a lot of things (UV, position, etc)
 *  
 * 
 * We will use Float32Array because WebGL works better with data buffers (binary) than simple javascript arrays. This way your GPU can read directly the information without any unnecessary conversions. 
 * Float32Array is a Typed array, and can only store floats, it can only follow 3 values so it has a fixed length.
 */

// const vertices = new Float32Array([
//     0, 1, 0, // Vertex 1 (x, y, z)
//     -1, -1, 0, // Vertex 2
//     1, -1, 0 // Vertex 3
// ])

// what if we want to create more than 1 triangle?
const count = 50
// This will create 50 triangles x 3 vertices x 3 coordinates
const vertices = new Float32Array(count * 3 * 3)
for (let i = 0; i < count * 3 * 3; i++){

    // now we run the array and we are putting random values between -2 and 2. Why?
    // Math.random will generate a random number between 0 and 1
    // putting - 0.5 will change that to be between -0.5 and 0.5
    // multiplying by 4 = -2 and 2
    // each value corresponds to a coordinate (x, y, z) for a vertex for some triangle
    vertices[i] = (Math.random() - 0.5) * 4
}

// const geometry = new THREE.BoxGeometry(1, 1, 1, 8, 8, 8)
const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()