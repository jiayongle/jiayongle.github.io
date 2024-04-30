document.addEventListener('DOMContentLoaded', () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff, 1); // Set background color to white
    document.body.appendChild(renderer.domElement);
    camera.position.z = 5;

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.enableZoom = true;

    const radius = 0.25; // Radius of the spheres
    const nodes = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const positions = [
        [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1], // Bottom layer A, B, C, D
        [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]      // Top layer E, F, G, H
    ];

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('https://threejsfundamentals.org/threejs/resources/images/wall.jpg'); // Example texture

    nodes.forEach((node, index) => {
        const geometry = new THREE.SphereGeometry(radius, 32, 32);
        // Uncomment one of the following material lines to see different effects:

        // Solid color with wireframe
        // const material = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff, wireframe: true });

        // Texture mapping
        const material = new THREE.MeshBasicMaterial({ map: texture });

        const sphere = new THREE.Mesh(geometry, material);
        sphere.position.set(...positions[index]);
        scene.add(sphere);
    });

    const edges = [
        ['A', 'B'], ['A', 'D'], ['A', 'E'],
        ['B', 'C'], ['B', 'F'],
        ['C', 'D'], ['C', 'G'],
        ['D', 'H'],
        ['E', 'F'], ['E', 'H'],
        ['F', 'G'],
        ['G', 'H']
    ];

    edges.forEach(([from, to]) => {
        const material = new THREE.LineBasicMaterial({ color: 0x000000 });
        const start = new THREE.Vector3(...positions[nodes.indexOf(from)]);
        const end = new THREE.Vector3(...positions[nodes.indexOf(to)]);
        const geometry = new THREE.BufferGeometry().setFromPoints([start, end]);
        const line = new THREE.Line(geometry, material);
        scene.add(line);
    });

    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }

    animate();
});
