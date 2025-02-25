import gsap from 'gsap'
import GUI from 'lil-gui'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Debug
 * On the top right corner of the experience, you can see an empty panel. There are different types of tweaks you can add to that panel:
 * Range —for numbers with minimum and maximum value
 * Color —for colors with various formats
 * Text —for simple texts
 * Checkbox —for booleans (true or false)
 * Select —for a choice from a list of values
 * Button —to trigger functions
 * Most of these can be added instanciating GUI.add(...) 
 * The parameters will be the object and the property of that object
 */
const gui = new GUI()


/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)
const material = new THREE.MeshBasicMaterial({ color: '#ca42cd', wireframe: true })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// RANGE
gui.add(mesh.position, 'y', -3, 3, 0.01).name('Elevation')
// Simmon prefers doing it like this because it gives more context on the parameters and what do they mean:
/**
 * gui.add(mesh.position, 'y')
 * .min(-3)
 * .max(3)
 * .step(0.01)
 * .name('elevation')
 */
// CHECKBOX
gui.add(mesh, 'visible')
gui.add(material, 'wireframe')
// Theres a thing with the color selection on the Controls.. 
// If you select another color and take the hexadecimal value from the Controls, and put on the definition of your material, it won't be the same color. Why? Because Three.js applies color management in order to optimise the rendering.
// Three.js expects an object (because it manages colors by RGB, not hexadecimal values internally) and lil-gui uses hexadecimal values internally, so when you pass down those values, they are not the same
// There are multiple ways to solve this, one of them is retrieving the color used internally by three.js with the getHexString() method on the Color instance when the value changes:

gui.addColor(material, 'color').onChange(function(value) {
    console.log(value.getHexString())
})

/**
 * Sizes
 */
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

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
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