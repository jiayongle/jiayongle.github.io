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

    const nodes = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const positions = [
        [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1], // Bottom layer A, B, C, D
        [-1, -1,  1], [1, -1,  1], [1, 1,  1], [-1, 1,  1]  // Top layer E, F, G, H
    ];

    const edges = [
        ['A', 'B'], ['A', 'D'], ['A', 'E'],
        ['B', 'C'], ['B', 'F'],
        ['C', 'D'], ['C', 'G'],
        ['D', 'H'],
        ['E', 'F'], ['E', 'H'],
        ['F', 'G'],
        ['G', 'H']
    ];

    const nodeObjects = {};
    nodes.forEach((node, index) => {
        const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
        const material = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff, transparent: true, opacity: 0.99 });
        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(...positions[index]);
        scene.add(cube);
        nodeObjects[node] = cube;

        // Add centered text label
        const sprite = createTextSprite(node);
        sprite.position.set(positions[index][0], positions[index][1], positions[index][2]);
        scene.add(sprite);
    });

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

function createTextSprite(text) {
    const canvas = document.createElement('canvas');
    const size = 256; // Size of the canvas (square)
    canvas.width = size;
    canvas.height = size;

    const context = canvas.getContext('2d');
    context.fillStyle = 'rgba(255, 255, 255, 0.01)'; // Background color
    context.fillRect(0, 0, size, size); // Background rectangle
    context.fillStyle = '#000000'; // Text color
    context.textAlign = 'center';
    context.font = '40px Arial';
    context.fillText(text, size / 2, size / 2 + 12);

    const texture = new THREE.CanvasTexture(canvas);
    const spriteMaterial = new THREE.SpriteMaterial({ map: texture, transparent: true, depthTest: false });
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(0.5, 0.5, 1); // Adjust size of the sprite
    return sprite;
}

