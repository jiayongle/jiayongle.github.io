document.addEventListener('DOMContentLoaded', () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff, 1); // Set background color to white
    document.body.appendChild(renderer.domElement);
    camera.position.z = 20;

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.enableZoom = true;

    // Define nodes and their positions explicitly
    const nodes = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const positions = [
        [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1], // Bottom layer A, B, C, D
        [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]      // Top layer E, F, G, H
    ];

    // Cube structure with each node linked to three others
    const edges = [
        ['A', 'B'], ['A', 'D'], ['A', 'E'],
        ['B', 'A'], ['B', 'C'], ['B', 'F'],
        ['C', 'B'], ['C', 'D'], ['C', 'G'],
        ['D', 'A'], ['D', 'C'], ['D', 'H'],
        ['E', 'A'], ['E', 'F'], ['E', 'H'],
        ['F', 'B'], ['F', 'E'], ['F', 'G'],
        ['G', 'C'], ['G', 'F'], ['G', 'H'],
        ['H', 'D'], ['H', 'E'], ['H', 'G']
    ];

    // Create nodes and assign them to their positions
    const nodeObjects = {};
    nodes.forEach((node, index) => {
        const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
        const material = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff });
        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(...positions[index]);
        scene.add(cube);
        nodeObjects[node] = cube;
    });

    // Create edges based on node positions
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
