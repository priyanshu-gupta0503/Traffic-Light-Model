
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();

// Camera setup
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.y = 5;

// Renderer setup
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff); // Set background to white
document.getElementById('app').appendChild(renderer.domElement);

const runSimulationButton = document.getElementById('run-simulation');  
const resetButton = document.getElementById('reset');


// Giving Background a texture
const textureLoader = new THREE.TextureLoader();
const backgroundTexture = textureLoader.load('/Texture/abstract-blue-sky-background_24100-1580.jpg');
scene.background = backgroundTexture;

// Lighting setup
const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
hemiLight.position.set(0, 20, 0);
scene.add(hemiLight);

const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1);
directionalLight1.position.set(1, 1, 1).normalize();
scene.add(directionalLight1);

const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight2.position.set(-1, 1, -1).normalize();
scene.add(directionalLight2);

const ambientLight = new THREE.AmbientLight(0x404040, 1.5); // Increased intensity
scene.add(ambientLight);

const controls = new OrbitControls(camera, renderer.domElement);

const loader = new GLTFLoader();

function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
}

function loadModel(url, position, scale, rotationDegrees) {
    return new Promise((resolve, reject) => {
        loader.load(url, function (gltf) {
            const model = gltf.scene;

            model.position.set(position.x, position.y, position.z);
            model.scale.set(scale.x, scale.y, scale.z);
            model.rotation.set(
                degreesToRadians(rotationDegrees.x),
                degreesToRadians(rotationDegrees.y),
                degreesToRadians(rotationDegrees.z)
            );

            scene.add(model);
            resolve(model);
        }, undefined, function (error) {
            console.error('An error occurred while loading the model', error);
            reject(error);
        });
    });
}

// Variables for lanes
// let lane1Speed = 4;
// let lane2Speed = 36;
// let lane3Speed = 7;

let lane1Vehicles = [];
let lane2Vehicles = [];
let lane3Vehicles = [];

// Define waypoints for each vehicle in each lane
const lane1Vehicle1Waypoints = [
    new THREE.Vector3(-5, 0.03, -3),
    new THREE.Vector3(-2.8, 0.03, -3),
    new THREE.Vector3(-2, 0.03, -3.5),
    new THREE.Vector3(-2, 0.03, -4),
    new THREE.Vector3(-2, 0.03, -5),
    new THREE.Vector3(-2, 0.03, -8),
];

const lane1Vehicle2Waypoints = [
    new THREE.Vector3(-5.3, 0.03, -2.3),
    new THREE.Vector3(4.6, 0.03, -2.3),
    new THREE.Vector3(8.5, 0.03, -2.3)
];
const lane1Vehicle3Waypoints = [
    new THREE.Vector3(-7.2,0.3,-2.4),
    new THREE.Vector3(-2.6, 0.3, -2.4),
    new THREE.Vector3(-2.6, 0.3, -3),
    new THREE.Vector3(-2.6, 0.3, -4),
    new THREE.Vector3(-2.6, 0.3, -5),
    new THREE.Vector3(-2.6, 0.3, -7),
];
const lane1Vehicle4Waypoints = [
    new THREE.Vector3(-9.6, 0.03, -3),
    new THREE.Vector3(4, 0.03, -3),
    new THREE.Vector3(6.6, 0.03, -3),
];
const lane1Vehicle5Waypoints = [
    new THREE.Vector3(-9.2, 0.03, -2.4),
    new THREE.Vector3(4, 0.03, -2.4),
    new THREE.Vector3(5.5, 0.03, -2.4),
];


const lane2Vehicle1Waypoints = [
    new THREE.Vector3(-2.1, 0.3, -0.9),
    new THREE.Vector3(-2.1, 0.3, -1.4),
    new THREE.Vector3(-2.4, 0.3, -1.4),
    new THREE.Vector3(-5.4, 0.3, -1.4),
  
    
];

const lane2Vehicle2Waypoints = [
    new THREE.Vector3(-2.5, 0.03, 5),
    new THREE.Vector3(-2.5, 0.03, -1.4),
    new THREE.Vector3(2.5, 0.03, -2.5),
    new THREE.Vector3(4.6, 0.03, -2.5),
  
];
 const lane2Vehicle3Waypoints=[
    new THREE.Vector3(-2.2, 0.03, 4.7), 
    new THREE.Vector3(-2.2, 0.03, -8), 
 ]

const lane3Vehicle1Waypoints = [
    new THREE.Vector3(-0.3, 0.03, -5),
    new THREE.Vector3(-0.3, 0.03, -2),
    new THREE.Vector3(-0.3, 0.03, 1),
    new THREE.Vector3(-0.3, 0.03, 6)
];

