import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

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
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0x0000ff })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

window.addEventListener('resize', (e) => {
    // Update size
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height

    // when changing the aspect, we need to update the projection matrix
    // Until here we are changing the logic of the size, but not the actual physical size of the canvas
    camera.updateProjectionMatrix()
    // so we actually need to update the renderer size
    renderer.setSize(sizes.width, sizes.height);
    // here everything works almost fine. If you see a blurry render or like 'stairs' effect on the object, might be that the monitor has a pixel ratio greater than 1
    // The pixel ratio its the relation between physical pixels (monitor) and the logic pixels (software/css)
    // if pixel ratio 2 = 4 times more pixels to render
    // if pixel ratio 3 = 9 times more pixels to render
    // so this can be very hard on the GPU. Highest pixel ratios are (usually) on the weakest devices. Go for a ratio max of 3, not more.
    // we have to set it on the resize event in case the user changes the window from a screen to another.
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

}) 

// This won't work on Safari!
window.addEventListener('dblclick', () => {
    !document.fullscreenElement ? 
    canvas.requestFullscreen() : 
    document.exitFullscreen()
})

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