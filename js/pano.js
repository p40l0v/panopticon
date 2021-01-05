import {
  KMZLoader
} from "KMZLoader.js";


function main() {
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    premultipliedAlpha: false,
  });

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 3000);
  var container = document.querySelector('.webgl');
  var startTime = Date.now();
  var scrollY = 0;
  var _event = {
    y: 0,
    deltaY: 0
  };
  var timeline = null
  var percentage = 0

  var loader = new KMZLoader();
  loader.load('./panopticon/scene.kmz', function(kmz) {
    scene.add(kmz.scene);
  }, undefined, function(error) {
    console.error(error);
  });

  var divContainer = document.querySelector('.container')
  var maxHeight = (divContainer.clientHeight || divContainer.offsetHeight) - window.innerHeight

  var light = new THREE.HemisphereLight(0xeeeeff, 0x777788, 0.75);
  light.position.set(0.5, 1, 0.75);
  scene.add(light);


  function initThree() {
    renderer.setPixelRatio(window.devicePixelRatio || 1);
    renderer.setClearColor(0x161216)
    camera.position.y = 10;
    camera.position.z = 300;
    resize()
    container.appendChild(renderer.domElement);
  }



  function initTimeline() {
    timeline = anime.timeline({
      autoplay: false,
      duration: 10000,
      easing: 'easeOutSine'
    });

    var textWrapper = document.querySelector('.ml2');
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

    anime.timeline({loop: true})
      .add({
        targets: '.ml2 .letter',
        scale: [4,1],
        opacity: [0,1],
        translateZ: 0,
        easing: "easeOutExpo",
        duration: 950,
        delay: (el, i) => 70*i
      }).add({
        targets: '.ml2',
        opacity: 0,
        duration: 1000,
        easing: "easeOutExpo",
        delay: 1000
      });


    timeline.add({
      targets: camera.position,
      x: 0,
      y: 10,
      z: 50,
      duration: 300,
      update: camera.updateProjectionMatrix()
    });

    timeline.add({
      targets: camera.position,
      x: 0,
      y: 2,
      z: 30,
      duration: 300,
      update: camera.updateProjectionMatrix()
    });

    timeline.add({
      targets: "#content",
      translateY: -1800,
      duration: 500,
      update: camera.updateProjectionMatrix()
    })

    timeline.add({
      targets: camera.position,
      x: 0,
      y: 2,
      z: 0,
      duration: 300,
      update: camera.updateProjectionMatrix()
    });

    timeline.add({
      targets: "#content",
      translateY: -3200,
      duration: 500,
      update: camera.updateProjectionMatrix()
    })

    timeline.add({
      targets: camera.position,
      x: 0,
      y: 20,
      z: 0,
      duration: 300,
      update: camera.updateProjectionMatrix()
    });

    timeline.add({
      targets: "#content",
      translateY: -4000,
      duration: 500,
      update: camera.updateProjectionMatrix()
    })

    timeline.add({
      targets: camera.position,
      x: 0,
      y: 30,
      z: 0,
      duration: 300,
      update: camera.updateProjectionMatrix()
    });

    timeline.add({
      targets: camera.rotation,
      x: -1.5,
      y: 0,
      z: 0,
      duration: 300,
      update: camera.updateProjectionMatrix()
    });

    var value = new THREE.Color(0xFFFCFC)
    var initial = new THREE.Color(0x161216)
    timeline.add({
      targets: initial,
      r: [initial.r, value.r],
      g: [initial.g, value.g],
      b: [initial.b, value.b],
      duration: 4500,
      update: () => {
        renderer.setClearColor(initial);
      }
    }, 0);
  }

  function animate() {
    // render the 3D scene
    render();
    // relaunch the 'timer'
    requestAnimationFrame(animate);
  }

  function render() {
    var dtime = Date.now() - startTime;
    // easing with treshold on 0.08 (should be between .14 & .2 for smooth animations)
    percentage = lerp(percentage, scrollY, .08);
    timeline.seek(percentage * (4500 / maxHeight))
    renderer.render(scene, camera);
  }
  // linear interpolation function
  function lerp(a, b, t) {
    return ((1 - t) * a + t * b);
  }

  function init() {
    initThree()
    initTimeline()
    window.addEventListener('resize', resize, {
      passive: true
    })
    divContainer.addEventListener('wheel', onWheel, {
      passive: false
    });
    animate()
  }

  function resize() {
    // cointainer height - window height to limit the scroll at the top of the screen when we are at the bottom of the container
    maxHeight = (divContainer.clientHeight || divContainer.offsetHeight)
    // - window.innerHeight
    renderer.width = container.clientWidth;
    renderer.height = container.clientHeight;
    renderer.setSize(renderer.width, renderer.height);
    camera.aspect = renderer.width / renderer.height;
    camera.updateProjectionMatrix();
  }

  function onWheel(e) {
    e.stopImmediatePropagation();
    e.preventDefault();
    e.stopPropagation();

    var evt = _event;
    evt.deltaY = e.wheelDeltaY || e.deltaY * -1;
    evt.deltaY *= 0.5;

    scroll(e);
  };

  function scroll(e) {
    var evt = _event;
    // limit scroll top
    if ((evt.y + evt.deltaY) > 0) {
      evt.y = 0;
      // limit scroll bottom
    } else if ((-(evt.y + evt.deltaY)) >= maxHeight) {
      evt.y = -maxHeight;
    } else {
      evt.y += evt.deltaY;
    }
    scrollY = -evt.y
  }

  init()
}
main();