const lane3Vehicle2Waypoints = [
    new THREE.Vector3(-0.9, 0.13, -5),
    new THREE.Vector3(-0.9, 0.13, -3),
    new THREE.Vector3(-0.9, 0.13, 2),
    new THREE.Vector3(-0.9, 0.13, 5)
];

// Load models and add to respective lane arrays
Promise.all([
    loadModel("/american_road_intersection/scene.gltf", { x: 0, y: 0, z: 0 }, { x: 0.01, y: 0.01, z: 0.01 }, { x: 0, y: 0, z: 0 }),
    
    // Lane 1
    loadModel("/dirty_car/scene.gltf", { x: -5, y: 0.03, z: -3 }, { x: 0.002, y: 0.002, z: 0.002 }, { x: 180, y: 90, z: 180 })
        .then(vehicle => lane1Vehicles.push({ vehicle, waypointIndex: 0, waypoints: lane1Vehicle1Waypoints, reachedDestination: false,type:"Car1" })),
    loadModel("/ambulance_car/scene.gltf", { x: -5.3, y: 0.03, z: -2.3 }, { x: 0.4, y: 0.4, z: 0.4 }, { x: 180, y: 90, z: 180 })
        .then(vehicle => lane1Vehicles.push({ vehicle, waypointIndex: 0, waypoints: lane1Vehicle2Waypoints, reachedDestination: false ,type:"Car2" })),
        loadModel(
            "/nissan_president_g50_js/scene.gltf",
            { x: -7.2, y: 0.3, z: -2.4 },
            { x: 0.3, y: 0.3, z: 0.3 },
            { x: 180, y: 90, z: 180 } // Rotate 180 degrees around Y and Z axes
        ).then(vehicle => lane1Vehicles.push({ vehicle, waypointIndex: 0, waypoints: lane1Vehicle3Waypoints, reachedDestination: false,type:"Car3" })),
        loadModel(
            "/dirty_car/scene.gltf",
            {x: -9.6, y: 0.03, z: -3 },
            { x: 0.002, y: 0.002, z: 0.002 },
            { x: 180, y: 90, z: 180 }
        ).then(vehicle => lane1Vehicles.push({ vehicle, waypointIndex: 0, waypoints: lane1Vehicle4Waypoints, reachedDestination: false,type:"Car4" })),
        loadModel(
            "/tuk_tuk_rikshaw/scene.gltf",
            {x: -9.2, y: 0.03, z: -2.4 },
            { x: 0.3, y: 0.3, z: 0.3 },
            { x: 180, y: 90, z: 180 }
        ).then(vehicle => lane1Vehicles.push({ vehicle, waypointIndex: 0, waypoints: lane1Vehicle5Waypoints, reachedDestination: false,type:"Car5" })),
        
    // Lane 2
    loadModel("/nissan_president_g50_js/scene.gltf", { x: -2.1, y: 0.3, z: 1.9 }, { x: 0.3, y: 0.3, z: 0.3 }, { x: 180, y: 0, z: 180 })
        .then(vehicle => lane2Vehicles.push({ vehicle, waypointIndex: 0, waypoints: lane2Vehicle1Waypoints, reachedDestination: false })),
    loadModel("/tuk_tuk_rikshaw/scene.gltf", { x: -2.5, y: 0.03, z: 8 }, { x: 0.3, y: 0.3, z: 0.3 }, { x: 180, y: 0, z: 180 })
        .then(vehicle => lane2Vehicles.push({ vehicle, waypointIndex: 0, waypoints: lane2Vehicle2Waypoints, reachedDestination: false })),
        loadModel(
            "/police_car/scene.gltf",
            {x: -2.2, y: 0.03, z: 4.7 },
            { x: 0.3, y: 0.3, z: 0.3 },
            { x: 180, y: 0, z: 180 }
        ).then(vehicle => lane2Vehicles.push({ vehicle, waypointIndex: 0, waypoints: lane2Vehicle3Waypoints, reachedDestination: false })),
        

    
    // Lane 3
    loadModel("/tuk_tuk_rikshaw/scene.gltf", { x: -0.3, y: 0.03, z: -5 }, { x: 0.3, y: 0.3, z: 0.3 }, { x: 180, y: 180, z: 180 })
        .then(vehicle => lane3Vehicles.push({ vehicle, waypointIndex: 0, waypoints: lane3Vehicle1Waypoints, reachedDestination: false,type:"Car3" })),
    loadModel("/jeep/scene.gltf", { x: -0.9, y: 0.13, z: -5.5 }, { x: 0.1, y: 0.1, z: 0.1 }, { x: 180, y: 180, z: 180 })
        .then(vehicle => lane3Vehicles.push({ vehicle, waypointIndex: 0, waypoints: lane3Vehicle2Waypoints, reachedDestination: false,type:"Car3" })),
    
    // Traffic Lights
    loadModel("/traffic_light/scene.gltf", { x: 0.4, y: 0.03, z: -4 }, { x: 0.2, y: 0.2, z: 0.2 }, { x: 180, y: 180, z: 180 }),
    loadModel("/traffic_light/scene.gltf", { x: -3.8, y: 0.03, z: 0.5 }, { x: 0.2, y: 0.2, z: 0.2 }, { x: 180, y: 0, z: 180 }),
    loadModel(
        "/traffic_light/scene.gltf",
        {x: 0.4, y: 0.03, z: 0.5 },
        { x: 0.2, y: 0.2, z: 0.2 },
        { x: 180, y: -90, z: 180 }
    )
    //
    
]).then(() => {
    console.log("All models loaded");
    render();
    
});
function render() {
    requestAnimationFrame(render);
    controls.update(); // Update Orbit Controls
    if (!simulationRunning) {
        renderer.render(scene, camera); // Render the scene continuously when simulation is not running
    }
}

