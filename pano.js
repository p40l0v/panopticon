import {
  KMZLoader
} from "./KMZLoader.js";


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
    renderer.setClearColor(0x0d0d0d)
    camera.position.y = 10;
    camera.position.z = 1000;
    resize()
    container.appendChild(renderer.domElement);
  }

  function initTimeline() {
    timeline = anime.timeline({
      autoplay: false,
      duration: 100000,
      easing: 'easeOutSine'
    });

    var textWrapper = document.querySelector('.ml16');
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

    anime.timeline({
        loop: false
      })
      .add({
        targets: '.ml16 .letter',
        translateY: [-150, 0],
        easing: "easeOutExpo",
        duration: 2000,
        delay: (el, i) => 30 * i,
      });


    timeline.add({
      targets: camera.position,
      x: 0,
      y: 10,
      z: 200,
      duration: 100,
      update: camera.updateProjectionMatrix()
    })

    timeline.add({
      targets: "#content",
      translateY: -1700,
      duration: 300,
      update: camera.updateProjectionMatrix()
    })

    timeline.add({
      targets: camera.position,
      x: 0,
      y: 7,
      z: 80,
      duration: 100,
      update: camera.updateProjectionMatrix()
    })

    timeline.add({
      targets: "#content",
      translateY: -2600,
      duration: 150,
      update: camera.updateProjectionMatrix()
    })

    var initial = new THREE.Color(0x0d0d0d)
    var value = new THREE.Color(0xeaeaea)
    timeline.add({
      targets: initial,
      r: [initial.r, value.r],
      g: [initial.g, value.g],
      b: [initial.b, value.b],
      duration: 400,
      update: () => {
        renderer.setClearColor(initial);
      }
    }, 0);

    timeline.add({
      targets: "#subtitle",
      opacity: 0,
      duration: 100,
      delay: 100,
      update: camera.updateProjectionMatrix()
    })

    timeline.add({
      targets: camera.position,
      x: -20,
      y: 15,
      z: 30,
      duration: 100,
      update: camera.updateProjectionMatrix()
    })

    timeline.add({
      targets: camera.rotation,
      y: -.5,
      duration: 50,
      update: camera.updateProjectionMatrix()
    })

    timeline.add({
      targets: "#content",
      translateY: -3500,
      duration: 50,
      update: camera.updateProjectionMatrix()
    })

    timeline.add({
      targets: "#important",
      opacity: 1,
      duration: 100,
      update: camera.updateProjectionMatrix()
    })

    timeline.add({
      targets: camera.position,
      x: -10,
      y: 10,
      z: 10,
      duration: 50,
      update: camera.updateProjectionMatrix()
    })

    timeline.add({
      targets: "#p0",
      opacity: 1,
      duration: 50,
      update: camera.updateProjectionMatrix()
    })

    timeline.add({
      targets: "#content",
      translateY: -4200,
      duration: 50,
      update: camera.updateProjectionMatrix()
    })

    timeline.add({
      targets: camera.position,
      x: 0,
      y: 2,
      z: 0,
      delay: 50,
      duration: 100,
      update: camera.updateProjectionMatrix()
    })

    timeline.add({
      targets: "#content",
      translateY: -4400,
      duration: 50,
      update: camera.updateProjectionMatrix()
    })


    timeline.add({
      targets: "#p1",
      opacity: 1,
      duration: 50,
      update: camera.updateProjectionMatrix()
    })

    timeline.add({
      targets: camera.position,
      x: 0,
      y: 4,
      z: 0,
      duration: 50,
      update: camera.updateProjectionMatrix()
    })
    timeline.add({
      targets: "#p2",
      opacity: 1,
      duration: 50,
      update: camera.updateProjectionMatrix()
    })

    timeline.add({
      targets: camera.position,
      x: 0,
      y: 8,
      z: 0,
      duration: 50,
      update: camera.updateProjectionMatrix()
    })

    timeline.add({
      targets: "#p3",
      opacity: 1,
      duration: 50,
      update: camera.updateProjectionMatrix()
    })

    timeline.add({
      targets: camera.position,
      x: 0,
      y: 12,
      z: 0,
      duration: 50,
      update: camera.updateProjectionMatrix()
    })
    timeline.add({
      targets: "#p4",
      opacity: 1,
      duration: 50,
      update: camera.updateProjectionMatrix()
    })

    timeline.add({
      targets: camera.position,
      x: 0,
      y: 20,
      z: 0,
      duration: 50,
      update: camera.updateProjectionMatrix()
    })
    timeline.add({
      targets: "#p5",
      opacity: 1,
      duration: 50,
      update: camera.updateProjectionMatrix()
    })

    timeline.add({
      targets: ".point",
      opacity: 0,
      duration: 30,
      update: camera.updateProjectionMatrix()
    })

    timeline.add({
      targets: camera.rotation,
      x: -1.5,
      y: 0,
      z: 0,
      duration: 50,
      update: camera.updateProjectionMatrix()
    })

    timeline.add({
      targets: camera.position,
      x: 0,
      y: 5,
      z: 0,
      duration: 100,
      update: camera.updateProjectionMatrix()
    })

    timeline.add({
      targets: "#content",
      translateY: -5100,
      opacity: 1,
      duration: 50,
      update: camera.updateProjectionMatrix()
    })


    timeline.add({
      targets: camera.position,
      x: 0,
      y: 30,
      z: 0,
      duration: 100,
      update: camera.updateProjectionMatrix()
    })
    timeline.add({
      targets: "#content",
      translateY: -6800,
      opacity: 1,
      duration: 100,
      update: camera.updateProjectionMatrix()
    })

    timeline.add({
      targets: "#content",
      opacity: 0,
      duration: 50,
      delay:50,
      update: camera.updateProjectionMatrix()
    })

    timeline.add({
      targets: camera.position,
      x: 0,
      y: 100,
      z: 0,
      duration: 100,
      update: camera.updateProjectionMatrix()
    })





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
