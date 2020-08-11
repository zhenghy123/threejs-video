console.log(">>>THREE", THREE);

var video;

function createVideo() {
  video = document.createElement("video");
  video.src =
    "http://183.192.162.3:21451/mnt1/cloudxr/ftp/cloudxr/test09878123aa02/test09878123aa02_low.mp4";
  //   video.src = "sintel.mp4";
  video.crossOrigin = "anonymous";
  video.autoplay = true;

  video.ontimeupdate = function (e) {
    console.log("timeupdate", e);
  };

  video.onerror = function (e) {
    console.log("error", e);
  };

  video.oncanplay = function () {
    video.play();
  };

  this.createScene();
}

var texure, material, scene, camera, geometry, mesh, renderer;

function createScene() {
  texure = new THREE.VideoTexture(video);
  texure.wrapS = this.texure.wrapT = THREE.ClampToEdgeWrapping;
  // 纹理Y轴翻转，使图片正面包裹球体否则纹理会镜像
  texure.flipY = false;
  texure.center.set(0.5, 0.5);
  texure.rotation = Math.PI;

  // 创建材质
  material = new THREE.MeshBasicMaterial({
    map: texure,
    side: THREE.DoubleSide,
  });

  // 创建相机
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.set(0, 0, 0);

  geometry = new THREE.SphereBufferGeometry(500, 60, 40);

  scene = new THREE.Scene();
  // 创建网格
  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // 创建渲染器
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  //   renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setSize(700, 350);

  document.querySelector("#container").appendChild(renderer.domElement);

  this.animate();
}

// window.onresize = function () {
//   renderer.setSize(window.innerWidth, window.innerHeight);
// };

// 循环绘制
var requestAnimationId;
function animate() {
  this.render();
  requestAnimationId = window.requestAnimationFrame(this.animate.bind(this));
}

function render() {
  renderer.render(scene, camera);
}