// Call render loop once initially to ensure Orbit Controls are active
function createBanner(text, positionX,positionY,positionZ, rotationX,rotationY,rotationZ) {
    // Create a canvas with the given text and a white background
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 256; // Smaller width
    canvas.height = 128; // Smaller height

    // Set the canvas background to white
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the text on the canvas
    context.font = '50px Arial'; // Smaller font size
    context.fillStyle = 'black'; // Text color
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(text, canvas.width / 2, canvas.height / 2);

    // Create a texture from the canvas
    const texture = new THREE.CanvasTexture(canvas);

    // Create a plane geometry to represent the banner
    const geometry = new THREE.PlaneGeometry(1.5, 0.75); // Smaller width and height
    const material = new THREE.MeshStandardMaterial({ map: texture });
    const banner = new THREE.Mesh(geometry, material);

    // Position the banner
    banner.position.set(positionX, positionY, positionZ);

    // Apply rotation
    banner.rotation.y = degreesToRadians(rotationY);
    banner.rotation.z = degreesToRadians(rotationZ);
    banner.rotation.x = degreesToRadians(rotationX);

    return banner;
}
//Creating Zebra Crossing
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 10, 7);
scene.add(directionalLight);

// Create a ground plane
// const groundGeometry = new THREE.PlaneGeometry(20, 20);
// const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x555555 });
// const ground = new THREE.Mesh(groundGeometry, groundMaterial);
// ground.rotation.x = -Math.PI / 2; // Rotate to make it horizontal
// scene.add(ground);

// Create zebra crossing stripes
// Function to create a zebra crossing
// Function to create a zebra crossing with rotations
// Function to create a zebra crossing with rotations
function createZebraCrossing(
    scene,
    startX = 0,
    startY = 0.025,
    startZ = 0,
    numberOfStripes = 8,
    stripeWidth = 0.2,
    stripeLength = 1,
    stripeSpacing = 0.2,
    rotationX = 0, // Rotation around the X-axis in degrees
    rotationY = 0, // Rotation around the Y-axis in degrees
    rotationZ = 0  // Rotation around the Z-axis in degrees
  ) {
    // Create a group to hold all stripes
    const zebraCrossingGroup = new THREE.Group();
  
    for (let i = 0; i < numberOfStripes; i++) {
      // Alternate between white and black stripes
      const stripeColor = i % 2 === 0 ? 0xffffff : 0x000000;
  
      // Create geometry and material for the stripe
      const stripeGeometry = new THREE.BoxGeometry(stripeWidth, 0.05, stripeLength);
      const stripeMaterial = new THREE.MeshStandardMaterial({ color: stripeColor });
  
      // Create the stripe mesh
      const stripe = new THREE.Mesh(stripeGeometry, stripeMaterial);
  
      // Set the position of the stripe relative to the start position within the group
      stripe.position.set(i * (stripeWidth + stripeSpacing), 0, 0);
  
      // Add the stripe to the group
      zebraCrossingGroup.add(stripe);
    }
  
    // Set the group's position
    zebraCrossingGroup.position.set(startX, startY, startZ);
  
    // Apply the rotation to the whole group
    zebraCrossingGroup.rotation.x = THREE.MathUtils.degToRad(rotationX); // Convert degrees to radians
    zebraCrossingGroup.rotation.y = THREE.MathUtils.degToRad(rotationY);
    zebraCrossingGroup.rotation.z = THREE.MathUtils.degToRad(rotationZ);
  
    // Add the group to the scene
    scene.add(zebraCrossingGroup);
  }
  
  // Example usage: Position and rotate zebra crossings correctly
  createZebraCrossing(scene, -2.9, 0.025, 0, 8, 0.2, 1, 0.2, 0, 0, 0); // No rotation
  createZebraCrossing(scene, -2.9, 0.025, -4, 8, 0.2, 1, 0.2, 0, 0, 0); // No rotation
  createZebraCrossing(scene, -4, 0.025, -0.5, 8, 0.2, 1, 0.2, 0, 90, 0); // Rotated 90 degrees on the Y-axis
  
  

