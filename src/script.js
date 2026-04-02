import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Timer } from 'three/addons/misc/Timer.js'
// import GUI from 'lil-gui'
import { Sky } from 'three/addons/objects/Sky.js'

/**
 * Base
 */
// Debug
// const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// const axesHelper = new THREE.AxesHelper( 3 );
// scene.add( axesHelper );


// Textures
const textureLoader = new THREE.TextureLoader()

const doorColorTexture =  textureLoader.load('/door/color.webp')
const doorAlphaTexture =  textureLoader.load('/door/alpha.webp')
const doorHeightTexture =  textureLoader.load('/door/height.webp')
const doorNormalTexture =  textureLoader.load('/door/normal.webp')
const doorAmbientOcclusionTexture =  textureLoader.load('/door/ambientOcclusion.webp')
const doorMetalnessTexture =  textureLoader.load('/door/metalness.webp')
const doorRoughnessTexture =  textureLoader.load('/door/roughness.webp')

const floorColorTexture =  textureLoader.load('/floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_diff_1k.webp')
const floorAlphaTexture =  textureLoader.load('/floor/alpha.webp')
const floorNormalTexture =  textureLoader.load('/floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_nor_gl_1k.webp')
const floorARMTexture =  textureLoader.load('/floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_arm_1k.webp')
const floorDisplacementTexture =  textureLoader.load('/floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_disp_1k.webp')

const wallColorTexture =  textureLoader.load('/wall/castle_brick_broken_06_1k/castle_brick_broken_06_diff_1k.webp')
const wallNormalTexture =  textureLoader.load('/wall/castle_brick_broken_06_1k/castle_brick_broken_06_nor_gl_1k.webp')
const wallARMTexture =  textureLoader.load('/wall/castle_brick_broken_06_1k/castle_brick_broken_06_arm_1k.webp')


const roofColorTexture =  textureLoader.load('/roof/roof_slates_02_1k/roof_slates_02_diff_1k.webp')
const roofNormalTexture =  textureLoader.load('/roof/roof_slates_02_1k/roof_slates_02_nor_gl_1k.webp')
const roofARMTexture =  textureLoader.load('/roof/roof_slates_02_1k/roof_slates_02_arm_1k.webp')

const bushColorTexture =  textureLoader.load('/bush/leaves_forest_ground_1k/leaves_forest_ground_diff_1k.webp')
const bushNormalTexture =  textureLoader.load('/bush/leaves_forest_ground_1k/leaves_forest_ground_nor_gl_1k.webp')
const bushARMTexture =  textureLoader.load('/bush/leaves_forest_ground_1k/leaves_forest_ground_arm_1k.webp')

const graveColorTexture =  textureLoader.load('/grave/plastered_stone_wall_1k/plastered_stone_wall_diff_1k.webp')
const graveNormalTexture =  textureLoader.load('/grave/plastered_stone_wall_1k/plastered_stone_wall_nor_gl_1k.webp')
const graveARMTexture =  textureLoader.load('/grave/plastered_stone_wall_1k/plastered_stone_wall_arm_1k.webp')

doorColorTexture.colorSpace = THREE.SRGBColorSpace
floorColorTexture.colorSpace = THREE.SRGBColorSpace
wallColorTexture.colorSpace = THREE.SRGBColorSpace
roofColorTexture.colorSpace = THREE.SRGBColorSpace
bushColorTexture.colorSpace = THREE.SRGBColorSpace
graveColorTexture.colorSpace = THREE.SRGBColorSpace

floorColorTexture.repeat.set(8, 8)
floorNormalTexture.repeat.set(8, 8)
floorARMTexture.repeat.set(8, 8)
floorDisplacementTexture.repeat.set(8, 8)

roofColorTexture.repeat.set(3, 1)
roofNormalTexture.repeat.set(3, 1)
roofARMTexture.repeat.set(3, 1)

bushColorTexture.repeat.set(2, 1)
bushNormalTexture.repeat.set(2, 1)
bushARMTexture.repeat.set(2, 1)

floorColorTexture.wrapS = THREE.RepeatWrapping
floorNormalTexture.wrapS = THREE.RepeatWrapping
floorARMTexture.wrapS = THREE.RepeatWrapping
floorDisplacementTexture.wrapS = THREE.RepeatWrapping
floorColorTexture.wrapT = THREE.RepeatWrapping
floorNormalTexture.wrapT = THREE.RepeatWrapping
floorARMTexture.wrapT = THREE.RepeatWrapping
floorDisplacementTexture.wrapT = THREE.RepeatWrapping

