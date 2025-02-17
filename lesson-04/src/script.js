import * as THREE from 'three';
import { LineGeometry } from 'three/examples/jsm/Addons.js';

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// Its important to understand and use the Group class for putting a set of objects, that way it will become more easy later for scaling and position or rotation of multiple objects on our scene. So always use Group.

const group = new THREE.Group();
const cube1 = new THREE.Mesh(new THREE.SphereGeometry(0.65, 32, 32), new THREE.MeshBasicMaterial({ color: 0xff0000 }));
cube1.position.x = -2;
group.add(cube1);
const cube2 = new THREE.Mesh(
  new THREE.SphereGeometry(0.65, 32, 32),

  new THREE.MeshBasicMaterial({ color: 0x0000ff })
);
cube2.position.x = 2;
group.add(cube2);
const cube3 = new THREE.Mesh(
  new THREE.SphereGeometry(0.65, 32, 32),

  new THREE.MeshBasicMaterial({ color: 0x00ff00 })
);
group.add(cube3);

scene.add(group);

/**
 * Objects
 */
// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({ color: 0x0099FF })
// const mesh = new THREE.Mesh(geometry, material)
// scene.add(mesh)

// we consider for three.js only:
// y axis going upward
// x axis going right
// z axis going to the back/forward to the camera (relative)
// decide the messure as you like, if you are building a house, let the 1 = meter
// mesh.position.y = - 0.6
// mesh.position.x = 0.7
// mesh.position.z = 1

// This is the same as above
// mesh.position.set(0.7, - 0.6, 1)

// Scale
// mesh.scale.x = 1
// mesh.scale.y = 0.5
// mesh.scale.z = 0.5
// This is the same as above
// mesh.scale.set(1, 0.5, 0.5)

// Rotation
// If you have an object and you want to rotate it to like left-right, you should imagine a line go straight through the center in like the Y axis
// If you imagine like wheels on each side of the object, its the X axis
// If yuo imagine like twisting the object itself its the Z axis (I think)
// Half a rotation is = to PI (3.14159..) or Math.PI
// Be careful! If you rotate, remember the axis orientation will also change! (Gimbal Lock)
// You can change the order in which three.js renders in order this axis, for example on an fps game you will need first three.js to consider the Y axis, not the X axis, so you can call the function mesh.rotation.reorder('YXZ') BEFORE rotating, that way you will have this priority
// mesh.rotation.x = Math.PI / 2 This is a 90 degree rotation across the X AXIS
// mesh.rotation.y = Math.PI * 0.25
// mesh.rotation.z = 1

// Axes helper, comes to use if we have some trouble positioning things on space. You can also pass a number to the object AxesHelper and it will make the helper bigger
// Red = positive X axis
// Green = positive Y axis
// Blue = positive Z axis
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

// console.log('distance between the center of the scene and our object position', mesh.position.length())

// this method will reduce the length to the vector to be = 1
// mesh.position.normalize()

/**
 * Sizes
 */
const sizes = {
  width: 800,
  height: 600,
};

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// If we use this method, it will be easy to understand or better, align the object rotation with the global rotation, its better for having a good reference.
// camera.lookAt(mesh.position)

// console.log('distance between the camera and the object', mesh.position.distanceTo(camera.position))

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