// Create three banners with different names
const banner1 = createBanner('Lane 1', -3.8,0.8,-4.1,0,45,0);
const banner2 = createBanner('Lane 2',-3.8,0.8,2,0,90,0);
const banner3 = createBanner('Lane 3', 1.5,0.8,-4.1,0,45,0);

scene.add(banner1);
scene.add(banner2);
scene.add(banner3);
// Function to move a vehicle along its waypoints
function moveVehicle(vehicleData, speed) {
    if (vehicleData.reachedDestination) return;

    const { vehicle, waypointIndex, waypoints ,type} = vehicleData;
    const target = waypoints[waypointIndex];
    
    // Calculate direction vector to the next waypoint
    const direction = new THREE.Vector3().subVectors(target, vehicle.position).normalize();
    
    // Move towards the next waypoint
    vehicle.position.addScaledVector(direction, speed);

    // Calculate the correct rotation to face the direction of movement
    // Adjust the angle by 180 degrees (Math.PI radians) if the front is facing the opposite direction
    if (type==="Car1") {
        const targetRotation = Math.atan2(direction.x, -direction.z);
        vehicle.rotation.y = targetRotation;   
    } 
    else if(type==="Car3")
    {
        const targetRotation = Math.atan2(direction.x, -direction.z);
        vehicle.rotation.y = targetRotation;  

    }
    else {
        const targetRotation = Math.atan2(direction.x, -direction.z);
        vehicle.rotation.y = targetRotation;  
    }

    // Check if the vehicle is close to the target waypoint
    if (vehicle.position.distanceTo(target) < 0.1) {
        vehicleData.waypointIndex = (waypointIndex + 1) % waypoints.length;
        if (vehicleData.waypointIndex === 0) {
            vehicleData.reachedDestination = true; // Mark as reached destination
        }
    }
}

function moveVehiclesToDestination(vehicles, speed) {
    let allReached = true; // Assume all vehicles have reached the destination
    vehicles.forEach(vehicleData => {
        if (!vehicleData.reachedDestination) {
            moveVehicle(vehicleData, speed);
            allReached = false; // If any vehicle has not reached, set this to false
        }
    });
    return allReached;
}

// Animation loop

let lane1Completed = false;
let lane2Completed = false;
let simulationRunning = false;

runSimulationButton.addEventListener('click', () => {
    if (!simulationRunning) {
        simulationRunning = true;
        console.log('Simulation started');
        animate(); // Start the animation loop only when the button is pressed
    }
});

resetButton.addEventListener('click', () => {
    console.log('Simulation reset');
    resetSimulation();
});

// Function to reset the simulation
function resetSimulation() {
    simulationRunning = false;
    lane1Completed = false;
    lane2Completed = false;

    // Reset all vehicles' positions to their starting points
    [...lane1Vehicles, ...lane2Vehicles, ...lane3Vehicles].forEach(vehicleData => {
        vehicleData.vehicle.position.copy(vehicleData.waypoints[0]);
        vehicleData.waypointIndex = 0;
        vehicleData.reachedDestination = false;
    });

    renderer.render(scene, camera); // Re-render the scene after resetting
}


function animate() {
    if (!simulationRunning) return;
    requestAnimationFrame(animate);

    // Move lane 1 vehicles first
    if (!lane1Completed) {
        lane1Completed = moveVehiclesToDestination(lane1Vehicles, 0.03);
    }
    // After lane 1 reaches its destination, move lane 2 vehicles
    else if (!lane2Completed) {
        lane2Completed = moveVehiclesToDestination(lane2Vehicles, 0.03);
    }
    // After lane 2 reaches its destination, move lane 3 vehicles
    else {
        moveVehiclesToDestination(lane3Vehicles, 0.03);
    }

    renderer.render(scene, camera);
}