roofColorTexture.wrapS = THREE.RepeatWrapping
roofNormalTexture.wrapS = THREE.RepeatWrapping
roofARMTexture.wrapS = THREE.RepeatWrapping

roofColorTexture.wrapT = THREE.RepeatWrapping
roofNormalTexture.wrapT = THREE.RepeatWrapping
roofARMTexture.wrapT = THREE.RepeatWrapping

bushColorTexture.wrapS = THREE.RepeatWrapping
bushNormalTexture.wrapS = THREE.RepeatWrapping
bushARMTexture.wrapS = THREE.RepeatWrapping

bushColorTexture.wrapT = THREE.RepeatWrapping
bushNormalTexture.wrapT = THREE.RepeatWrapping
bushARMTexture.wrapT = THREE.RepeatWrapping

/**
 * House
 */
// Temporary sphere
// const sphere = new THREE.Mesh(
//     new THREE.SphereGeometry(1, 32, 32),
//     new THREE.MeshStandardMaterial({ roughness: 0.7 })
// )

// scene.add(sphere)

// House container
const house = new THREE.Group()
scene.add(house)

// Walls
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4, 2.5, 4),
    new THREE.MeshStandardMaterial({
        map: wallColorTexture,
        normalMap: wallNormalTexture,
        aoMap: wallARMTexture,
        roughnessMap: wallARMTexture,
        metalnessMap: wallARMTexture,
    })
)
walls.position.y += 1.25
house.add(walls)

// Roof
const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5, 2, 4),
    new THREE.MeshStandardMaterial({
        map: roofColorTexture,
        normalMap: roofNormalTexture,
        aoMap: roofARMTexture,
        roughnessMap: roofARMTexture,
        metalnessMap: roofARMTexture,
    })
)
roof.position.y = 2.5 + 1
roof.rotation.y = Math.PI * 0.25
house.add(roof)

// FLoor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20, 100, 100),
    new THREE.MeshStandardMaterial(
        {
            map: floorColorTexture,
            alphaMap: floorAlphaTexture,
            roughnessMap: floorARMTexture,
            metalnessMap: floorARMTexture,
            normalMap: floorNormalTexture,
            displacementMap: floorDisplacementTexture,
            displacementScale: 0.3,
            displacementBias: -0.2,
            transparent: true,
            aoMap: floorARMTexture,
        }
    )
)

// gui.add(floor.material, 'displacementScale').min(0).max(1).step(0.001)
// gui.add(floor.material, 'displacementBias').min(-1).max(1).step(0.001)

floor.rotation.set(- Math.PI / 2, 0, 0)
scene.add(floor)

// Door
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
    new THREE.MeshStandardMaterial({
        map: doorColorTexture,
        alphaMap: doorAlphaTexture,
        normalMap: doorNormalTexture,
        aoMap: doorAmbientOcclusionTexture,
        roughnessMap: doorRoughnessTexture,
        metalnessMap: doorMetalnessTexture,
        displacementMap: doorHeightTexture,
        displacementScale: 0.1,
        displacementBias: -0.04,
        transparent: true,
    })
)

door.position.set(0, 1, 2.01)
house.add(door)

// Bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16)
const bushMaterial = new THREE.MeshStandardMaterial({
    color: '#ccffcc',
    map: bushColorTexture,
    normalMap: bushNormalTexture,
    aoMap: bushARMTexture,
    roughnessMap: bushARMTexture,
    metalnessMap: bushARMTexture,
})

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush1.scale.set(0.5, 0.5, 0.5)
bush1.position.set(1.5, 0.2, 2.2)
bush1.rotation.x = - 0.75
house.add(bush1)

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.scale.set(0.5, 0.5, 0.5)
bush2.position.set(-1.5, 0.2, 2.2)
bush2.rotation.x = - 0.75
house.add(bush2)

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.scale.set(0.3, 0.3, 0.3)
bush3.position.set(2, 0.2, 2.2)
bush3.rotation.x = - 0.75
house.add(bush3)

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush4.scale.set(0.3, 0.3, 0.3)
bush4.position.set(-2, 0.2, 2.2)
bush4.rotation.x = - 0.75
house.add(bush4)


// Graves
const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2)
const graveMaterial = new THREE.MeshStandardMaterial(
    {
        map: graveColorTexture,
        normalMap: graveNormalTexture,
        aoMap: graveARMTexture,
        roughnessMap: graveARMTexture,
        metalnessMap: graveARMTexture,
    }
)
const graves = new THREE.Group()
scene.add(graves)


