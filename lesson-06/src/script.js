import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'

/**
 * Anotations
 * 
 * You're not supposed to use the Camera constructor just as it is because is an abstract class. 
 * OrthographicCamera render the scene without a perspective, so the objects in the scene will always have the same size no matter the distance from the center of the scene (no Vanishing Point)
 * PerspectiveCamera renders the scene with perspective BUT we can use our cursor to move the object with this camera which is really cool. 
 */


/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
    width: 800,
    height: 600
}
const aspectRatio = sizes.width / sizes.height
console.log(aspectRatio)
/**
 * How to get the coordinates of the Cursor?
 * 
 * The values by default of the events clientX and clientY come on pixels, but we want something with an amplitude of 1 and that can be both negative and positive. When we normalize these values for X and Y, it will be easier later to give to three.js (which works with coordenates not pixels) these values. Also, in three.js normaly the Y axis goes upwards, but the coordenates of the clientY go down, so to get it normalize we will have to invert the value from cursor.y
 */

const cursor = {
    x: 0,
    y: 0
}

window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = - (event.clientY / sizes.height - 0.5)
})



// Scene
const scene = new THREE.Scene()

// Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
scene.add(mesh)

// Camera
// PerspectiveCamera the first parameters is the Field of View, is the vertical vision in degrees (also called fav). 
// The second parameter is the aspect ratio (width divided by height)
// The third and fourth parameters are near and far in that order. This corresponds to how close/far the camera can see. Don't use extreme values on these like 0.00001 and 999999, so to avoid z-fighting (you wouldn't know if an object is close or not to another, like the perspective will be all fucked basically.)
const camera = new THREE.PerspectiveCamera(75, aspectRatio)
// camera.position.x = 2
// camera.position.y = 2
camera.position.z = 2.5
camera.lookAt(mesh.position)
scene.add(camera)

/**
 * OrthographicCamera
 * Instead of a FoV, we provide how far the camera can see in each direction (left, right, top and bottom) and then you can pass how near and how far too.
 * You will notice if you use the default values the box will look a little ratfucked, so to fix this you just have to pass down the aspect ratio to the left and right parameters, like so:
 * new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1)
 * you can then modify how near of how far you want the camera 
 */
// const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100)
// camera.position.x = 2
// camera.position.y = 2
// camera.position.z = 2
// camera.lookAt(mesh.position)
// scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
// Damping
// we can actually declared it here, but it needs to render for each frame to work smoothly
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    // mesh.rotation.y = elapsedTime;

    // Camera
    // Pointer Lock Controls, look at the link for more info, is more like a PoV, really cool
    // Orbit Control - Really cool too, zoom in zoom out, move but overhead-like (I think we will use this later)
    // Transform control is like giving the user an editor tool (can move the object on the X axis, Y axis, etc), nothing to do really with the camera look but I think Simon mentions it because it will be used later I guess Theres also Drag Controls, same thing.


    // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3
    // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3
    // camera.position.y = cursor.y * 3
    // camera.lookAt(mesh.position)

    // Damping update
    controls.update()    


    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()