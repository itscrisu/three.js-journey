import gsap from 'gsap'
import * as THREE from 'three'



// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1.25, 1.1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// We can do the same as we did below calculating the framerate, but three.js has a built-in solution: Clock
const clock = new THREE.Clock()

// Timestamp
// let currentTime = Date.now()

// This will help us to make movements more "easily" but we will still need to render our animation on our own
// So probably it will depend on what you want to do
gsap.to(mesh.position, {duration: 1, delay: 1, x: 2})

// Animation
const animation = () =>
{
    const elapsedTime = clock.getElapsedTime()
    // Calculate the framerate to be the exact same no matter the fps of the user's setup
    // const animationTime = Date.now()
    // const deltaTime = animationTime - currentTime
    // currentTime = animationTime
    
    // Update objects
    // Now the rotation will be the same regardless of the user's framerate setup
    // mesh.rotation.y += 0.0009 * deltaTime
    // mesh.rotation.y = elapsedTime
    // Rotation of camera + rotation of object clockwise:
    // camera.position.y = Math.sin(elapsedTime)
    // camera.position.x = Math.cos(elapsedTime)
    // camera.lookAt(mesh.position)
    // If I wanted to rotate the object 1 full rotation per sec, then I will do this:
    // mesh.rotation.y = elapsedTime * Math.PI * 2

    // Render
    renderer.render(scene, camera)

    window.requestAnimationFrame(animation)
}

animation()