const randomGravePosition = (max = 8, min = -8) => { 
    const randomValue = Math.random() * (max - min + 1) + min
    // const minimumPosition = randomValue >= -3 && randomValue <= 3
    // // const maximumPosition = randomValue <= -6 && randomValue >= 6
    // return minimumPosition ? randomGravePosition() : randomValue
    return randomValue
}


for (let i = 0; i < 30; i++) {
    const angle = Math.random() * Math.PI * 2
    const x = Math.sin(angle)
    const z = Math.cos(angle)
    const radius = 3 + Math.random() * 5
    const grave = new THREE.Mesh(graveGeometry, graveMaterial)
    grave.position.set(x * radius, Math.random() * 0.4, z * radius)
    grave.rotation.x = (Math.random() - 0.5) * 0.4
    grave.rotation.z = (Math.random() - 0.5) * 0.4
    grave.rotation.y = (Math.random() - 0.5) * 0.4

    graves.add(grave)
}


/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#86cdff', 0.275)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight('#86cdff', 1)
directionalLight.position.set(3, 2, -8)
scene.add(directionalLight)


// Door light
const doorLight = new THREE.PointLight('#ff7d46', 4, 7, 1.5)
doorLight.position.set(0, 2.2, 2.01)
house.add(doorLight)

/**
 * Ghosts
 */
const ghost1 = new THREE.PointLight('#8800ff', 6)
const ghost2 = new THREE.PointLight('#ff0088', 6)
const ghost3 = new THREE.PointLight('#ff0000', 6)
scene.add(ghost1, ghost2, ghost3)
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
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.maxPolarAngle = Math.PI / 2 - 0.05
controls.minDistance = 5
controls.maxDistance = 20

/**
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Shadows
 */
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

directionalLight.castShadow = true
ghost1.castShadow = true
ghost2.castShadow = true
ghost3.castShadow = true

walls.castShadow = true
walls.receiveShadow = true
roof.receiveShadow = true
roof.castShadow = true
floor.receiveShadow = true
door.receiveShadow = true 

graves.children.forEach(child => {
    child.castShadow = true
    child.receiveShadow = true
})

// Mapping
directionalLight.shadow.mapSize.width = 256
directionalLight.shadow.mapSize.height = 256
directionalLight.shadow.camera.top = 8
directionalLight.shadow.camera.right = 8
directionalLight.shadow.camera.bottom = - 8
directionalLight.shadow.camera.left = - 8
directionalLight.shadow.camera.near = 1
directionalLight.shadow.camera.far = 20

ghost1.shadow.mapSize.width = 256
ghost1.shadow.mapSize.height = 256 
ghost1.shadow.camera.far = 10

ghost2.shadow.mapSize.width = 256
ghost2.shadow.mapSize.height = 256
ghost2.shadow.camera.far = 10

ghost3.shadow.mapSize.width = 256
ghost3.shadow.mapSize.height = 256
ghost3.shadow.camera.far = 10

// Sky
const sky = new Sky()
sky.scale.setScalar(450000)
scene.add(sky)

sky.material.uniforms.turbidity.value = 10
sky.material.uniforms.rayleigh.value = 3
sky.material.uniforms.mieCoefficient.value = 0.1
sky.material.uniforms.mieDirectionalG.value = 0.95
sky.material.uniforms.sunPosition.value.set(0.3, -0.038, -0.95)

/**
 * Fog
 */
scene.fog = new THREE.FogExp2(0x02343f, 0.12)

/**
 * Animate
 */
const timer = new Timer()

const tick = () =>
{
    // Timer
    timer.update()
    const elapsedTime = timer.getElapsed()

    // ghosts
    const ghostAngle = elapsedTime * 0.5
    ghost1.position.x = Math.cos(ghostAngle) * 4
    ghost1.position.z = Math.sin(ghostAngle) * 4
    ghost1.position.y = Math.sin(ghostAngle) * Math.sin(ghostAngle * 2.34) * Math.cos(ghostAngle * 3.45) + 1

    const ghost2Angle = - elapsedTime * 0.38
    ghost2.position.x = Math.cos(ghost2Angle) * 5
    ghost2.position.z = Math.sin(ghost2Angle) * 5
    ghost2.position.y = Math.sin(ghost2Angle) * Math.sin(ghost2Angle * 2.34) * Math.cos(ghost2Angle * 3.45) + 1

    const ghost3Angle = - elapsedTime * 0.23
    ghost3.position.x = Math.cos(ghost3Angle) * 6
    ghost3.position.z = Math.sin(ghost3Angle) * 6
    ghost3.position.y = Math.sin(ghost3Angle) * Math.sin(ghost3Angle * 2.34) * Math.cos(ghost3Angle * 3.45) + 1

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()