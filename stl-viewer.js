console.log("STL VIEWER JS IS RUNNING");

import * as THREE from 'three';
import { STLLoader } from 'three/addons/loaders/STLLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

function createSTLViewer(containerID, modelPath) {

    const container = document.getElementById(containerID);

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf5f5f5);

    // Camera
    const camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
    );

    camera.position.set(0, 0, 100);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
        antialias: true
    });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(
        container.clientWidth,
        container.clientHeight
    );

    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(
        0xffffff,
        3
    );

    directionalLight.position.set(5, 10, 10);
    scene.add(directionalLight);

    // Load STL
    const loader = new STLLoader();

    loader.load(modelPath, function (geometry) {

        // Material
        const material = new THREE.MeshStandardMaterial({
            color: 0xd4a72c,
            roughness: 0.5,
            metalness: 0.1
        });

        const model = new THREE.Mesh(
            geometry,
            material
        );

        // Center model
        geometry.computeBoundingBox();

        const center = new THREE.Vector3();

        geometry.boundingBox.getCenter(center);
        geometry.translate(
            -center.x,
            -center.y,
            -center.z
        );

        // Scale model to fit viewer
        const size = new THREE.Vector3();

        geometry.boundingBox.getSize(size);

        const maxDimension = Math.max(
            size.x,
            size.y,
            size.z
        );

        const scale = 60 / maxDimension;

        model.scale.set(
            scale,
            scale,
            scale
        );

        scene.add(model);

        // Camera position
        camera.position.set(0, 0, 80);
        camera.lookAt(0, 0, 0);

    });

    // Mouse controls
    const controls = new OrbitControls(
        camera,
        renderer.domElement
    );

    controls.enableDamping = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.5;

    // Resize
    window.addEventListener('resize', function () {

        camera.aspect =
            container.clientWidth /
            container.clientHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(
            container.clientWidth,
            container.clientHeight
        );

    });

    // Animation
    function animate() {

        requestAnimationFrame(animate);

        controls.update();

        renderer.render(
            scene,
            camera
        );
    }

    animate();
}


// Load your models
createSTLViewer(
    'palette-viewer',
    'models/water-colour-pallet-v2.stl'
);

createSTLViewer(
    'knobs-viewer',
    'models/miele-hood-fan-knobs.stl'
);