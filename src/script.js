import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color(0xfffccc)

// Objects
// const geometry = new THREE.TorusGeometry( 1, .3, 16, 100 );
const geometry2 = new THREE.BoxGeometry( .5, 1, 1 ); 
const material2 = new THREE.MeshBasicMaterial( {color: 0xcccccc} );
// material2.color = new THREE.Color(0xff0000);
const cube = new THREE.Mesh( geometry2, material2 ); 
// scene.add( cube );

const wireframe = new THREE.WireframeGeometry( geometry2 );
const line = new THREE.LineSegments( wireframe );
line.material.color = new THREE.Color(0x505050)
// line.material.depthTest = false;
// line.material.opacity = 0.25;
// line.material.transparent = true;
scene.add( line );

// // Materials
// const material = new THREE.MeshBasicMaterial()
// material.color = new THREE.Color(0xff0000)

// // Mesh
// const sphere = new THREE.Mesh(geometry,material)
// scene.add(sphere)

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

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
camera.position.x = 0
camera.position.y = 0
camera.position.z = 3
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

    // // Update objects
    // sphere.rotation.y = .5 * elapsedTime

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()